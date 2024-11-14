import { proto, constructor } from '../object/index.mjs';
import { getOwnPropertySymbols, hasOwn } from '../object.mjs';

export default function *symbols( o ) {
	yield* getOwnPropertySymbols( o );
	const a = proto( o );
	if( constructor( a ) )
		for( let k of symbols( a ) ) if( !hasOwn( o, k ) ) yield k;
}
