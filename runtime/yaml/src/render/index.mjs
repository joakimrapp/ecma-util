const MAX_WIDTH = 240,
	re = new RegExp( `(?<b>^(?=(.{${MAX_WIDTH},}|[^\\n]*\\n))[^\\n]*(?<l>(?![\\n]*$)\\n\\n)?.*?(?<k>\\n{2,})?(?<c>\\n)?$)|^(?<p>(?=\\w).*(?<=\\w))$|(?<q>[^\\n]*)`, 's' ),
	ra = [ new RegExp( `\\n|(?=[^\\n]{${MAX_WIDTH}})([^\\n]{0,${MAX_WIDTH}}) `, 'g' ), ( m, c ) => c != null ? `${c}\n` : '\n\n' ],
	sm = ( s, { l, k, c }, is, lvl ) => [ `${l ? '|' : '>'}${k ? '+' : c ? '' : '-'}\n`, ...( l ? s : s.replace( ...ra ) ).split( '\n' ) ].join( is.repeat( lvl ) ),
	st = function( s, { b, q } ) { return `${b ? sm( ...arguments ) : q ? `'${s.replace( /'/g, () => '\'\'' )}'` : s}\n`; },
	ys = ( s, ef, is, lvl ) => st( s, Object.fromEntries( Object.entries( s.match( re ).groups ).map( ( [ k, v ] ) => [ k, v != null ] ) ), is, lvl ),
	yk = ( k, q ) => { const { n, p } = k.match( /(?<q>\n)|^(?<p>(?=[a-zA-Z]).*(?<=\w))$/ )?.groups ?? {}; q = q || ( p == null ); return n ? JSON.stringify( k ) : q ? `'${k.replace( /'/g, () => '\'\'' )}'` : k; },
	yi = ( a ) => { let l = MAX_WIDTH; for( let i of a ) if( ( typeof( i ) !== 'string' ) || ( ( l -= i.length ) < 0 ) ) return true; },
	ya = ( a, ef, is, lvl ) => yi( a ) ? a.map( i => `-${is.slice( 1 )}${render( i, ef, is, lvl + 1 )}` ).join( is.repeat( lvl ) ) : `[ ${a.map( i => yk( i, 1 ) ).join( ', ' )} ]\n`,
	ye = ( k, v, ef, is, lvl ) => { const y = render( v, ef, is, lvl ); return `${yk( k )}:${( ( v == null ) || ( Object( v ) !== v ) || /^[[{!]/.test( y ) ) ? ' ' : `\n${is.repeat( lvl )}`}${y}`; },
	ym = ( o, ef, is, lvl ) => Object.entries( o ).filter( ( [ , v ] ) => v !== undefined ).map( e => ye( ...e, ef, is, lvl + 1 ) ).join( is.repeat( lvl ) ),
	yf = ( f, v, o, ef, is, lvl ) => { const y = render( v, ef, is, lvl ); return `!${f}${y.startsWith( '-' ) ? `\n${is.repeat( lvl )}` : ' '}${y}`; },
	yo = function( o, ef ) { return ( ef && ( !( o = Object.entries( o ) )[ 1 ] ) && ( o = o[ 0 ] ) && ( o[ 0 ] = o[ 0 ].match( /^Ref$|(?<=^Fn::)\w+$/ )?.at( 0 ) ) ) ? yf( ...o, ...arguments ) : ym( ...arguments ); },
	yp = ( a ) => `${JSON.stringify( a )}\n`,
	yc = function( a ) { return Array.isArray( a ) ? a.length && a.some( i => !/^(?:number|boolean)$/.test( typeof( i ) ) ) ? ya( ...arguments ) : yp( a ) : Object.keys( a ).length ? yo( ...arguments ) : yp( a ); };

const render = ( a, ef, is = '  ', lvl = 0 ) => ( a != null ) && ( Object( a ) === a ) ? yc( a, ef, is, lvl ) : typeof( a ) === 'string' ? ys( a, ef, is, lvl ) : yp( a );

export default render;
