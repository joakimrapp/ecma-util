import Container from './container.mjs';
import { Services, Sources, Types } from './services/index.mjs';
import Export from './build/services/index.mjs';

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
