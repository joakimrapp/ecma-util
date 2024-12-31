import { AUTO } from '#constants';
import Build from './build.mjs';
import Registry from './registry.mjs';
import Services from '#services';

export default class extends Registry { #r;
	constructor( r ) { super( r ); this.#r = r; }
	set( n, f, ...b ) { return ( this.#r.set( n, b, AUTO, f ), this ); }
	build( ...a ) { return new Build( new Services( this.#r.build( a ) ) ); }
	container( o, ...a ) { return this.build( ...a ).container( o ); } }
