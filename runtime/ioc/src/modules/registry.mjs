import { SCANNING, REGISTERING } from '../events.mjs';
import { TARGET_EXISTS } from '../errors.mjs';
import { EventEmitter } from 'node:events';
import { Service, Singleton, Scoped } from './service.mjs';
import find from './find.mjs';
import Services from './services.mjs';

class Item extends Map { #o;
	get default() { return this.#o; }
	set default( o ) { if( this.#o == null ) this.#o === o; else OVERWRITE_NOT_PERMITTED.throw( o.n,  ); }
	has( ...a ) { return super.has( 'default' ) || a.some( i => super.has( i ) ); }
	get( ...a ) { for( let b of a ) if( super.has( b ) ) return super.get( b ); return super.get( 'default' ); }
	set( o ) { if( o.b ) for( let b of o.b ) if( !super.has( b ) ) super.set( b, o ); else TARGET_EXISTS.throw( o.n ); return this; } }

class Registry extends Map { #e;
	#add( o ) { this.#e?.emit( REGISTERING, o ); super.has( o.n ) ? super.get( o.n )?.set( o ) : this.set( o.n, new Item().set( o ) ); return this; }
	async scan( p ) { this.#e?.emit( SCANNING, p ); for( let i of await find( p, this.#e ) ) this.#add( i, this.#e ); return this; }
	get events() { return this.#e ??= new EventEmitter(); }
	has( n, ...a ) { return super.get( n )?.has( ...a ); }
	get( n, ...a ) { return super.get( n )?.get( ...a ) ?? MODULE_NOT_REGISTERED.throw( ...arguments ); }
	register( n, i, b ) { return this.#add( new Service( { n, i, b: b?.split( '.' ) } ) ); }
	singleton( n, i, b ) { return this.#add( new Singleton( { n, i, b: b?.split( '.' ) } ) ); }
	scoped( n, i, b ) { return this.#add( new Scoped( { n, i, b: b?.split( '.' ) } ) ); }
	targets( ...a ) { return new Services( this, a, this.#e ); }
	mock( n, i ) { return new this.constructor( this.entries() ).set( n, { default: new Service( { n, i: i instanceof Function ? i : () => i } ) } ); } }

export default class extends EventEmitter {
	#o = new Registry;
}
