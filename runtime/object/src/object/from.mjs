import { isIterable, isFn } from '@jrapp/is-type';
import { fromEntries } from '../object.mjs';
import merge from './merge.mjs';
import entries from './entries.mjs';

function *get( a ) {
	for( let [ k, v ] of a )
		if( v != null )
			yield [ k, v ];
}

export default function( a, f ) {
	return isFn( f ) ? fromEntries( entries( a, f ) ) : isIterable( a ) ? fromEntries( get( a ) ) : merge( ...arguments );
}
