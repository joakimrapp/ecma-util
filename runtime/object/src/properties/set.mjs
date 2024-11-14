import { enumerable } from '../constants.mjs';
import { defineProperty } from '../object.mjs';

export default function( o, k, value, e ) {
	return defineProperty( o, k, { value, ...e && { enumerable } } )[ k ];
}
