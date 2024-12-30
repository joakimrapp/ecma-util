export { default as Namespaces } from './namespaces.mjs';
export { default as Scoped } from './scoped.mjs';
import { default as Services } from './services.mjs';
import { default as Sources } from './sources.mjs';
import { default as Types } from './types.mjs';
import Container from '#container';
import Export from '#build';

export default class extends Services { #b; #s = new Sources(); #t = new Types( this );
	constructor( b ) { super(); this.#b = b; }
	getSources() { return this.#s.entries(); }
	has() { return super.has( ...arguments ) || this.#b.has( ...arguments ); }
	get( n ) { return super.get( n ) ?? this.add( this.#b.get( ...arguments ), ...arguments ); }
	add( [ n, t, f, d, r, ...s ], ...a ) { return ( this.#s.set( n, s ), super.add( ...this.#t.set( n, t, f, d, r, a ) ) ); }
	container() { return Container.from( this, ...arguments ); }
	include( ...a ) { return ( a.forEach( n => this.get( n ) ), this ); }
	export() {
		this.include( ...arguments );
		return Export.from( this ); } }
