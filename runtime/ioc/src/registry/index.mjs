import { define } from '@jrapp/object';
import { SCANNING, REGISTERING } from '../events.mjs';
import { SERVICE_MISSING, TARGETS_MISSING } from './errors.mjs';
import { EventEmitter } from 'node:events';
import { Service, Singleton, Scoped } from './service.mjs';
import find from './find.mjs';
import Targets from './targets.mjs';
import Services from './services.mjs';

export default class extends Map { #e;
	#add( o ) { this.#e?.emit( REGISTERING, o ); super.has( o.n ) ? super.get( o.n ).set( o ) : this.set( o.n, new Targets().set( o ) ); return this; }
	async scan( p ) { this.#e?.emit( SCANNING, p ); for( let i of await find( p, this.#e ) ) this.#add( i, this.#e ); return this; }
	get events() { return this.#e ??= new EventEmitter(); }
	has( n, ...a ) { return super.get( n )?.has( ...a ); }
	get( n, ...a ) { return ( super.get( n ) ?? SERVICE_MISSING.throw( n ) ).get( ...a ) ?? TARGETS_MISSING.throw( ...arguments ); }
	service( n, i, b ) { return this.#add( new Service( { n, i, b: b?.split( '.' ) } ) ); }
	singleton( n, i, b ) { return this.#add( new Singleton( { n, i, b: b?.split( '.' ) } ) ); }
	scoped( n, i, b ) { return this.#add( new Scoped( { n, i, b: b?.split( '.' ) } ) ); }
	targets( ...a ) { return new Services( this, a, this.#e ); }
	mock( n, i ) { return new this.constructor( this.entries() ).set( n, new Targets().set( { n, i: i instanceof Function ? i : () => i } ) ); } }
