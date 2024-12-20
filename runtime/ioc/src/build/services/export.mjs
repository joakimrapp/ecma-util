import { emit, EXPORTED } from '#events';
import { NAMESPACE, INJECTS } from '#service/constants';
import { ids } from '@jrapp/reflection/generate';

export default {
	*args() { for( let a of arguments ) yield* a; },
	*getSources( map, items ) {
		const Id = ids(), P = new Map();
		for( let [ n, [ p, a ], as = Id.next().value ] of items )
			( map.set( n, as ), P.get( p )?.set( a, as ) ?? P.set( p, new Map( [ [ a, as ] ] ) ) );
		for( let [ p, map ] of P.entries() )
			yield [ p, [ ...map.entries() ] ];
		emit[ EXPORTED ]?.( 'sources', P.size ); },
	*getServices( map, items ) {
		let nsi = 0, ni = 0, N = {};
		for( let { n, ns, k, t, d } of items ) {
			N[ n ] = ( t === NAMESPACE ) ? nsi++ : ni++;
			const a = ns ? [ t, N[ ns.n ], k ] : [ t ];
			if( INJECTS & t ) {
				a.push( Array.from( d, e => e.map ? Array.from( e, i => N[ i.n ] ) : N[ e.n ] ) );
				a.push( map.get( n ) ); }
			yield a; }
		emit[ EXPORTED ]?.( 'services', ni ); },
	services( store ) {
		const
			n2ref = new Map(),
			sources = [ ...this.getSources( n2ref, store.getSources() ) ],
			services = [ ...this.getServices( n2ref, this.args( store.getNamespaces(), store.getServices() ) ) ];
		return [ sources, services ]; } };
