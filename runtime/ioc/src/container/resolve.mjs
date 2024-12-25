import { emit, RESOLVE, SETTLED, RESOLVING, INJECTING, REJECTED, RESOLVED } from '#events';

export const
	now = Date.now.bind( Date );

async function res( c, a ) {
	emit[ RESOLVING ]?.( a );
	const
		t = [ now() ],
		i = await c.all( a, res.bind( ( this[ this.length ] = [ a, t ] ) ) );
	try {
		emit[ INJECTING ]?.( a );
		t[ 1 ] = now();
		return await a.i( ...i ); }
	catch( e ) {
		t[ 2 ] = now();
		emit[ REJECTED ]?.( a, e );
		throw e; }
	finally {
		t[ 3 ] = now();
		if( t[ 2 ] == null )
			emit[ RESOLVED ]?.( a, t[ 3 ] - t[ 1 ] ); } }

function *get( l, [ a, [ tc, ti, tf, tr ], ...r ] ) {
	yield [ a, l, tf != null, r.map( ( [ { n } ] ) => n ), tc, ti, tr ];
	for( let i of r ) yield* get( l + 1, i ); }

function *flat() { for( let i of arguments ) { yield* get( 0, i ); } }

export default async function( c, a ) {
	const t = now(), r = [];
	try {
		emit[ RESOLVE ]?.( a );
		return await c.get( a, res.bind( r ) ); }
	finally {
		emit[ SETTLED ]?.( a.n, t, now(), [ ...flat( ...r ) ],  );
	} }
