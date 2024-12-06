import { AUTO, SINGLETON, SCOPED, TRANSIENT } from '../constants.mjs';
import { COLLISION, ARGUMENT, LIFESTYLE, MISSING } from '../errors.mjs';
import { isIterable } from '@jrapp/is-type';
import service from '../service/index.mjs';
import Services from '../container/services.mjs';
import build from '@jrapp/iterable/build';

const
	reN = /\w+$/,
	reNs = /^.+?(?=\.\w+$)/,
	find = ( has, n ) => { do if( has( n ) ) return n; else n = n.match( reNs )?.[ 0 ]; while( n != null ); };

class Scoped extends Map {
	set( n, p = n ) { super.get( p )?.add( n ) ?? super.set( p, new Set( [ n ] ) ); }
	add( o, n ) { return ( this.has( o.n ) && this.set( n, o.n ), o ); }
	arg( o, n ) { return ( o.l === TRANSIENT ) ? ARGUMENT.throw( o.n, n ) : this.add( ...arguments ); }
	get( n, l ) { switch( l ) {
		case AUTO: return this.has( n ) ? SCOPED : SINGLETON;
		case SCOPED: this.set( n ); return l;
		case SINGLETON: if( this.has( n ) ) LIFESTYLE.throw( n, ...super.get( n ) );
		default: return l; } }
	*all( has, get, r, d = [], n ) {
		r?.forEach( e => this.add( get( e ), n ) );
		for( let e of d )
			if( isIterable( e ) ) yield build().unique().map( i => this.arg( get( i ), n ) ).array( e.map( i => find( has, i ) ?? MISSING.throw( i, n ) ) );
			else yield this.add( get( has( e ) ? e : n.replace( reN, e ) ), n ); } }

export default class extends Services { #has; #get; #scoped = new Scoped(); #sources = new Map();
	constructor( has, get ) { super(); this.#has = ( n => this.has( n ) || has( n ) ); this.#get = get; }
	export() {
		for( let { n, l, t, d } of this.values() ) {}
	}
	include( ...a ) { return ( a.forEach( n => this.get( n ) ), this ); }
	get( n ) { return super.get( n ) ?? this.add( ...arguments ); }
	add() {
		let scoped = this.#scoped, [ n, l, f, s, t, d, r ] = this.#get( ...arguments );
		for( let ns = n ; ( ns = ns.match( reNs )?.[ 0 ] ) != null ; this.has( ns ) && COLLISION.throw( n, ns ) );
		s && this.#sources.set( n, s );
		return super.add( service( n, f, [ ...scoped.all( this.#has, i => this.get( i, ...arguments ), r, d, n ) ], t, scoped.get( n, l ) ) ); } }
