import { emit, RESOLVE } from '../debug/events.mjs';
import { MISSING } from '../errors.mjs';
import resolve from '../debug/resolve.mjs';

class IoC { #s; #c;
	constructor( s, c ) {
		( this.#s = s, this.#c = c ); }
	has( n ) { return this.#s.has( n ) && this.#c.gets( this.#s.get( n ) ); }
	resolve( n, f ) {
		const a = this.#s.get( n );
		if( ( a != null ) && this.#c.gets( a ) )
			return emit[ RESOLVE ] ? resolve( this.#c, a ) : a.get( this.#c );
		else MISSING.throw( n ); } }

export default class extends IoC { #s; #c;
	constructor( s, c ) {
		super( s, c );
		( this.#s = s, this.#c = c ); }
	scope() { return new IoC( this.#s, this.#c.scope( ...arguments ) ); } }
