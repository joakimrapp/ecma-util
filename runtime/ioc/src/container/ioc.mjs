import { MISSING, SCOPE, LIFESTYLE, CYCLIC } from './errors.mjs';
import { define } from '@jrapp/object';
import { isArray } from '@jrapp/is-type';

const
	all = Promise.all.bind( Promise );

class Context {
	#p; #o; #d; #r; constructor( o, p ) { this.#p = p; this.#o = o; this.n = o.n; this.l = o.l; define( this, 'level', { value: p ? p.level + 1 : 1 } ); }
	is( lifestyle ) { return this.l === lifestyle; }
	ns( v, ...a ) { return ( this.#o.ns.reduce( ( ns, k ) => ( ns[ k ] ??= {} ), ...a )[ this.#o.k ] = v ); }
	next( o ) { const a = new Context( o, this ); ( this.#d ??= [] ).push( a ); return a; }
	verify( n ) { if( this.n === n ) CYCLIC.throw( ...arguments ); this.#p?.verify( this.n, ...arguments ); }
	get d() { return this.#o.d.map( a => isArray( a ) ? a.map( e => this.next( e ) ) : this.next( a ) ); }
	async inject( a ) { const r = ( this.#r = [ Date.now() ] ); try { return await this.#o.inject( a ); } catch( e ) { r[ 2 ] = 1; throw e; } finally{ r[ 1 ] = Date.now(); } }
	transient( c ) { if( !this.l ) return this.#o.inject( this.#p.n, c, this ); }
	*get() { if( this.#r ) { yield [ this.#o.l, this.level, this.n, this.#r ]; if( this.#d ) for( let e of this.#d.flat() ) yield* e.get(); } } }

class Container extends Map { #ns = {};
	get( o ) { return super.get( o.n ); }
	set( o, p ) { return o.l ? super.set( o.n, ( p = p.then( v => o.ns( v, this.#ns ) ).catch( e => { this.delete( o.n ); throw e; } ) ) ) : LIFESTYLE.throw( o.n ), p; }
	res( o ) { return this.set( o, all( o.d.map( a => isArray( a ) ? all( a.map( e => this.set( e, this.res( e ) ) ) ).then( () => this.#ns ) : a.l ? this.set( a, this.res( a ) ) : this.res( a ) ) ).then( a => o.inject( a ) ) ); } }
class Singleton extends Container {
	res( o ) { return this.get( o ) ?? ( o.is( 1 ) ? super.res( o ) : o.transient( this ) ?? MISSING.throw( o.n ) ); } }
class Scope extends Container { #container;
	constructor( container, ...a ) { super( a ); this.#container = container; }
	res( o ) { return this.get( o ) ?? ( o.is( 2 ) ? super.res( o ) : o.transient( this ) ?? this.set( o, this.#container.res( o ) ) ); } }

export class RuntimeWrapper { #s; #c; #o;
	constructor( s, c, o ) { this.#s = s; this.#c = c; this.#o = o; }
	async resolve( n ) { return this.#c.res( this.#o.next( this.#s.get( n ) ) ); } }
export class ScopeWrapper { #s; #c;
	constructor( s, c ) { this.#s = s; this.#c = c; }
	async resolve( n, f ) { const o = new Context( this.#s.get( n ) ); try { return await this.#c.res( o ); } finally { f?.( o.get() ); } } }
export class SingletonWrapper { #s; #c;
	constructor( s ) { this.#s = s; }
	has() { return this.#s.has( ...arguments ); }
	scope( ...a ) { return new ScopeWrapper( this.#s, new Scope( ( this.#c ??= new Singleton() ), ...this.#s.evt.map( ( n, i ) => [ n, Promise.resolve( a.at( i ) ?? SCOPE.throw( n ) ) ] ) ) ); } }
