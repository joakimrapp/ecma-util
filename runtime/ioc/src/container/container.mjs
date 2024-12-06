import { SINGLETON, SCOPED, TRANSIENT } from '../constants.mjs';
import { SCOPE } from '../errors.mjs';
import { define } from '@jrapp/object';
const
	re = /(?:(.+?)\.)?(\w+)$/,
	key = n => key[ n ] ??= n.match( re ),
	put = ( o, [ n, ns, k ], v ) => ( o.set( n, v = {} ).get( ns ) ?? put( o, key( ns ) ) )[ k ] = v;

class Container extends Map { #i;
	constructor( input ) { super( [ [ , {} ] ] ); this.#i = input; }
	get o() { return define( this, 'o', { value: super.get() } ).o; }
	gets( a ) { return a != null; }
	sets( a ) { return ( this.gets( a ) && ( a.l !== TRANSIENT ) ); }
	input( a ) {
		return ( ( this.#i[ a ] != null ) && this.gets( a ) ) ? this.#i[ a ] : SCOPE.throw( a?.n ); }
	set() { return super.set( ...arguments ); }
	async put( n, p ) {
		const [ , ns, k ] = key( n );
		try { return ( this.set( n, p ).get( ns ) ?? put( this, key( ns ) ) )[ k ] = await p; }
		catch( e ) { this.delete( n ); throw e; } } }

class Scoped extends Container {
	static { define( this.prototype, 'l', { value: SCOPED } ); }
	constructor( c, ...a ) { super( ...a ); this.c = c; } }

export default class extends Container {
	static { define( this.prototype, 'l', { value: SINGLETON } ); }
	gets( o ) { return super.gets( o ) && ( o.l != SCOPED ); }
	scope() { return new Scoped( this, ...arguments ); } }
