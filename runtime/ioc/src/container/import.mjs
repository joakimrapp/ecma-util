import { NAMESPACE } from '../service/constants.mjs';
import { isIterable } from '@jrapp/is-type';
import Services from '../services/services.mjs';
import Args from '../service/args.mjs';
import Arg from '../service/arg.mjs';
import Container from '../container.mjs';

export default function( a ) {
	const NSI = [], NI = [], s = new Services();
	for( let [ t, nsi, k, d, f ] of a ) {
		const ns = NSI[ nsi ], n = ns ? `${ns}.${k}` : k;
		( t === NAMESPACE ) ? NSI.push( n ) : NI.push( n );
		if( d ) s.import( n, ns, k, t, f, Args.from( d, e => isIterable( e ) ? Arg.from( e, i => s.get( NI[ i ] ) ) : s.get( NI[ e ] ) ) );
		else s.import( n, ns, k, t ); }
	return Container.from( s, ...arguments ); }
