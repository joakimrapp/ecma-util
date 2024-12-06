import { MISSING, CYCLIC } from '../errors.mjs';
import { entries } from '@jrapp/object';
import Targets from './targets.mjs';

function has( bt, n ) { if( n in this ) {
	const [ o ] = this[ n ];
	return bt.some( i => i in o ); } }
function get( bt, n, ...a ) {
	if( a.includes( n ) ) CYCLIC.throw( n, ...a );
	else if( n in this ) {
		const [ o, a ] = this[ n ];
		for( let i of bt ) if( i in o ) return [ n, ...a[ o[ i ] ][ 0 ] ]; }
	MISSING.throw( n, ...a ); }

export default class { #o = {}; #b;
	constructor( b = [], ...o ) {
		this.#b = new Targets( b );
		for( let a of o ) this.add( ...a ); }
	*export() {
		yield this.#b.export();
		for( let [ n, [ , i ] ] of entries( this.#o ) ) for( let [ a, bt ] of i ) yield [ n, bt, ...a ]; }
	clone() { return new this.constructor( ...this.export() ); }
	has() { return has.bind( this.#o, this.#b.has( ...arguments ) ); }
	get() { return get.bind( this.#o, this.#b.get( ...arguments ) ); }
	add( n ) { this.#o[ n ] = this.#b.set( this.#o[ n ], ...arguments ); }
	set( n ) { this.#o[ n ] = this.#b.set( null, ...arguments ); }
}
