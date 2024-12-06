import { AMBIGUOUS } from '../errors.mjs';
import { emit, REGISTERING } from '../debug/events.mjs';
import { from } from '@jrapp/object';

const
	DEFAULT = '<default>',
	get = a => [ ...new Set( a.flat().map( i => i?.match( /\w+/g ) ?? [] ).flat() ) ],
	add = a => ( a = get( a ) ).length ? a : [ DEFAULT ];

export default class { #o = {}; #a;
	constructor( a = [] ) {
		this.#o = from( ( this.#a = a ).map( ( ...e ) => e ) ); }
	export() { return [ ...this.#a ]; }
	clone() { return new this.constructor( this.export() ); }
	*map() { for( let i of arguments ) if( i in this.#o ) yield this.#o[ i ]; }
	add( a ) { return add( a ).map( i => [ i, ( this.#o[ i ] ??= ( this.#a.push( i ) - 1 ) ) ] ); }
	has( a ) { return [ ...this.map( DEFAULT, ...get( a ) ) ]; }
	get( a ) { return [ ...this.map( ...get( a ), DEFAULT ) ]; }
	set( [ o = {}, a = [], i = a.length ] = [], n, bt, l, f, s, t, d, r ) {
		emit[ REGISTERING ]?.( { n, ...bt?.length && { bt }, l, ...s && { s }, d, r } );
		bt = this.add( bt ).map( ( [ btk, bti ] ) => ( bti in o ) ? AMBIGUOUS.throw( n, btk ) : ( o[ bti ] = i, bti ) );
		return [ o, [ ...a, [ [ l, f, s, t, d, r ], bt ] ] ]; } }
