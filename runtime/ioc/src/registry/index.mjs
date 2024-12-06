import { AUTO, TRANSIENT, SINGLETON, SCOPED } from '../constants.mjs';
import { COMMAND } from '../errors.mjs';
import { create, getS, getN } from '../service/parse.mjs';
import { entries } from '@jrapp/object';
import { isFn, isLiteral, isString } from '@jrapp/is-type';
import { emit, BUILDING } from '#events';
import Build from './build.mjs';
import Services from './services.mjs';

export default class { #o; #ns; #bt = []; #s;
	static async source( services, p ) {
		const { $ioc: a, ...o } = await import( p );
		if( isFn( a ) ) a( new this( services, getS( p, o ) ) );
		else if( isLiteral( a ) ) {
			const ioc = new this( services, getS( p, o ) );
			for( let [ k, v ] of entries( a ) ) if( k in ioc )
				if( isLiteral( v ) ) for( let e of entries( v ) ) ioc[ k ]( ...e );
				else if( isString( v ) ) ioc[ k ]( v ); } }
	constructor( services = new Services(), s ) { this.#o = services; if( s ) this.#s = s; }
	namespace( ns ) { return ( this.#ns = ns, this ); }
	targets( ...bt ) { return ( this.#bt = bt, this ); }
	config( n, ...bt ) { return this.register( SINGLETON, n, null, bt ); }
	scope( n, ...bt ) { return this.register( SCOPED, n, null, bt ); }
	service() { return this.register( AUTO, ...arguments ); }
	transient() { return this.register( TRANSIENT, ...arguments ); }
	singleton() { return this.register( SINGLETON, ...arguments ); }
	scoped() { return this.register( SCOPED, ...arguments ); }
	register( l, n, f, ...bt ) {
		return ( this.#o.add( ...create( getN( this.#ns, n ), l, [ ...this.#bt, ...bt ], this.#s?.( f, n ) ?? [ f ] ) ), this ); }
	set( n, f ) {
		return ( this.#s ? COMMAND.throw( 'set' ) : this.#o.set( ...create( n, AUTO, [], [ f ] ) ), this ); }
	build( ...a ) {
		return ( emit[ BUILDING ]?.( a ), this.#s ? COMMAND.throw( 'build' ) : new Build( this.#o.has( a ), this.#o.get( a ) ) ); }
}
