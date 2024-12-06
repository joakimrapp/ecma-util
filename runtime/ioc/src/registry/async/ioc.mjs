import { isFn, isLiteral } from '@jrapp/is-type';
import { TRANSIENT, SINGLETON, SCOPED, AUTO } from '../constants.mjs';
import { SERVICE_INVALID, EXPORT_MISSING } from '../../errors.mjs';
import { set, create, targets } from '../util.mjs';

const
	getSource = ( p, n, o, f ) => {
		if( !isFn( f ) ) SERVICE_INVALID.throw( p, n );
		else for( let k in o ) if( o[ k ] === f ) return [ p, k ]; },
	register = ( { m, p, o, b, ns }, l, n, f, ...a ) => {
		if( ns?.length ) n = `${ns}.${n}`;
		set( m, create( n, f, targets( ...b, ...a ), l, getSource( p, n, o, f ) ?? EXPORT_MISSING.throw( p, n ) ) ); };

function resolve( f ) {
	for( let [ k, a ] of entries( f ) )
		if( isLiteral( a ) ) for( let [ n, f ] of entries( a ) ) this[ k ]?.( n, f );
		else if( isString( a ) ) this[ k ]?.( a ); }

export default class { #a; #r;
	static from( m, p, { $ioc: a } ) {
		if( isFn( a ) ) a( new this( ...arguments ) );
		else if( isLiteral( a ) ) resolve.call( new this( ...arguments ), a ); }
	constructor( m, p, o ) { this.#r = register.bind( this, ( this.#a = { m, p, o, b: [] } ) ); }
	namespace( a ) { return ( this.#a.ns = a, this ); }
	targets( ...a ) { return ( this.#a.b = a, this ); }	
	service() { return ( this.#r( AUTO, ...arguments ), this ); }
	transient() { return ( this.#r( TRANSIENT, ...arguments ), this ); }
	singleton() { return ( this.#r( SINGLETON, ...arguments ), this ); }
	scoped() { return ( this.#r( SCOPED, ...arguments ), this ); } }
