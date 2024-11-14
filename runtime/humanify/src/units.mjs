export function units( r, s, u ) {
	s = r ** s; r = Math.log( s ); u = u.split( ',' );
	return function( a, p = 2, na = 'n/a' ) {
		if( !Number.isFinite( a ) ) return na;
		else if( a === 0 ) return `0 ${u[ 0 ]}`;
		else {
			const i = Math.min( Math.floor( Math.log( Math.abs( a ) ) / r ), u.length - 1 ), v = i ? ( a / Math.pow( s, i ) ) : a;
			return `${( i || ( !Number.isInteger( v ) ) ) ? v.toFixed( p ) : v} ${u[ i ]}`; } }; }
