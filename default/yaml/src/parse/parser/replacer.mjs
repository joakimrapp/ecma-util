import { isFn } from '@jrapp/is';
import Matcher from './matcher.mjs';

const
	{ replace } = String.prototype,
	call = ( f, ...a ) => isFn( f ) ? f( ...a ) : f;

function fn( a ) {
	let [ f ] = this;
	for( let i = 1 ; i < this.length ; i++ )
		if( a[ i ] != null )
			return call( this[ i ], a[ i ], a );
	return call( this[ 0 ], a[ 0 ] );	}

export default class extends Matcher { #a;
	constructor( match, re, ...a ) {
		super( match );
		this.#a = [ re, fn.bind( a ) ]; }
	apply( a ) {
		return replace.call( a, ...this.#a ); }
}
