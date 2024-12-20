import { isIterable } from '@jrapp/is-type';
import { define } from '@jrapp/object';
import iterator from './symbol.mjs';
import array from './array.mjs';
import all from './all.mjs';

class Iterator {
	static *generate( i, f, whilst ) { for( ; whilst?.( i ) ?? true ; i = f( i ) ) yield i; }
	constructor( a ) { define( this, iterator, { value: a[ iterator ].bind( a ) } ); }
	*map( f ) { for( let a of this ) yield f( a ); }
	*flat() { for( let a of this ) if( isIterable( a ) ) yield* a; else yield a; }
	*filter( f ) { for( let a of this ) if( f( a ) ) yield a; }
	*defined( f ) { for( let a of this ) if( a != null ) yield a; }
	*unique() { const s = new Set(); for( let a of this ) if( s.size !== s.add( a ).size ) yield a; }
	reduce( f, v ) { for( let a of this ) v = ( v == null ) ? a : v = f( v, a ); return v; }
	array() { return array( this, ...arguments ); }
	find( f ) { for( let a of this ) if( f( a ) ) return a; }
	all() { return all( this ); } }

export default class I extends Iterator {
	static from() { return new this( ...arguments ); }
	static generate() { return new this( super.generate( ...arguments ) ); }
	map() { return this.new( super.map( ...arguments ) ); }
	flat() { return this.new( super.flat( ...arguments ) ); }
	filter() { return this.new( super.filter( ...arguments ) ); }
	defined() { return this.new( super.defined( ...arguments ) ); }
	unique() { return this.new( super.unique( ...arguments ) ); }
	new() { return new this.constructor( ...arguments ); } }
