import { int, hex } from './parse.mjs';
import { isArray, isString, isUInt } from '@jrapp/is-type';

const
	sgr = ( ...a ) => `\x1b[${a.join( ';' )}m`,
	is = a => isArray( a ) && ( a.length === 3 ),
	is24 = ( process.stdout.getColorDepth?.() === 24 ),
	mono = i => ( i === 0 ) ? 16 : ( i === 25 ) ? 231 : ( i + 231 ),
	rgb6 = ( r, g, b ) => { if( !( ( r === g ) && ( g === b ) ) ) return 16 + ( r * 36 ) + ( g * 6 ) + b; },
	rgbi = i => [ 16, 8, 0 ].map( a => i >> a & 0xff ),
	sgrX2 = ( bg, ...a ) => sgr( bg, 2, ...a ),
	sgrX5 = ( bg, r, g, b ) => sgr( bg, 5, rgb6( ...[ r, g, b ].map( i => ( i * 6 ) >> 8 ) ) ?? mono( ( ( ( r + g + b + 1.5 ) / 3 ) * 13 ) >> 7 ) ),
	sgrX = is24 ? sgrX2 : sgrX5,
	rgb = {
		re: /(background\s+|bg\s+|!)?(?:#((?:[\da-fA-F]{3}){1,2})|rgb\s*\(\s*((?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*[;,]\s*(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*[;,]\s*(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))\s*\))/,
		ra: [ a => a != null ? 48 : 38, a => a != null ? ( a.length === 6 ) ? rgbi( hex( a ) ) : [ ...a ].map( i => hex( i + i ) ) : a, a => a?.match( /\d+/g ).map( int ) ],
		parse( a ) { const [ b, h, d ] = rgb.ra.map( ( f, i ) => f( a[ i ] ) ); return sgrX( b, ...( h ?? d ) ); } },
	add = {
		re: /normal|\/0|(?:(?:(bright)\\s+)?(black|(red)|(green)|(yellow)|(blue)|(magenta|pink)|(cyan)|(white))|(default)|(gray))(?:\\s+(background|bg))?|(?:(\/(?=b))|(\/))?(?:(bold|b)|(dim|faint)|(italic|i)|(underline|u))/,
		ra: [ 60, 30, 1, 2, 3, 4, 5, 6, 7, 39, 90, 10, 21, 20, 1, 2, 3, 4 ],
		parse( a ) { let v = 0, i = 0; for( let e of add.ra ) if( a[ i++ ] != null ) v += e; return sgr( v ); } },
	arr = {
		re: /(?:\x1b\[[\d;]*\w)*./sg,
		from( ...a ) { if( is( a ) || is( ( a = a[ 0 ] ) ) ) return a; else if( isUInt( a ) ) return rgbi( a ); else if( isString( a ) ) { const [ , , h, d ] = a.match( rgb.re ); return h != null ? rgb.ra[ 1 ]( h ) : rgb.ra[ 2 ]( d ); }; },
		*rgb( n, f, ...a ) { let [ r, g, b ] = arr.from( ...a ); if( !is24 ) r = g = b = ~~( ( r + g + b ) / 3 ); for( ; n-- ; g /= f, r /= f, b /= f ) yield sgrX( 48, ~~r, ~~g, ~~b ); },
		*l( a, s ) { s = s.match( arr.re ); for( let l = a.length, i = 0 ; i < l ; i++ ) yield `${a.at( i )}${s.at( i ) ?? ' '}`; yield `${a.at( -1 )}${s.slice( a.length ).join``}`; },
		*r( a, s ) { s = s.match( arr.re ); yield `${a.at( -1 )}${s.slice( 0, -a.length ).join``}`; for( let i = a.length ; i ; i-- ) yield `${a.at( i - 1 )}${s.at( -i ) ?? ' '}`; } },
	re = new RegExp( `${rgb.re.source}|${add.re.source}`, 'g' );

export const
	rap = [ re, ...rgb.ra, ...add.ra, function( b, h, d, ...a ) { if( ( h ?? d ) != null ) return sgrX( b, ...( h ?? d ) ); else { let v = 0; for( let i of a.slice( 0, add.ra.length ) ) if( i != null ) v += i; return sgr( v ); } } ],
	parse = a => ( a != null ) ? [ ...a.matchAll( re ) ].map( m => ( ( m[ 2 ] ?? m[ 3 ] ) != null ) ? rgb.parse( m.slice( 1 ) ) : add.parse( m.slice( 4 ) ) ).join`` : '',
	Grad = class {
		static default() { return new this( 10, 1.45, ...arguments ); }
		#a; constructor() { this.#a = [ ...arr.rgb( ...arguments ) ]; }
		l() { return [ ...arr.l( this.#a, ...arguments ) ].join``; }
		r() { return [ ...arr.r( this.#a, ...arguments ) ].join``; } };
