import Container from '#container';

export default class Build { #s;
	constructor( s ) { this.#s = s; }
	has( n ) { return this.#s.has( n ); }
	get( n ) { return this.#s.get( n ); }
	include( ...a ) { return ( a.forEach( n => this.#s.get( n ) ), this ); }
	container() { return new Container( this.#s, ...arguments ); } }
