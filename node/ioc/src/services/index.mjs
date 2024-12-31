import { default as Types } from './types.mjs';
import { RESERVED } from '#constants';
import { emit, INCLUDING } from '#events';
import Namespaces from './namespaces.mjs';
import Export from '#build';
import service from '#service';

export default class extends Map { #b; #ns = new Namespaces(); #s = new Map(); #t = new Types( this );
	constructor( b ) { super(); this.#b = b; }
	ioc() {
		return this.set( service( RESERVED ).from( this.#ns.service( 'ioc' ) ) ); }
	has() {
		return super.has( ...arguments ) || this.#b.has( ...arguments ); }
	get( n ) {
		return super.get( n ) ?? this.add( this.#b.get( ...arguments ), ...arguments ); }
	set( o ) {
		return ( emit[ INCLUDING ]?.( o ), super.set( o.n, o ), o ); }
	add( [ n, t, f, d, r, sp, sa ], ...a ) {
		( sa == null ) || this.#s.set( n, [ sp, sa ] );
		[ n, t, f, d ] = this.#t.set( n, t, f, d, r, ...a );
		return this.set( service( t ).from( this.#ns.service( n ), d, f ) ); }
	export() {
		return new Export( this.#s, this.#ns, this ); } }
