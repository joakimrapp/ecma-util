import { SINGLETON, SCOPED, TRANSIENT } from '../service/constants.mjs';
import { emit, RESOLVE } from '../debug/events.mjs';
import { SCOPE } from '#errors';
import { define } from '@jrapp/object';
import resolve from './resolve.mjs';

const
	all = Promise.all.bind( Promise ),
	set = ( c, { n, ns, k }, v ) => {
		if( n !== k ) ( c[ ns.n ] ?? set( c, ns, {} ) )[ k ] = v;
		return c[ n ] = v; };

export default class extends Map { #c; #i; #ns = {};
	constructor( i = {}, c ) { super(); ( define( this, 'l', { value: c ? SCOPED : SINGLETON } ), this.#i = i, this.#c = c ); }
	has( o ) { if( o )
		return ( ( this.l === SCOPED ) || ( o.l !== SCOPED ) ); }
	get( o ) { switch( o.l ) {
		case TRANSIENT: return this.res( ...arguments );
		case this.l: return super.get( o.n ) ?? this.set( o, this.res( ...arguments ) );
		default: if( !this.#c ) SCOPE.throw( o.n ); else return super.get( o.n ) ?? this.set( o, this.#c.get( ...arguments ) ); } }
	all( { d }, f ) {
		return all( d.map( a => a.all?.( this, this.#ns, f ) ?? this.get( a, f ) ) ); }
	set( o, p ) {
		super.set( o.n, ( p = p.then( v => set( this.#ns, o, v ) ) ) );
		return p.catch( e => { this.delete( o.n ); throw e; } ); }
	async res( o, f ) {
		if( o.i ) return f?.( this, o ) ?? o.i( ...await this.all( o ) );
		else return this.#i[ o.n ] ?? SCOPE.throw( o.n ); }
	resolve( a ) { return emit[ RESOLVE ] ? resolve( this, a ) : this.get( a ); } }
