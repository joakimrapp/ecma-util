import { AUTO, TRANSIENT, SINGLETON, SCOPED } from '#constants';

export default class { #r; #ns; #b = [];
	constructor( r ) { this.#r = r; }
	namespace( ns ) { return ( this.#ns = ns, this ); }
	targets( ...b ) { return ( this.#b = b, this ); }
	config( n, ...b ) { return this.register( SINGLETON, n, b ); }
	input( n, ...b ) { return this.register( SCOPED, n, b ); }
	service( n, f, ...b ) { return this.register( AUTO, n, b, f ); }
	transient( n, f, ...b ) { return this.register( TRANSIENT, n, b, f ); }
	singleton( n, f, ...b ) { return this.register( SINGLETON, n, b, f ); }
	scoped( n, f, ...b ) { return this.register( SCOPED, n, b, f ); }
	register( l, n, b, f, s ) { return ( this.#r.add( this.#ns?.length ? `${this.#ns}.${n}` : n, [ ...this.#b, ...b ], l, f, s ), this ); } }
