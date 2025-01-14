import { SINGLETON, SCOPED } from '#constants';
import { emit, RESOLVE, SETTLED } from '#events';
import { MISSING } from '#errors';
import { defines } from '@jrapp/object';

const now = Date.now.bind( Date );
async function res( k, o ) { return o[ k ]; }
function *get( e, l = 0 ) { for( let [ o, tc, ti, te, tr, ...a ] of e ) {
	yield [ o, l, !!te, a.map( ( [ { n } ] ) => n ), tc, ti, tr || te ];
	yield* get( a, l + 1 ); } }
function set( o, { n, ns, k }, v ) { return ( ( n === k ) || ( ( o[ ns.n ] ?? set( o, ns, {} ) )[ k ] = v ), o[ n ] = v ); }

class Context extends Array {
	get o() { return this[ 0 ]; }
	res( o ) { return this[ this.length ] = new Context( o, now(), 0, 0, 0 ); }
	set( i ) { this[ i ] = now(); }
	get( i, a ) { return this[ i ] - this[ i - a ]; } }

class Container extends Map {
	constructor( services, input = {}, value ) {
		super();
		for( let n in defines( this, { s: { value: services }, l: { value: value ? SCOPED : SINGLETON }, c: { value }, ns: { value: input } } ).ns )
			super.set( n, res( n, input ) ); }
	has() { return this.s.has( ...arguments ) && ( ( this.l === SCOPED ) || ( this.s.get( ...arguments ).l !== SCOPED ) ); }
	set( o, p ) { return ( p = p.then( v => set( this.ns, o, v ) ).catch( e => { this.delete( o.n ); throw e; } ), super.set( o.n, p ), p ); }
	res( n, ...a ) { return ( this.s.get( n ) ?? MISSING.throw( ...arguments ) ).get( this, ...a ); }
	scope( input ) { return new this.constructor( this.s, input, this ); } }

class Scope { #c;
	constructor( container ) { this.#c = container; }
	has() { return this.#c.s.has( ...arguments ) && ( ( this.#c.l === SCOPED ) || this.#c.s.get( ...arguments ).l !== SCOPED ); }
	scope() { return new Scope( this.#c.scope( ...arguments ) ); }
	async resolve( n, create = true ) {
		const a = this.#c.s.get( n ) ?? MISSING.throw( n );
		if( !create ) return a.get( this.#c );
		emit[ RESOLVE ]?.( a );
		const x = new Context(), t = now();
		try { return await a.get( this.#c, x ); }
		finally { emit[ SETTLED ]?.( a, t, now(), Array.from( get( x ) ) ); } } }

export default class extends Scope {
	constructor() { super( new Container( ...arguments ) ); } }
