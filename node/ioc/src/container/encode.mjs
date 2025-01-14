import { inspect } from 'node:util';
import { imports } from '@jrapp/reflection/render';
import { emit, ENCODED } from '#events';
import { ids } from '@jrapp/reflection/generate';
import { isIterable } from '@jrapp/is';

const
	join = a => a.length ? `[ ${a.join( ', ' )} ]` : '[]',
	items = ( ...a ) => `[\n${a.map( i => `\t${i}` ).join( ',\n' )}\n]`,
	args = ( n, ...a ) => `${n}( ${a.join( ', ' ) } )`,
	str = a => { a = inspect( a ); return /^".*?"$/.test( a ) ? a.replace( /(?=')/g, '\\' ).replace( /^"|"$/g, '\'' ) : a; };

class Encode extends Map {
	*sources( path, sources ) {
		const Id = ids(), P = new Map;
		for( let [ n, [ p, a ], as = Id.next().value ] of sources.entries() ) ( this.set( n, as ), P.get( p )?.set( a, as ) ?? P.set( p, new Map( [ [ a, as ] ] ) ) );
		yield 'import ioc from \'@jrapp/ioc/import\';\n';
		for( let [ p, m ] of P.entries() ) yield imports( [ ...m.entries() ], path, p );
		emit[ ENCODED ]?.( 'sources', P.size ); }
	*ns( a ) {
		for( let { ns, k } of a.values() ) yield ns?.ns ? join( [ str( k ), ns.i ] ) : join( [ str( k ) ] );
		emit[ ENCODED ]?.( 'namespaces', this.size + 1 ); }
	*services( services ) {
		const o = new Map;
		for( let { t, n, ns, k, a } of services.values() ) yield ( o.set( n, o.size ), join( [ t, str( k ), ...ns?.ns ? [ ns.i ] : [], ...a ? [ join( a.map( e => isIterable( e ) ? join( e.map( i => o.get( i.n ) ) ) : o.get( e.n ) ) ), this.get( n ) ] : [] ] ) );
		emit[ ENCODED ]?.( 'services', services.size ); }
	*container( path, sources, ns, services ) {
		yield [ ...this.sources( path, sources ) ].join( '\n' );
		yield `${args( 'export default ioc', items( ...this.ns( ns ) ), items( ...this.services( services ) ) )};\n`; } }

export default ( sources, ns, services, path ) => [ ...new Encode().container( path, sources, ns, services ) ].join( '\n\n' );
