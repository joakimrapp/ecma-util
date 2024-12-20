import { MISSING, CYCLIC } from '#errors';
import { emit, BUILDING } from '#events';

const
	DEFAULT = 'default',
	get = a => [ ...new Set( a.flat().map( i => i?.match( /\w+/g ) ?? [] ).flat() ) ],
	find = ( o, a ) => { if( o ) for( let i of a ) for( let [ b, v ] of o ) if( i & b ) return v; };

class Targets { #o; #a; #i;
	constructor( o, ...a ) { this.#o = o; this.#a = a; this.#i = a.reduce( ( m, i ) => m + i, 0 ); }
	has( n ) { return this.#o[ n ]?.some( a => a[ 0 ] & this.#i ) }
	get( n, ...a ) { return a.includes( n ) ? CYCLIC.throw( n, ...a ) : [ n, ...find( this.#o[ n ], this.#a ) ?? MISSING.throw( n, ...a ) ]; } }

export default class extends Array { #o = {};
	get( s ) { return this.#o[ s ] ??= ( 1 << ( this.push( s ) - 1 ) ); }
	add( a ) { return get( a ).reduce( ( i, s ) => i + this.get( s ), 0 ) || this.get( DEFAULT ); }
	build( o, a ) {
		a = get( ...a ).filter( s => s in this.#o ).map( s => this.#o[ s ] );
		emit[ BUILDING ]?.( a.length ? a.map( i => this[ Math.log2( i ) ] ) : [ DEFAULT ] );
		return new Targets( o, ...a, this.get( DEFAULT ) ); }
	*toStrings( a ) {
		for( let i = 0 ; a ; i++, a >>= 1 )
			if( a & 1 )
				yield this[ i ]; } }
