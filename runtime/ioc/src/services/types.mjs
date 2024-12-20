import { INJECTS } from '../service/constants.mjs';
import { isIterable } from '@jrapp/is-type';
import Scoped from './scoped.mjs';
import { Arg } from '../service/index.mjs';

const
	re = /w+$/,
	replace = ( k, n ) => n.replace( re, k );

export default class extends Map { #s; #l = new Scoped();
	constructor( s ) { super(); this.#s = s; }
	has() { return this.#s.has( ...arguments ); }
	get( n, p ) { try { return this.#s.get( ...arguments ); } finally { this.#l.arg( n, p ); }; }
	res( n, t, f, d, r, a ) {
		for( let n of r ) this.get( n, ...a );
		return Array.from( d, k => isIterable( k ) ? Arg.res( this, k, ...a ) : this.get( this.has( k ) ? k : replace( k, ...a ), ...a ) ); }
	set( n, t, f, d ) {
		if( t & INJECTS ) d = this.res( ...arguments );
		t = this.#l.get( n, t );
		super.set( n, t );
		return [ n, t, f, d ];
	} }
