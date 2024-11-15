import { isString, isIterable } from '@jrapp/is-type';
import { defineProperty, defineProperties } from '../object.mjs';
import { from } from '../object/index.mjs';

export default function( o, a ) {
	return isString( a ) ? defineProperty( ...arguments )[ a ] : defineProperties( o, isIterable( a ) ? from( a ) : a );
}
