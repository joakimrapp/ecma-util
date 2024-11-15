import { isIterable, isFn } from '@jrapp/is-type';
import { fromEntries } from '../object.mjs';
import merge from './merge.mjs';
import entries from './defined.mjs';

function *get( a ) {
	for( let e of a )
		if( e?.[ 1 ] != null )
			yield e;
}

export default function( a, f ) {
	return isFn( f ) ? fromEntries( entries( a, f ) ) : isIterable( a ) ? fromEntries( get( a ) ) : merge( ...arguments );
}
