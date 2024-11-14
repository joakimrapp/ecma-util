import { isNullish, isReadable, isStream, isIterable, isObject } from '@jrapp/is-type';

export function stream( a, pipeThrough ) {
	if( !isStream( a ) )
		a = isReadable( a ) ? ReadableStream.from( a ) : new Blob( [ ( typeof a[ Symbol.iterator ] === 'function' ) ? a : JSON.stringify( a ) ] ).stream();
	return isNullish( pipeThrough ) ? a : a.pipeThrough( pipeThrough );
}
