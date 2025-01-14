import { AUTO, TRANSIENT, SINGLETON, SCOPED } from '#constants';
import { emit, SCANNING, IMPORTING } from '#events';
import { EXPORT } from '#errors';
import { find } from '@jrapp/node-fs';
import { join } from '@jrapp/node-path';
import { entries } from '@jrapp/object';
import { isFn, isString, isLiteral, isIterable } from '@jrapp/is';
import { Build, BuildExporter} from './build.mjs';
import Services from '../container/services.mjs';
import Repository from './repository.mjs';

const
	SCAN = '**/*!(.skip|node_modules|.git|target)/*!(.skip).(mjs)',
	SOURCE = '$ioc',
	get = ( o, f ) => { for( let k in o ) if( f === o[ k ] ) return k; };

class Registry { #r; #ns; #b = [];
	constructor( r ) { this.#r = r; }
	namespace( ns ) { return ( this.#ns = ns, this ); }
	targets( ...b ) { return ( this.#b = b, this ); }
	config( n, ...b ) { return this.register( SINGLETON, n, b ); }
	input( n, ...b ) { return this.register( SCOPED, n, b ); }
	service( n, f, ...b ) { return this.register( AUTO, n, b, f ); }
	transient( n, f, ...b ) { return this.register( TRANSIENT, n, b, f ); }
	singleton( n, f, ...b ) { return this.register( SINGLETON, n, b, f ); }
	scoped( n, f, ...b ) { return this.register( SCOPED, n, b, f ); }
	register( l, n, b, f, s ) { return ( this.#r.add( this.#ns?.length ? `${this.#ns}.${n}` : n, [ ...this.#b, ...b ], l, f, s ), this ); } }

class Source extends Registry { #p; #o;
	constructor( r, p, { [ SOURCE ]: a, ...o } ) {
		super( r );
		( this.#p = p, this.#o = o );
		if( isFn( a ) ) a( this );
		else if( isLiteral( a ) ) for( let [ k, v ] of entries( a ) ) if( k in this )
			if( isLiteral( v ) ) for( let e of entries( v ) ) this[ k ]( ...e );
			else if( isIterable( v ) ) for( let e of v ) this[ k ]( e );
			else if( isString( v ) ) this[ k ]( v ); }
	register( n, b, l, f ) {
		if( f == null ) return super.register( n, b, l );
		else if( isString( f ) ) return super.register( n, b, l, this.#o[ f ] ?? EXPORT.throw( n, this.#p ), [ this.#p, f ] );
		else return super.register( n, b, l, f, [ this.#p, get( this.#o, f ) ?? EXPORT.throw( n, this.#p ) ] ); } }

class Runtime extends Registry { #r;
	constructor( r ) { super( r ); this.#r = r; }
	set( n, f, ...b ) { return ( this.#r.set( n, b, AUTO, f ), this ); }
	build( ...a ) { return new Build( new Services( this.#r.build( a ) ) ); }
	container( o, ...a ) { return this.build( ...a ).container( o ); } }

export default class extends Runtime { #r;
	constructor( r = new Repository() ) { super( r ); this.#r = r; }
	async import( p ) { return ( emit[ IMPORTING ]?.( p ), new Source( this.#r, p, await import( p ) ), this ); }
	async scan( ...a ) { return ( await Promise.all( a.map( i => find( ( emit[ SCANNING ]?.( i ), join( i, SCAN ) ), this.import.bind( this ) ) ) ), this ); }
	export() { return this.#r.export(); }
	build( ...a ) { return new BuildExporter( new Services( this.#r.build( a ) ) ); }
	register() { return new Runtime( this.#r.clone() ).register( ...arguments ); }
	set() { return new Runtime( this.#r.clone() ).set( ...arguments ); } }
