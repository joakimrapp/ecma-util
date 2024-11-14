import { proto, constructor, entries } from '../object/index.mjs';
import { getOwnPropertyDescriptors, hasOwn } from '../object.mjs';

export default function *names( o ) {
	for( let [ k, { value } ] of entries( getOwnPropertyDescriptors( o ) ) )
		if( !( value instanceof Function ) )
			yield k;
	const a = proto( o );
	if( constructor( a ) )
		for( let k of names( a ) ) if( !hasOwn( o, k ) ) yield k;
}
