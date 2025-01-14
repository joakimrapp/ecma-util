import { INVOKE, BIND, NEW, LIFE, SINGLETON, SCOPED, INJECT } from '#constants';
import { AMBIGUOUS, INJECTABLE, MISSING, CYCLIC } from '#errors';
import { emit, REGISTERING, BUILDING } from '#events';
import { entries, from } from '@jrapp/object';
import { stringify, parseArgs, isFn, isClass } from '@jrapp/reflection';

const
	DEFAULT = 'default',
	IOC = 'ioc',
	reResolves = /(?<=ioc\s*\.\s*resolve\s*\(\s*(["'])\s*)[\w.]+(?=\1)/sg,
	parse = ( t, f, a, s, d = parseArgs( a ) ) => [ t, f, d, d.includes( IOC ) && stringify( a ).match( reResolves ) || [], ...s ?? [] ],
	service = ( l, f, s ) => {
		if( isFn( f?.[ INJECT ] ) ) return parse( BIND | ( l & LIFE ), f, f[ INJECT ], s );
		else if( isFn( f ) ) return parse( ( isClass( f ) ? NEW : INVOKE ) | ( l & LIFE ), f, f, s );
		else if( f == null ) return [ ( l & LIFE ) === SINGLETON ? SINGLETON : SCOPED ]; },
	get = a => [ ...new Set( a.flat().map( i => i?.match( /\w+/g ) ?? [] ).flat() ) ],
	find = ( o, a ) => { if( o ) for( let i of a ) for( let [ b, v ] of o ) if( i & b ) return v; };

class Services { #o; #a; #i;
	constructor( o, ...a ) { this.#o = o; this.#a = a; this.#i = a.reduce( ( m, i ) => m + i, 0 ); }
	has( n ) { return this.#o[ n ]?.some( a => a[ 0 ] & this.#i ); }
	get( n, ...a ) { return a.includes( n ) ? CYCLIC.throw( n, ...a ) : [ n, ...find( this.#o[ n ], this.#a ) ?? MISSING.throw( n, ...a ) ]; } }

class Targets extends Array { #o = {};
	get( s ) { return this.#o[ s ] ??= ( 1 << ( this.push( s ) - 1 ) ); }
	add( a ) { return get( a ).reduce( ( i, s ) => i + this.get( s ), 0 ) || this.get( DEFAULT ); }
	build( o, a ) {
		a = get( ...a ).filter( s => s in this.#o ).map( s => this.#o[ s ] );
		emit[ BUILDING ]?.( a.length ? a.map( i => this[ Math.log2( i ) ] ) : [ DEFAULT ] );
		return new Services( o, ...a, this.get( DEFAULT ) ); }
	*toStrings( a ) { for( let i = 0 ; a ; i++, a >>= 1 ) if( a & 1 ) yield this[ i ]; } }

export default class { #o; #b = new Targets();
	constructor( b, ...o ) { b?.forEach( s => this.#b.get( s ) ); this.#o = from( o ) ?? {}; }
	build( ...a ) { return this.#b.build( this.#o, a ); }
	export() { return [ [ ...this.#b ], ...[ ...entries( this.#o ) ].map( ( [ n, a ] ) => [ n, [ ...a ] ] ) ]; }
	clone() { return new this.constructor( ...this.export() ); }
	set( n ) { ( this.#o[ n ] = undefined, this.add( ...arguments ) ); }
	add( n, b, ...a ) {
		( b = this.#b.add( b ), this.#o[ n ]?.forEach( ( [ i ] ) => ( i & b ) && AMBIGUOUS.throw( n, [ ...this.#b.toStrings( i & b ) ] ) ) );
		( a = service( ...a ) ?? INJECTABLE.throw( n ), ( this.#o[ n ] ??= [] ).push( [ b, a ] ), emit[ REGISTERING ]?.( n, [ ...this.#b.toStrings( b ) ], ...a ) ); } }
