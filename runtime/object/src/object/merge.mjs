import { isArray, isPrimitive } from '@jrapp/is-type';
import { keys, fromEntries as from } from '../object.mjs';

function entries(  ) {}

export default function merge( ...a ) {
	a = a.filter( i => i != null );
	if( a.length <= 1 )
		return a[ 0 ];
	else {
		let i = a.findLastIndex( a => isPrimitive( a ) || isArray( a ) ) + 1;
		if( ( a.length - i ) < 2 )
			return a.at( -1 );
		else {
			i && ( a = a.slice( i ) );
			const n = [ ...new Set( a.map( keys ).flat() ) ];
			return from( n.map( k => [ k, merge( ...a.map( i => i[ k ] ) ) ] ).filter( ( [ , i ] ) => i != null ) );
		}
	}
}
