import { isIterable } from '@jrapp/is-type';
import { from } from '../object/index.mjs';
import { defineProperties } from '../object.mjs';

export default function( o, ...a ) { return defineProperties( o, isIterable( ...a ) ? from( ...a ) : a[ 0 ] ); }
