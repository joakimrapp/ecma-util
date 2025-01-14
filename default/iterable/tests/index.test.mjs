import { test, equals } from '@jrapp/node-test';
import { default as from, Iterable } from '../src/index.mjs';

function *values() { for( let a of arguments ) yield a; }

test( 'Iterable', async o => {
	await o.test( 'Iterable.map', async o => {
		await o.test( 'should map values', async o =>
			equals( from( values( 0, 1, 2, 3, 4, 5 ) ).map( i => i + 3 ).array(), [ 3, 4, 5, 6, 7, 8 ] ) );
	} );
	await o.test( 'Iterable.flat', async o => {
		await o.test( 'should flatten values', async o =>
			equals( from( values( [ 1, 2 ], 4, 8, [ 1 ] ) ).flat().array(), [ 1, 2, 4, 8, 1 ] ) );
	} );
	await o.test( 'Iterable.filter', async o => {
		await o.test( 'should filter values', async o =>
			equals( from( values( 0, 1, 2, 3, 4, 5 ) ).filter( i => i & 1 ).array(), [ 1, 3, 5 ] ) );
	} );
	await o.test( 'Iterable.defined', async o => {
		await o.test( 'should only keep defined values', async o =>
			equals( from( values( 2, 2, 3, null, 0, 0, null ) ).defined().array(), [ 2, 2, 3, 0, 0 ] ) );
	} );
	await o.test( 'Iterable.unique', async o => {
		await o.test( 'should only have unique values', async o =>
			equals( from( values( 2, 2, 3, null, 0, 0, null ) ).unique().array(), [ 2, 3, null, 0 ] ) );
	} );
	await o.test( 'Iterable.reduce', async o => {
		await o.test( 'should reduce values', async o =>
			equals( from( values( 1, 2, 3, 4, 5 ) ).reduce( ( v, i ) => v + i ), 15 ) );
	} );
	await o.test( 'Iterable.find', async o => {
		await o.test( 'should find a value', async o =>
			equals( from( values( { a: 1, o: 'a' }, { a: 2, o: 'b' }, { a: 3, o: 'c' } ) ).find( a => a.a === 2 ).o, 'b' ) );
	} );
	await o.test( 'Iterable.all', async o => {
		async function get( a ) { return a; }
		await o.test( 'should resolve all promises', async o =>
			equals( await from( values( get( 1 ), get( 2 ) ) ).all(), [ 1, 2 ] ) );
	} );
	await o.test( 'Iterable.entries/Iterable.object', async o => {
		await o.test( 'should iterate entries and create an object', async o =>
			equals( Iterable.entries( { a: 1, b: 2 }, ( k, v ) => [ k.toUpperCase(), v + 1 ] ).object(), { A: 2, B: 3 } ) );
		await o.test( 'should iterate entries and create an object', async o =>
			equals( Iterable.entries( { a: 1, b: 2 } ).object(), { a: 1, b: 2 } ) );
	} );
	await o.test( 'Iterable.entries/Iterable.defines', async o => {
		await o.test( 'should iterate entries and define properties', async o =>
			equals( Iterable.entries( { a: 1, b: 2 }, ( k, value ) => [ k, { enumerable: true, value } ] ).defines( { c: 3 } ), { a: 1, b: 2, c: 3 } ) );
	} );
	await o.test( 'Iterable.generate', async o => {
		await o.test( 'should generate values', async o =>
			equals( Iterable.generate( 1, i => i + 1, i => i < 3 ).array(), [ 1, 2 ] ) );
	} );
} );
