import { emit, DECODED } from '#events';
import { isInteger } from '@jrapp/is';
import service from '#service';
import Container from './index.mjs';
import Ns from './ns.mjs';

class Services extends Map { #a = [];
	at( i ) { return this.#a[ i ]; }
	set( o ) { return ( super.set( o.n, o ), this.#a[ this.#a.length ] = o ); } }

export default function( nsEncoded, servicesEncoded ) {
	const ns = new Ns, s = new Services;
	for( let a of nsEncoded )
		ns.ns( ...a );
	emit[ DECODED ]?.( 'namespaces', ns.size + 1 );
	for( let [ t, k, ...a ] of servicesEncoded )
		s.set( service.from( t, isInteger( ...a ) ? ns.id( k, a.shift() ) : ns.id( k ), service.dec( s, a.shift() ), ...a ) );
	emit[ DECODED ]?.( 'services', s.size );
	return new Container( s ); }
