import { LIFE, AUTO, SINGLETON, SCOPED } from '#constants';
import { LIFESTYLE } from '#errors';
import { emit, INCLUDING } from '#events';
import Ns from '#ns';
import service from './service.mjs';
import encode from './encode.mjs';

class Scoped extends Map {
	add( n, a ) { super.get( n )?.add( a ) ?? super.set( n, new Set( [ a ] ) ); }
	arg( o, n ) { return ( ( n != null ) && this.has( o.n ) && this.add( n, o.n ), o ); }
	get( n, t ) { switch( t & LIFE ) {
		case AUTO: return ( t - AUTO ) | ( this.has( n ) ? SCOPED : SINGLETON );
		case SCOPED: return ( this.add( n, n ), t );
		case SINGLETON: return this.has( n ) ? LIFESTYLE.throw( n, ...super.get( n ) ) : t;
		default: return t; } } }

class Sources extends Map {
	add( n, sp, sa ) { if( sa != null ) this.set( n, [ sp, sa ] ); } }

export default class extends Map {
	#b; #ns = new Ns(); #sources = new Sources(); #l = new Scoped();
	constructor( build ) { super(); this.#b = build; }
	set( o ) { return ( emit[ INCLUDING ]?.( o ), super.set( o.n, o ), o ); }
	has() { return super.has( ...arguments ) || this.#b.has( ...arguments ) || service.has( ...arguments ); }
	get( n, p ) { return this.#l.arg( super.get( n ) ?? this.set( this.#b.has( n ) ? this.res( arguments ) : service.get( this.#ns.add( n ), n, p ) ), p ); }
	res( a, [ n, t, f, d, r, ...s ] = this.#b.get( ...a ) ) { return ( this.#sources.add( n, ...s ), d = service.res( this, a, d, r ), t = this.#l.get( n, t ), service.from( t, this.#ns.add( n ), d, f ) ); }
	export( p ) { return encode( this.#sources, this.#ns, this, p ); } }
