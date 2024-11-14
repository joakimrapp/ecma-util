import { proto, constructor } from '../object/index.mjs';
import { hasOwn, getOwnPropertyDescriptor } from '../object.mjs';

export default function property( o, k ) {
	if( hasOwn( o, k ) )
		return getOwnPropertyDescriptor( o, k );
	else if( o = proto( o ), constructor( o ) )
		return property( o, k );
}
