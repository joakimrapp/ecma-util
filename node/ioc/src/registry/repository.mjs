import { AMBIGUOUS, INJECTABLE } from '#errors';
import { emit, REGISTERING } from '#events';
import { entries, from } from '@jrapp/object';
import service from './service.mjs';
import Targets from './targets.mjs';

export default class { #o; #b = new Targets();
	constructor( b, ...o ) { b?.forEach( s => this.#b.get( s ) ); this.#o = from( o ) ?? {}; }
	build( ...a ) { return this.#b.build( this.#o, a ); }
	export() { return [ [ ...this.#b ], ...[ ...entries( this.#o ) ].map( ( [ n, a ] ) => [ n, [ ...a ] ] ) ]; }
	clone() { return new this.constructor( ...this.export() ); }
	set( n ) { ( this.#o[ n ] = undefined, this.add( ...arguments ) ); }
	add( n, b, ...a ) {
		b = this.#b.add( b );
		this.#o[ n ]?.forEach( ( [ i ] ) => ( i & b ) && AMBIGUOUS.throw( n, [ ...this.#b.toStrings( i & b ) ] ) );
		a = service( ...a ) ?? INJECTABLE.throw( n );
		emit[ REGISTERING ]?.( n, [ ...this.#b.toStrings( b ) ], ...a );
		( this.#o[ n ] ??= [] ).push( [ b, a ] ); } }
