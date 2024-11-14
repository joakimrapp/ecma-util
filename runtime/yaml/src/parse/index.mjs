import match from './regexp.mjs';

class Node {
	#o; constructor( p, i ) { this.#o = { p, i }; this.parent = p; }
	get value() { const { t, v } = this.#o; return t === 'a' ? v.map( ( { value } ) => value ) : t === 'o' ? Object.fromEntries( v.map( ( [ k, { value } ] ) => [ k, value ] ) ) : v; }
	get root() { return this.parent ?? this; }
	type( t, a ) { if( ( this.#o.t ??= t ) !== t ) throw new Error( `type error, ${t} <> ${this.#o.t}` ); else if( a != null ) return ( this.#o.v ??= [] ).push( a ), a; else return this.#o; }
	next( i ) { const { done, value } = i.next(); if( done ) return this.root.value; else return this.get( value ).next( i ); }
	get( o ) { return o.i < this.#o.i ? this.parent.get( ...arguments ) : ( o.a ? this.type( 'a', new Node( this, ( o.i += 2 ) ) ) : this ).key( o ); }
	key( o ) { return ( 'k' in o ? this.type( 'o', [ o.k, new Node( this, ++o.i ) ] )[ 1 ] : this ).fn( o ); }
	fn( o ) { return ( 'f' in o ? this.type( 'o', [ o.f, new Node( this, o.i ) ] )[ 1 ] : this ).set( o ); }
	set( o ) { return ( 'v' in o ? ( ( this.type( 'v' ).v = o.v ), this.parent ) : this ); }
}

export default function( y ) { return new Node().next( match( y ) ); }
