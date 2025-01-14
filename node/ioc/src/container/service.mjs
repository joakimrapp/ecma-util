import { TRANSIENT, SINGLETON, SCOPED, NEW, BIND, INJECT, LIFE, INJECTS, RESERVED } from '#constants';
import { ARGUMENT, MISSING, SCOPE, CONTAINER } from '#errors';
import { all, default as from, isIterable as is } from '@jrapp/iterable';
import { define, defines, defineName, enumerable } from '@jrapp/object';
import { isIterable } from '@jrapp/is';
import { emit, RESOLVING, INJECTING, REJECTED, RESOLVED } from '#events';
import RegExp from '@jrapp/regexp';

const
	reArg = new RegExp( /^.+?(?=\.\w+$)/ ),
	reArgs = new RegExp( /\w+$/ ),
	lifes = 'service|transient|singleton|scoped'.match( /\w+/g ),
	upper = Function.prototype.call.bind( String.prototype.toUpperCase ),
	test = ( o, n ) => o.l === TRANSIENT ? ARGUMENT.throw( o.n, n ) : o,
	find = ( s, e, p ) => from( e, n => reArg.reduce( n ).find( i => s.has( i ) ) ?? MISSING.throw( e, p ) ).unique(),
	set = ( [ t, l, n, T ] ) => ( defines( T.prototype, { t: { value: t }, l: { value: l }, type: { value: n } } ), defineName( T, n ) ),
	inject = function() { return new this( ...arguments ); };

class Arg extends Array {
	static name = 'arg';
	static res( s, a, e ) { return is( e ) ? this.from( find( s, e, ...a ), n => test( s.get( n, ...a ), ...a ) ) : s.get( s.has( e ) ? e : a[ 0 ].replace( reArgs, e ), ...a ); }
	async get( { ns } ) { return ( await all( this.map( i => ( i.n in ns ) || i.get( ...arguments ) ) ), ns ); } }

class Reserved {
	static type( t ) { switch( t ) {
		case SINGLETON: return [ t, SINGLETON, 'input.singleton', class extends this {} ];
		case SCOPED: return [ t, SCOPED, 'input.scoped', class extends this {} ];
		default: return [ RESERVED, TRANSIENT, 'reserved', class extends this {
			constructor( [ n ] ) { super( ...arguments ); ( n === 'ioc' ) || define( this, 'get', { async value( c, x, o ) { return o; } } ); }
			async get( c, x ) { return { resolve: n => c.res( n, x ) }; } } ]; } }
	constructor( [ n, ns, k ] ) { defines( this, { n: { value: n, enumerable }, ns: { value: ns }, k: { value: k } } ); }
	get( c ) { return c.get( this.n ) ?? c.set( c.c?.get( this.n ) ?? SCOPE.throw( this.n ) ); } }

class Injectable {
	static type( t, type, l = t & LIFE, T ) {
		switch( t & INJECTS ) {
			case NEW: ( type = type.replace( /^./, upper ), T = class extends this { constructor( a, d, f ) { super( a, d, inject.bind( f ) ); } } ); break;
			case BIND: ( type = `${type}.inject`, T = class extends this { constructor( a, d, f ) { super( a, d, f[ INJECT ].bind( f ) ); } } ); break; }
		switch( l ) {
			case SINGLETON: return [ t, l, type, class extends ( T ?? this ) { get( c, x ) { return c.get( this.n ) ?? c.set( this, c.l === SINGLETON ? super.get( c, x ) : this.get( c.c, x ) ); } } ];
			case SCOPED: return [ t, l, type, class extends ( T ?? this ) { get( c, x ) { return c.get( this.n ) ?? ( c.l === SCOPED ? c.set( this, super.get( c, x ) ) : CONTAINER.throw( this.n ) ); } } ];
			default: return [ t, l, type, T ?? class extends this {} ]; } }
	constructor( [ n, ns, k ], d, f ) { defines( this, { n: { value: n, enumerable }, ns: { value: ns }, k: { value: k }, a: { value: d }, i: { value: f } } ); }
	async get( c, x, { a, i } = this ) {
		if( !x ) return a.length ? i( ...await all( a.map( o => o.get( c, x, this ) ) ) ) : i();
		else if( x = x?.res( this ), emit[ RESOLVING ]?.( this ), a.length ) a = await all( a.map( o => o.get( c, x, this ) ) );
		try { return ( x.set( 2 ), emit[ INJECTING ]?.( this, x.get( 2, 1 ) ), await i( ...a ) ); }
		catch( e ) { throw ( emit[ REJECTED ]?.( this, x.get( 3, 1 ), e ), e ); }
		finally { emit[ RESOLVED ]?.( this, x.get( 4, 2 ) ); } } }

export default {
	has() { return /^ioc(Service)?$/.test( ...arguments ); },
	get( i, n, p ) { return this.has( n ) ? this.from( RESERVED, i ) : MISSING.throw( n, p ); },
	res( s, a, d, r ) { return ( r?.forEach( i => s.get( i, ...a ) ), d?.map( e => Arg.res( s, a, e ) ) ); },
	dec( s, d ) { return d?.map( e => isIterable( e ) ? Arg.from( e, i => s.at( i ) ) : s.at( e ) ); },
	from( t, ...a ) { return new ( set[ t ] ??= set( t & INJECTS ? Injectable.type( t, lifes[ t & LIFE ] ) : Reserved.type( t ) ) )( ...a ); } };
