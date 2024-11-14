import { CONSTRUCTOR } from '../constants.mjs';

export default function( a ) {
	if( a = a?.[ CONSTRUCTOR ], a !== Object )
		return a;
}
