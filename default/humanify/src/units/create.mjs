import { log, min, floor, abs, pow } from './math.mjs';
import { isInteger, isNumber } from '@jrapp/is';

export default ( r, s, units ) => {
	s = r ** s;
	r = log( s );
	units = units.split( ',' );
	return function( a, precision = 2, na = 'n/a' ) {
		if( !isNumber( a ) ) return na;
		else if( a === 0 ) return `0 ${units[ 0 ]}`;
		else {
			const i = min( floor( log( abs( a ) ) / r ), units.length - 1 ), v = i ? ( a / pow( s, i ) ) : a;
			return `${( i || ( !isInteger( v ) ) ) ? v.toFixed( precision ) : v} ${units[ i ]}`; } }; }
