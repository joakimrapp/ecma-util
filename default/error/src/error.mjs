import { define } from '@jrapp/object';
import { isFn } from '@jrapp/is';

const
	name = ( o, value ) => ( define( o.prototype, 'name', { value } ), o ),
	text = n => n.toLowerCase().replace( /_/g, ' ' );

export default class extends Error {
	static extend( n, a ) {
		if( isFn( a ) ) return name( class extends this {
			constructor() { super( a( ...arguments ) ); } }, `${n}_ERROR` );
		else return name( class extends this {
			constructor( s ) { super( s ?? a ?? text( n ) ); } }, `${n}_ERROR` ); }
	static throw() {
		throw new this( ...arguments ); } }
