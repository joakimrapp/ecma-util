import { isIterable } from '@jrapp/is';
import { define } from '@jrapp/object';
import { iterator } from './symbol.mjs';

export default class {
	constructor( a ) { define( this, iterator, { value: a[ iterator ].bind( a ) } ); }
	*map( f ) {
		for( let a of this )
			yield f( a ); }
	*flat() {
		for( let a of this )
			if( isIterable( a ) )
				yield* a;
			else
				yield a; }
	*filter( f ) {
		for( let a of this )
			if( f( a ) )
				yield a; }
	*defined() {
		for( let a of this )
			if( a != null )
				yield a; }
	*unique() {
		const s = new Set();
		for( let a of this )
			if( s.size !== s.add( a ).size )
				yield a; } }
