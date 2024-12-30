import { NAMESPACE } from '#constants';
import { Arg, Args } from '#service';
import { isIterable } from '@jrapp/is';
import Services from '#services';
import Container from './index.mjs';

export default function( a ) {
	const NSI = [], NI = [], s = new Services();
	for( let [ t, nsi, k, d, f ] of a ) {
		const ns = NSI[ nsi ], n = ns ? `${ns}.${k}` : k;
		( t === NAMESPACE ) ? NSI.push( n ) : NI.push( n );
		if( d ) s.import( n, ns, k, t, f, Args.from( d, e => isIterable( e ) ? Arg.from( e, i => s.get( NI[ i ] ) ) : s.get( NI[ e ] ) ) );
		else s.import( n, ns, k, t ); }
	return Container.from( s, ...arguments ); }
