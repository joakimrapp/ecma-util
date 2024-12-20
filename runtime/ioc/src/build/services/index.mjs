import { writeFile } from '@jrapp/node-fs';
import render from './render.mjs';
import extract from './export.mjs';

export default class { #s; #o = {};
	static from() { return new this( ...arguments ); }
	constructor( s ) { this.#s = s; }
	get exported() { return this.#o.exported ??= extract.services( this.#s ); }
	render( path ) { return render.container( path, ...this.exported ); }
	async write( path ) { return await writeFile( path, this.render( path ) ); } }
