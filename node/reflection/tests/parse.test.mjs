import { test, equals } from '@jrapp/node-test';
import { stringify, args } from '../src/parse/index.mjs';

test( 'parse', async o => {
	await o.test( 'args', async o => {
		await o.test( 'should parse an arrow function without arguments', () =>
			equals( args( () => {} ), [] ) );
		await o.test( 'should parse an arrow function with 1 argument without parenthesis', () =>
			equals( args( a => {} ), [ 'a' ] ) );
		await o.test( 'should parse an async arrow function with 2 arguments', () =>
			equals( args( stringify( async ( a, b ) => {} ), false, 'async ( a, b ) => {}' ), [ 'a', 'b' ] ) );
		await o.test( 'should parse an async generator function with 1 destructured argument', () =>
			equals( args( async function*( { a } ) {} ), [ [ 'a' ] ] ) );
		await o.test( 'should parse a constructor', () =>
			equals( args( stringify( class { constructor( { a } ) {} } ) ), [ [ 'a' ] ] ) );
		await o.test( 'should parse a constructor with inheritance', () =>
			equals( args( class extends class { constructor( b ) {} } { constructor( { a } ) { super() } } ), [ [ 'a' ] ] ) );
		await o.test( 'should parse more complex arguments', () =>
			equals( args( ( { a: { b: { c: { d, e: { f } } } } }, g, h, { i: { j } } ) => {} ), [ [ 'a.b.c.d', 'a.b.c.e.f' ], 'g', 'h', [ 'i.j' ] ] ) );
	} );
	await o.test( 'stringify', async o => {
		await o.test( 'should stringify a function', async o => equals( stringify( () => {} ), '() => {}' ) );
	} );
} );
