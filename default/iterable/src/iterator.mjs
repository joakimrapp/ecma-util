import array from './array.mjs';
import all from './all.mjs';
import Iterator from './iterator-generators.mjs';
import { entries, generate } from './generators.mjs';
import { defines, from } from '@jrapp/object';

export default class extends Iterator {
	static from( a, f ) { return f ? new this( a ).map( f ) : new this( ...arguments ); }
	static entries() { return new this( entries( ...arguments ) ); }
	static generate() { return new this( generate( ...arguments ) ); }
	map() { return new this.constructor( super.map( ...arguments ) ); }
	flat() { return new this.constructor( super.flat( ...arguments ) ); }
	filter() { return new this.constructor( super.filter( ...arguments ) ); }
	defined() { return new this.constructor( super.defined( ...arguments ) ); }
	unique() { return new this.constructor( super.unique( ...arguments ) ); }
	reduce( f, v ) {
		for( let a of this )
			v = ( v == null ) ? a : v = f( v, a );
		return v; }
	array() {
		return array( this, ...arguments ); }
	find( f ) {
		for( let a of this )
			if( f( a ) )
				return a; }
	all() {
		return all( this ); }
	object() {
		return from( this ); }
	defines( o ) {
		return defines( o, from( this ) ); } }
