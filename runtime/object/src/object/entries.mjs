import { isFn } from '@jrapp/is-type';
import { entries } from '../object.mjs';

function *get( a ) {
	for( let [ k, v ] of ( a?.entries?.() ?? entries( a ) ) )
		if( v != null )
			yield [ k, v ];
}

function *map( a, f ) {
	for( let [ k, v ] of get( a ) )
		if( v = f( k, v ), v != null )
			yield [ k, v ];
}

export default function( a, f ) {
	return isFn( f ) ? map( a, f ) : get( a );
}
