import { isIterable, isDefined, isNullish } from '@jrapp/is-type';
import { setIterator, IsNew, Next } from './util.mjs';
import array from './array.mjs';

export function *filter( i, f ) { for( let a of i ) if( f( a ) ) yield a; }
export function *flat( i ) { for( let a of i ) if( isIterable( a ) ) yield* a; else yield a; }
export function *map( i, f ) { for( let a of i ) yield f( a ); }


export function *values( v, f ) { for( ; v != null ; v = f( v ) ) yield v; }
export function find( i, f ) { for( let a of i ) if( f( a ) ) return a; }
export const defined = i => filter( i, isDefined );
export const unique = i => filter( i, IsNew() );

const reduce = ( ...a ) => a.reduce( map );

export default class Iterator {
	static from() { return new this( ...arguments ); }
	constructor() { setIterator( this, reduce( ...arguments ) ); }
	map() { return setIterator( this, map( this, ...arguments ) ); }
	flat() { return setIterator( this, reduce( flat( this ), ...arguments ) ); }
	filter( f, ...a ) { return setIterator( this, reduce( filter( this, f ), ...a ) ); }
	defined() { return this.filter( isDefined, ...arguments ); }
	unique() { return this.filter( IsNew(), ...arguments ); }
	array() { return array( this, ...arguments ); }
	find() { return find( this, ...arguments ); } }

export const
	iterator = Iterator.from.bind( Iterator ),
	generate = ( ...a ) => Iterator.from( values( ...a ) );

Arg.from( iterator( e, n => generate( e, i => i.match( re )?.[ 0 ] ?? reject() ).find( i => this.has() ) ).unique( i => this.get( i, ...a ) ).peek( verify ) )

;
class Arg extends Array {
	static get( o, a ) { return this.from(  ); }
	get() { return all( this.map( i => i.res( ...arguments ) ) ); }
}


find( generate( e, /^.+?(?=\.\w+$)/ ), i => this.has( i ) ) ?? X.throw( n, p )
