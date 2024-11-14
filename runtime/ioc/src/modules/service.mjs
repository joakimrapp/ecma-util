import { INPUT, TRANSIENT, SINGLETON, SCOPED, IOC } from '../constants.mjs';
import { cArgs, fArgs, resolves } from './parse.mjs';
import { define, defines, assign } from '@jrapp/object';
import { isClass } from '@jrapp/is-type/fn';

class Module {
	constructor( o ) {
		if( o.k == null ) { const [ , ns, k ] = o.n.match( /^(?:((?:[\w]+[^\w])*[\w]+)[^\w])?([\w]+)$/ ); assign( o, { ns, k } ); }
		o.n ??= o.ns ? `${o.ns}.${o.k}` : o.k;
		define( this, 'o', { value: o } ); }
	get n() { return this.o.n; }
	get ns() { return this.o.ns; }
	get k() { return this.o.k; } }

export class Service extends Module {
	get b() { return this.o.b; }
	get c() { return this.o.c ??= ( isClass( this.i ) && ( this.i.inject == null ) ? this.i : false ); }
	get i() { return this.o.i; }
	get d() { return this.o.d ??= this.c ? cArgs( this.c ) : fArgs( this.i.inject ?? this.i ); }
	get r() { return this.o.r ??= ( this.d.includes( IOC ) && resolves( this.i.inject ?? this.i ) || [] ); }
	get s() { return this.o.s; } }

export class Transient extends Service {
	static { defines( this.prototype, { t: { value: TRANSIENT }, l: { value: 0 }, type: { value: 'transient service' }, lifestyle: { value: 'transient' } } ); } }
export class Singleton extends Service {
	static { defines( this.prototype, { t: { value: SINGLETON }, l: { value: 1 }, type: { value: 'singleton service' }, lifestyle: { value: 'singleton' } } ); } }
export class Scoped extends Service {
	static { defines( this.prototype, { t: { value: SCOPED }, l: { value: 2 }, type: { value: 'scoped service' }, lifestyle: { value: 'scoped' } } ); } }
export class Input extends Module {
	static { defines( this.prototype, { t: { value: INPUT }, l: { value: 2 }, type: { value: 'scope input' }, lifestyle: { value: 'scoped' } } ); } }
