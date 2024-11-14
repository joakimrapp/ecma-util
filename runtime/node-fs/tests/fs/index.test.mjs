import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs, readFile } from '@jrapp/testing';
import { isBytes } from '@jrapp/is-type';
import { read, write, resolve, rm, mv, exists, md } from '../../src/index.mjs';

test( 'read/write', async o => {
	await o.test( 'should read and write a json file', async o => {
		const data = { a: 1, b: [ 1, 2, 3, 4, 5, 6 ], rj: 'awefwefwefwefawefaewfewafwefawe', fff: { e: { f: 3 } } };
		const path = resolve( import.meta.dirname, 'tests.json' );
		await write( path, data );
		equals( await read( path ), data );
		await rm( path );
	} );
	await o.test( 'should read and write a yaml file', async o => {
		const data = { a: 1, b: [ 1, 2, 3, 4, 5, 6 ], rj: 'awefwefwefwefawefaewfewafwefawe', fff: { e: { f: 3 } } };
		const path = resolve( import.meta.dirname, 'tests.yaml' );
		await write( path, data );
		equals( await read( path ), data );
		await rm( path );
	} );
	await o.test( 'should read and write a compressed json file', async o => {
		const data = { a: 1, b: [ 1, 2, 3, 4, 5, 6 ], rj: 'awefwefwefwefawefaewfewafwefawe', fff: { e: { f: 3 } } };
		const path = resolve( import.meta.dirname, 'tests.json.gz' );
		await write( path, data );
		equals( await read( path ), data );
		await rm( path );
	} );
	await o.test( 'should read and write a compressed yaml file', async o => {
		const data = { a: 1, b: [ 1, 2, 3, 4, 5, 6 ], rj: 'awefwefwefwefawefaewfewafwefawe', fff: { e: { f: 3 } } };
		const path = resolve( import.meta.dirname, 'tests.yaml.gz' );
		await write( path, data );
		equals( await read( path ), data );
		await rm( path );
	} );
	await o.test( 'should read and write a stream', async o => {
		const path = resolve( import.meta.dirname, 'tests.text' );
		await write( path, new Blob( [ 'wfewwffwe' ] ).stream() );
		equals( await read( path ), 'wfewwffwe' );
		await rm( path );
	} );
	await o.test( 'should read and write a readable', async o => {
		const path = resolve( import.meta.dirname, 'tests.text' );
		await write( path, ( async function*() { yield 'cd'; yield 'ab'; } )() );
		equals( await read( path ), 'cdab' );
		await rm( path );
	} );
	await o.test( 'should write, move and read a file', async o => {
		const data = 'test test test';
		await write( resolve( import.meta.dirname, 'tests.txt' ), data );
		await mv( resolve( import.meta.dirname, 'tests.txt' ), resolve( import.meta.dirname, 'tests2.txt' ) );
		equals( await read( resolve( import.meta.dirname, 'tests2.txt' ) ), data );
		await rm( resolve( import.meta.dirname, 'tests2.txt' ) );
	} );
	await o.test( 'should check if file exists', async o => {
		const data = 'test test test', path = resolve( import.meta.dirname, 'tests.txt' );
		await write( path, data );
		truthy( await exists( path ) );
		await rm( path );
	} );
	await o.test( 'should check if do not exist', async o => {
		falsy( await exists( resolve( import.meta.dirname, 'tests.fwefew.text' ) ) );
	} );
	await o.test( 'should create and remove a directory', async o => {
		const path = resolve( import.meta.dirname, 'tutut' );
		await md( path );
		truthy( await exists( path ) );
		await rm( path );
	} );
	await o.test( 'should read to byteArray', async o => {
		truthy( isBytes( await read( resolve( import.meta.dirname, 'index.test.mjs' ), false ) ) );
	} );
} );
