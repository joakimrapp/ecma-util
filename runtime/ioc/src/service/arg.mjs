import { define } from '@jrapp/object';
import { all } from '@jrapp/iterable/async';
import { isIterable } from '@jrapp/is-type';

export default class extends Array {
	static {
		define( this, 'name', { value: '' } ); }
	static get( a ) {
		return isIterable( a ) ? this.from( a ) : a; }
	get( { o } ) {
		return all( this, a => a.get( ...arguments ) ).then( () => o ); } }
