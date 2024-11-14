import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs } from '@jrapp/testing';
import { constructor, entries, from, merge, proto, groupBy } from './index.mjs';

test( 'object', async o => {
	await o.test( 'constructor', async o => {
		class X {}
		await o.test( 'should get constructor of object', async() =>
			equals( constructor( new X ), X ) );
		await o.test( 'should not get a constructor of a literal', async() =>
			equals( constructor( { a: 1 } ), undefined ) );
	} );
	await o.test( 'entries', async o => {
		await o.test( 'should get entries from object', async() =>
			equals( [ ...entries( { a: 1, b: 2, c: null } ) ], [ [ 'a', 1 ], [ 'b', 2 ] ] ) );
		await o.test( 'should get mapped entries from object', async() =>
			equals( [ ...entries( { a: 1, b: 2, c: null }, ( k, v ) => v + 1 ) ], [ [ 'a', 2 ], [ 'b', 3 ] ] ) );
		await o.test( 'should get entries from array', async() =>
			equals( [ ...entries( [ 'a', 'b' ] ) ], [ [ 0, 'a' ], [ 1, 'b' ] ] ) );
	} );
	await o.test( 'from', async o => {
		await o.test( 'should create an object from entries', async() =>
			equals( from( [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', null ] ] ), { a: 1, b: 2 } ) );
		await o.test( 'should create an object from mapped object', async() =>
			equals( from( { a: 1, b: 2, c: null }, ( k, i ) => i + 1 ), { a: 2, b: 3 } ) );
		await o.test( 'should create an object by merging objects', async() =>
			equals( from( { a: 1, b: 2, c: null }, { d: 3 } ), { a: 1, b: 2, d: 3 } ) );
	} );
	await o.test( 'merge', async o => {
		await o.test( 'should merge a primitive and an object', async() =>
			equals( merge( 'a', { b: 'a' } ), { b: 'a' } ) );
		await o.test( 'should merge an object and a primitive', async() =>
			equals( merge( { b: 'a' }, 'a' ), 'a' ) );
		await o.test( 'should merge an array and an object', async() =>
			equals( merge( [ 1 ], { b: 'a' } ), { b: 'a' } ) );
		await o.test( 'should merge an object and an array', async() =>
			equals( merge( { b: 'a' }, [ 1 ] ), [ 1 ] ) );
		await o.test( 'should merge two simple', async() =>
			equals( merge( 'a', { a: 1 }, { b: 'a' }, null ), { a: 1, b: 'a' } ) );
		await o.test( 'should merge objects', async() =>
			equals( merge( { a: 1, b: { c: 1 }, x: { p: 4, f: 2 }, s: null }, { b: 'a' }, { d: { a: 4 }, x: { r: 4, f: 6 } } ), { a: 1, b: 'a', d: { a: 4 }, x: { r: 4, p: 4, f: 6 } } ) );
	} );
	await o.test( 'proto', async o => {
		class X {}
		await o.test( 'should get prototype of object', async() =>
			equals( proto( new X ), X.prototype ) );
	} );
	await o.test( 'groupBy', async o => {
		await o.test( 'should get groupet object', async() =>
			equals( groupBy( [ { t: 'a', v: 1 }, { t: 'a', v: 2 }, { t: 'b', v: 1 }, { t: 'b', v: 3 } ], ( { t } ) => t ).b, [ { t: 'b', v: 1 }, { t: 'b', v: 3 } ] ) );
	} );
} );
