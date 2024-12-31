import { emit, EXPORTED } from '#events';
import { NAMESPACE, INJECTS } from '../constants.mjs';
import { ids } from '@jrapp/reflection/generate';

export default {
	*values() { for( let a of arguments ) yield* a.values(); },
	*sources( map, entries ) {
		const Id = ids(), P = new Map();
		for( let [ n, [ p, a ], as = Id.next().value ] of entries )
			( map.set( n, as ), P.get( p )?.set( a, as ) ?? P.set( p, new Map( [ [ a, as ] ] ) ) );
		for( let [ p, map ] of P.entries() )
			yield [ p, [ ...map.entries() ] ];
		emit[ EXPORTED ]?.( 'sources', P.size ); },
	*services( map, values ) {
		let nsi = 0, ni = 0, N = {};
		for( let { n, ns, k, t, d } of values ) {
			N[ n ] = ( t === NAMESPACE ) ? nsi++ : ni++;
			const a = ns ? [ t, N[ ns.n ], k ] : [ t ];
			if( INJECTS & t ) {
				a.push( Array.from( d, e => e.map ? Array.from( e, i => N[ i.n ] ) : N[ e.n ] ) );
				a.push( map.get( n ) ); }
			yield a; }
		emit[ EXPORTED ]?.( 'services', ni ); },
	*export( sources, namespaces, services ) {
		const o = new Map();
		yield [ ...this.sources( o, sources.entries() ) ];
		yield [ ...this.services( o, this.values( namespaces, services ) ) ]; } };
