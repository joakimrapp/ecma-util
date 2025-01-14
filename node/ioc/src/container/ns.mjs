import { defines, enumerable } from '@jrapp/object';
import { COLLISION } from '#errors';

const
	re = /^(?:(.+?)\.)?(\w+)$/;

class Namespace {
	constructor( [ n, ns, k ], i ) { defines( this, { n: { value: n, enumerable }, ns: { value: ns }, k: { value: k }, i: { value: i } } ); }
	id( k ) { return [ `${this.n}.${k}`, this, k ]; } }

export default class extends Map { #a = []; #s = new Map;
	id( k, i ) { return i == null ? [ k, this, k ] : this.#a[ i ].id( k ); }
	ns() { return this.#a[ this.#a.length ] = new Namespace( this.id( ...arguments ) ); }
	put() { const o = new Namespace( ...arguments ); return ( super.set( o.n, o ), o ); }
	get( n, s ) { return super.get( n ) ?? ( this.#s?.has( n ) ? COLLISION.throw( n, s ) : this.put( this.arg( n, s ), this.size ) ); }
	arg( n, s ) { const [ , ns, k ] = n?.match( re ) ?? []; return [ n, ns == null ? this : this.get( ns, s ), k ]; }
	add( n ) { return ( this.has( n ) ? COLLISION.throw( n, n ) : this.#s.set( n, this.#s.size ), this.arg( n, n ) ); } }
