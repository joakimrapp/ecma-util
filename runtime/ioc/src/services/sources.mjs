import { NAMESPACE } from '../service/constants.mjs';
import { SOURCE } from '#errors';
import { keys, entries } from '@jrapp/object';
import { ids } from '@jrapp/reflection/generate';

const
	Id = ( a = ids() ) => () => a.next().value,
	isNs = ( t ) => ( t & NAMESPACE ) === NAMESPACE,
	isInjectable = ( t ) => !!( t & INJECTS );

export default class extends Map {
	set( n, s ) { if( s?.[ 1 ] != null ) super.set( n, s ); }
	container( iterator ) {
		const paths = {}, items = [], namespaces = new Map(), names = new Map(), id = Id();
		for( let { n, ns, k, t, d } of iterator ) {
			const
				map = isNs( t ) ? namespaces : names,
				a = ( n == null ) ? [ t ] : [ t, namespaces.get( ns ), k ];
			map.set( n, map.size );
			if( isInjectable( t ) ) {
				const [ p, r ] = this.get( n ) ?? SOURCE.throw( n );
				a.push( d.map( e => e.map?.( i => names.get( i ) ) ?? names.get( e ) ) );
				( paths[ p ] ??= {} )[ r, ( a[ a.length ] = id() ) ]; }
			items.push( a ); }
	}
}
