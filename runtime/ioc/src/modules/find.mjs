import { IMPORTING } from '../events.mjs';
import { NOT_EXPORTED } from '../errors.mjs';
import { Service, Singleton, Scoped } from './service.mjs';
import { find, join } from '@jrapp/node-fs';

const
	scan = '**/*!(.skip|node_modules|.git|target)/*!(.skip).(mjs)',
	name = ( ns, n ) => ns?.length ? `${ns}.${n}` : n,
	same = ( o, i ) => { for( let k in o ) if( o[ k ] === i ) return k; };

function *get( p, { $scoped, $singleton, $services, $service, $targets, $namespace, ...o } ) {
	if( ( $scoped ?? $singleton ?? $services ?? $service ) != null ) {
		const services = { ...$scoped, ...$singleton, ...$services, ...$service && { [ $service ]: o.default ?? NOT_EXPORTED( `default in ${p}` ) } };
		for( let a in services ) {
			const n = name( $namespace, a ), i = services[ a ], s = [ p, same( o, i ) ?? NOT_EXPORTED( `${a} in ${p}` ) ];
			const T = $scoped?.[ a ] ? Scoped : $singleton?.[ a ] ? Singleton : Service;
			yield new T( { n, i, s, b: $targets?.split( ',' ) } ); } } }

export default async function( p, e ) {
	p = join( p, scan );
	return ( await find( p, async a => ( e?.emit( IMPORTING, a ), [ ...get( a, await import( a ) ) ] ) ) ).flat();
}
