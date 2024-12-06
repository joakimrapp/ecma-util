import { find, join } from '@jrapp/node-fs';
import { emit } from '../../events.mjs';
import { values } from '@jrapp/object';
import { set, create, targets } from '../util.mjs';
import IoC from './ioc.mjs';

const
	scan = '**/*!(.skip|node_modules|.git|target)/*!(.skip).(mjs)',
	getPath = p => ( emit.scanning?.( p ), join( p, scan ) ),
	scanAll = ( m, a ) => Promise.all( a.map( p => find( p, async a => ( emit.importing?.( a ), IoC.from( m, a, await import( a ) ) ) ) ) ).then( () => m );

export default class extends Registry { 

	static async scan( ...a ) { return new this( await scanAll( {}, a.map( getPath ) ) ); }
	mock() { return this.clone().mock( ...arguments ); } }
