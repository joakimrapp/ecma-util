import { AUTO } from '#constants';
import Services from '#services';
import Registry from './registry.mjs';

export default class extends Registry { #r;
	constructor( r ) { super( r ); this.#r = r; }
	set( n, f ) { return ( this.#r.set( n, AUTO, [], [ f ] ), this ); }
	build( ...a ) { return new Services( this.#r.build( a ) ); } }
