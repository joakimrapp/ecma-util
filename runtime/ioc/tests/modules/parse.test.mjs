import { test, truthy, rejects, executes, throws, log, falsy, equals, differs, readFile } from '@jrapp/testing';
import { cArgs, fArgs, resolves } from '../../src/modules/parse.mjs';

test( 'modules/parse', async o => {
	await o.test( 'should parse args from one arg arrow', async() =>
		equals( fArgs( arg => {} ), [ 'arg' ] ) );
	await o.test( 'should parse args from empty arrow', async() =>
		equals( fArgs( () => {} ), [] ) );
	await o.test( 'should parse args arrow', async() =>
		equals( fArgs( async( a, { b: { c: d }, v: { f: { v } }, b }, t ) => {} ), [ 'a', [ 'b.c', 'v.f.v', 'b' ], 't' ] ) );
	await o.test( 'should parse function', async() =>
		equals( fArgs( function( a, b, { c, d: { e: f }, g, d: { i: r } } ) {} ), [ 'a', 'b', [ 'c', 'd.e', 'g', 'd.i' ] ] ) );
	await o.test( 'should parse named async generator', async() =>
		equals( fArgs( async function *name( a, b, { c, d: { e: f }, g, d: { i: r } } ) {} ), [ 'a', 'b', [ 'c', 'd.e', 'g', 'd.i' ] ] ) );
	await o.test( 'should parse class constructor', async() =>
		equals( cArgs( class extends class { constructor( a, b ) {} } { constructor( x, { c, d, e, f: { a } } ) {} } ), [ 'x', [ 'c', 'd', 'e', 'f.a' ] ] ) );
	await o.test( 'should parse class inject', async() =>
		equals( fArgs( class extends class { static async inject( a, b ) {} } { constructor( x, { c, d, e, f: { a } } ) {} } ), [ 'a', 'b' ] ) );
	await o.test( 'should handle parenthesis', async() =>
		equals( fArgs( ( a = ( { a: 4 } ) ) => {} ), [ 'a' ] ) );
	await o.test( 'should parse ioc.resolve', async() =>
		equals( resolves( ( a, ioc ) => { ioc.resolve( 'd' ); } ), [ 'd' ] ) );
	await o.test( 'should parse unused ioc.resolve', async() =>
		equals( resolves( ( a, ioc ) => {} ), [] ) );
} );
