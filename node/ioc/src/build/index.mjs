import { writeFile } from '@jrapp/node-fs';
import render from './render.mjs';
import get from './get.mjs';

export default class { #a;
	constructor() {
		this.#a = [ ...get.export( ...arguments ) ]; }
	render( path ) {
		return render.container( path, ...this.#a ); }
	async write( path ) {
		return await writeFile( path, this.render( path ) ); } }
