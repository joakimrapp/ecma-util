import { COMPILING, INCLUDING } from '../events.mjs';
import { CYCLIC, UNREGISTERED, SERVICE_IN_NAMESPACE, EVENT_DEFINED, LIFESTYLE } from '../errors.mjs';
import { Transient, Singleton, Scoped, Input } from './service.mjs';
import { isArray } from '@jrapp/is-type';

const
	re = /^.*?(?=\.\w+$)/,
	transients = [ [ 'ioc', new Transient( { n: 'ioc' } ) ], [ 'log', new Transient( { n: 'log' } ) ] ];

export default class extends Map { #e; #o; #b; #i; #ns = new Set(); #t = new Map( transients );
	constructor( o, b, e ) { super(); this.#o = o; this.#b = b; this.#e = e; e?.emit( COMPILING, b ); }
	namespace( n, ns ) { for( ; ns?.length && ( !this.#ns.has( ns ) ) ; ns = ns.match( re )?.at( 0 ) ) if( this.has( ns ) ) SERVICE_IN_NAMESPACE.throw( n, ns ); else this.#ns.add( ns ); }
	event( ...a ) { if( this.#i ) EVENT_DEFINED.throw(); this.#i = new Map( a.map( k => [ k, new Input( { k } ) ] ) ); return this; }
	find( n ) { for( ; n?.length ; n = n.match( re )?.at( 0 ) ) if( this.has( n ) || this.#i?.has( n ) || this.#o.has( n, ...this.#b ) ) return n; }
	get( n, ...a ) { return super.get( n ) ?? this.#i.get( n ) ?? ( a.includes( n ) ? CYCLIC.throw( n, ...a ) : this.add( this.#o.get( n, ...this.#b ) ?? UNREGISTERED.throw( n, ...a ), n, ...a ) ); }
	arg( d, ...a ) { return [ ...new Set( d.map( n => this.find( n ) ) ) ].sort().map( n => this.get( n, ...a ) ); }
	add( { n, k, ns, t, l, c, i, d, r, s }, ...a ) {
		if( this.#ns.has( n ) ) SERVICE_IN_NAMESPACE.throw( n, ns ); else this.namespace( n, ns );
		d = d.map( e => isArray( e ) ? this.arg( e, ...a ) : this.#t.has( e ) ? this.#t.get( e ) : this.get( ns ? `${ns}.${e}` : e, ...a ) );
		const max = Math.max( 1, ...[ ...d.flat(), ...( r = r.map( e => this.get( e, ...a ) ) ) ].map( ( { l } ) => l ) );
		const Service = ( max > ( l ??= max ) ) ? LIFESTYLE.throw( n ) : l > 1 ? Scoped : Singleton, service = new Service( { n, k, ns, c, i, d, r, s } );
		return ( this.#e?.emit( INCLUDING, service ),  this.set( n, service ), service ); }
	include() { for( let n of arguments ) this.get( n ); return this; } }
