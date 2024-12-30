import { emit, SCANNING, IMPORTING } from '#events';
import { find } from '@jrapp/node-fs';
import { join } from '@jrapp/node-path';
import Runtime from './runtime.mjs';
import Source from './source.mjs';
import Repository from './repository.mjs';

const
	SCAN = '**/*!(.skip|node_modules|.git|target)/*!(.skip).(mjs)';

export default class extends Runtime { #r;
	constructor( r = new Repository() ) { super( r ); this.#r = r; }
	async import( p ) { return ( emit[ IMPORTING ]?.( p ), new Source( this.#r, p, await import( p ) ), this ); }
	async scan( ...a ) { return ( await Promise.all( a.map( i => find( ( emit[ SCANNING ]?.( i ), join( i, SCAN ) ), this.import.bind( this ) ) ) ), this ); }
	export() { return this.#r.export(); }
	register() { return new Runtime( this.#r.clone() ).register( ...arguments ); }
	set() { return new Runtime( this.#r.clone() ).set( ...arguments ); } }
