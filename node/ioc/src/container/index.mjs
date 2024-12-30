import { MISSING } from '#errors';
import Container from './container.mjs';

class Scope { #s; #c;
	constructor( s, c ) { ( this.#s = s, this.#c = c ); }
	has( n ) { return this.#s.has( n ) && this.#c.has( n, this.#s.get( n ) ); }
	resolve( n ) { return this.#c.resolve( this.#s.get( n ) ?? MISSING.throw( n ) ); } }

export default class extends Scope { #s; #c;
	static from( s, e ) { return new this( s, new Container( e ) ); }
	constructor( s, c ) { super( s, c ); ( this.#s = s, this.#c = c ); }
	scope( e ) { return new Scope( this.#s, new Container( e, this.#c ) ); } }
