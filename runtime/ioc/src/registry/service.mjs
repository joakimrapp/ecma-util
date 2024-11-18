import { cArgs, fArgs, resolves } from './parse.mjs';
import { isClass } from '@jrapp/is-type/fn';
import Module from './module.mjs';

const
	IOC = 'ioc';

export default class extends Module {
	get b() { return this.o.b; }
	get c() { return this.o.c ??= isClass( this.i ) && ( this.i.inject == null ); }
	get i() { return this.o.i; }
	get d() { return this.o.d ??= this.c ? cArgs( this.i ) : fArgs( this.i.inject ?? this.i ); }
	get r() { return this.o.r ??= this.d.includes( IOC ) && resolves( this.i.inject ?? this.i ) || []; }
	get s() { return this.o.s; } }
