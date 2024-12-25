import { EXPORT } from '#errors';
import { isFn, isString, isLiteral, isIterable } from '@jrapp/is-type';
import { entries, keys } from '@jrapp/object';
import Registry from './registry.mjs';

const
	SOURCE = '$ioc',
	find = ( o, f ) => { for( let k in o ) if( f === o[ k ] ) return k; };

export default class extends Registry { #p; #o;
	constructor( r, p, { [ SOURCE ]: a, ...o } ) {
		super( r );
		( this.#p = p, this.#o = o );
		if( isFn( a ) ) a( this );
		else if( isLiteral( a ) ) for( let [ k, v ] of entries( a ) ) if( k in this )
			if( isLiteral( v ) ) for( let e of entries( v ) ) this[ k ]( ...e );
			else if( isIterable( v ) ) for( let e of v ) this[ k ]( e );
			else if( isString( v ) ) this[ k ]( v ); }
	register( n, b, l, f ) {
		if( f == null ) return super.register( n, b, l );
		else if( isString( f ) ) return super.register( n, b, l, this.#o[ f ] ?? EXPORT.throw( n, this.#p ), [ this.#p, f ] );
		else return super.register( n, b, l, f, [ this.#p, find( this.#o, f ) ?? EXPORT.throw( n, this.#p ) ] ); } }
