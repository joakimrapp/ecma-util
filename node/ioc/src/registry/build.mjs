import { writeFile } from '@jrapp/node-fs';
import Container from '../container/index.mjs';

export class Build { #s;
	constructor( s ) { this.#s = s; }
	has( n ) { return this.#s.has( n ); }
	get( n ) { return this.#s.get( n ); }
	include( ...a ) { return ( a.forEach( n => this.#s.get( n ) ), this ); }
	container() { return new Container( this.#s, ...arguments ); } }

export class BuildExporter extends Build { #s;
	constructor( s ) { super( s ); this.#s = s; }
	export( p, ...a ) { return ( this.include( ...a ), this.#s.export( p ) ); }
	async write( p ) { return await writeFile( p, this.export( ...arguments ) ); } }
