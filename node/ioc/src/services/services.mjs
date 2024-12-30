import { emit, INCLUDING } from '#events';
import { service } from '#service';
import Namespaces from './namespaces.mjs';

export default class extends Map { #ns = new Namespaces();
	getNamespaces() { return this.#ns.values(); }
	getServices() { return this.values(); }
	set( o ) { return ( super.set( o.n, o ), o ); }
	add( n, t, f, d ) {
		const Service = service( t ), o = new Service( this.#ns.service( n ), f, d );
		return ( emit[ INCLUDING ]?.( o ), this.set( o ) ); }
	import( n, ns, k, t, f, d ) {
		const Service = service( t ), o = new Service( [ n, this.#ns.get( ns ), k ], f, d );
		return this.set( o );
	} }
