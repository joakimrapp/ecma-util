import { define } from '@jrapp/object';
import { isFn } from '@jrapp/is-type';

export default class extends Error {
	static extend( n, f ) { return define( ( class extends this {
		constructor( a ) { super( isFn( f ) ? f( ...arguments ) : a ); }
	} ).prototype, 'name', { value: `${n}_ERROR` } ).constructor; }
	static throw() { throw new this( ...arguments ); } }
