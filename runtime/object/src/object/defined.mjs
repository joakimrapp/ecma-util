import { isFn } from '@jrapp/is-type';
import { entries } from '../object.mjs';

function *get( a ) {
	for( let e of ( a?.entries?.() ?? entries( a ) ) )
		if( e?.[ 1 ] != null )
			yield e;
}

function *map( a, f ) {
	for( let [ k, v ] of ( a?.entries?.() ?? entries( a ) ) )
		if( ( v != null ) && ( ( v = f( k, v ) ) != null ) )
			yield [ k, v ];
}

export default function( a, f ) {
	return isFn( f ) ? map( a, f ) : get( a );
}
