import ByteArray from '@jrapp/byte-array';

const
	reSplit = /(?<=\n|^)(?:[\t ]*(?:#[^\n]*)?\n)*([\t ]*)([^\n\t #][^\n]*)\n((?=(?:[\t ]*\n)*(\1[\t ]*))(?:\1(?:[\t -][^\n]*|[\t ]*)\n)+)?/yg,
	reTrimRow = /^[\t ]*/g,
	reTrimContent = ( { length } ) => new RegExp( `(?<=\\n|^)[\\t ]{${length}}|\n$`, 'g' );

function *split( a ) {
	for( let [ , i1, r, c, i2 ] of a.matchAll( reSplit ) ) yield [ r.replace( reTrimRow, '' ), c?.replace( reTrimContent( i2 ), '' ) ]; }

const
	scalars = {
		true: [ /([yY](?:es)?|YES|[tT]rue|TRUE|[oO]n|ON)/, () => true ],
		false: [ /([nN]o?|NO|[fF]alse|FALSE|[oO]ff|OFF)/, () => false ],
		int: [ /([-+]?(?:0b[01_]+|0[0-7_]+|0|[1-9][0-9_]*|0x[0-9a-fA-F_]+))/, a => ~~a.replace( /_/g, '' ) ],
		float: [ /([-+]?(?:\d[\d_]*)?(?:\.[\d_]*)?(?:[eE][-+]\d+)?)/, a => +a.replace( /_/g, '' ) ],
		timestamp: [ /(\d\d\d\d-\d\d-\d\d(?:(?:[Tt]|[ \t]+)\d\d?:[0-5]\d:[0-5]\d(?:\.\d*)?(?:[ \t]*Z|[-+]\d\d?(?::\d\d)?)?)?)/, a => new Date( a ) ],
		null: [ /(~|null|Null|NULL)/, () => null ],
		strSQ: [ /'((?:[^']+|'')*)'/, ( a,  ) => a.replace( /(['\n])\1/g, '$1' ) ],
		strDQ: [ /("(?:[^"]*|(?<=\\)")*")/, a => JSON.parse( a ).replace( /^\s+|[ \t]*(\n)[ \t]*(\n)?|\s+$/, ( m, s, n ) => n?.length ? '\n' : s?.length ? ' ' : '' ) ] },
	indicators = {
		alias: [ /[\x2A]/, '*' ],
		anchor: [ /[\x26]/, '&' ],
		collectEntry: [ /[\x2C]/, ','],
		comment: [ /[\x23]/, '#' ],
		directive: [ /[\x25]/, '%' ],
		doubleQuote: [ /[\x22]/, '"' ],
		folded: [ /[\x3E]/, '>' ],
		literal: [ /[\x7C]/, '|' ],
		mappingEnd: [ /[\x7D]/, '}' ],
		mappingKey: [ /[\x3F]/, '?' ],
		mappingStart: [ /[\x7B]/, '{' ],
		mappingValue: [ /[\x3A]/, ':' ],
		reserved: [ /[\x40\x60]/, '@', '`' ],
		sequenceEnd: [ /[\x5D]/, ']' ],
		sequenceEntry: [ /[\x2D]/, '-' ],
		sequenceStart: [ /[\x5B]/, '[' ],
		singleQuote: [ /[\x27]/, '\'' ],
		tag: [ /[\x21]/, '!' ] },
	tags = {
		'!!binary': a => ByteArray.from( a.replace( /[^\w-/+]/g, '' ) ),
		'!!bool': a => scalars.true[ 0 ].test( a ),
		'!!float': scalars.float[ 1 ],
		'!!int': scalars.int[ 1 ] };


const
	reScalars = `${Object.values( scalars ).map( ( [ { source } ] ) => source ).join( '|' )}`;

const { log } = console;
