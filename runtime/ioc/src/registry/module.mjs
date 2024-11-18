import { define, assign } from '@jrapp/object';

const
	types = [ 'namespace', 'scope input' ],
	lifestyles = [ 'transient', 'singleton', 'scoped' ];

export default class {
	constructor( o ) {
		if( o.k == null )
			assign( o, o.n.match( /^(?:(?<ns>(?:[\w]+[^\w])*[\w]+)[^\w])?(?<k>[\w]+)$/ ).groups );
		else if( o.n == null )
			o.n = ( o.ns != null ) ? `${o.ns}.${o.k}` : o.k;
		define( this, 'o', { value: o } ); }
	get n() { return this.o.n; }
	get ns() { return this.o.ns; }
	get k() { return this.o.k; }
	get name() { return this.n; }
	get namespace() { return this.ns; }
	get key() { return this.k; }
	get type() { return this.t != null ? ( types[ this.t ] ?? `${this.lifestyle} service` ) : 'service'; }
	get lifestyle() { return lifestyles[ this.l ]; }
	get targets() { return this.b; }
	get isClass() { return this.c; }
	get injectable() { return this.i; }
	get dependencies() { return this.d; }
	get resolves() { return this.r; }
	get sourcePath() { return this.s?.[ 0 ]; }
	get exportedAs() { return this.s?.[ 1 ]; } }
