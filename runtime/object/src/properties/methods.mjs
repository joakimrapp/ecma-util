import { CONSTRUCTOR } from '../constants.mjs';
import { proto, constructor, entries } from '../object/index.mjs';
import { getOwnPropertyDescriptors, hasOwn } from '../object.mjs';

export default function *methods( o ) {
	for( let [ k, { value } ] of entries( getOwnPropertyDescriptors( o ) ) )
		if( ( value instanceof Function ) && ( k !== CONSTRUCTOR ) )
			yield k;
	const a = proto( o );
	if( constructor( a ) )
		for( let k of methods( a ) ) if( !hasOwn( o, k ) ) yield k;
}
