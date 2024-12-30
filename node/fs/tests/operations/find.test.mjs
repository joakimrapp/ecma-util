import { test, equals } from '@jrapp/node-test';
import { resolve, relative } from 'node:path';
import find from '../../src/operations/find.mjs';
import read from '../../src/operations/read.mjs';

const path = resolve( import.meta.dirname, 'find' );

test( 'find', async o => {
	await o.test( 'should find *.mjs', async o =>
		equals( ( await find( path, '**/*.mjs', a => relative( path, a ) ) ).sort(), [ 'file1.mjs', 'file2.mjs', 'other/file3.mjs' ] ) );
	await o.test( 'should find *.yml/*.yaml', async o =>
		equals( ( await find( path, '**/*.(yaml|yml)', a => relative( path, a ) ) ).sort(), [ 'file1.yaml', 'file2.yml', 'other/file1.yaml' ] ) );
	await o.test( 'should find and read *.yml/*.yaml', async o =>
		equals( ( await find( path, '**/*.(yaml|yml)', read ) ).sort( ( a, b ) => a.sort - b.sort ), [
			{ sort: 1, property2: 344, property3: { subProperty1: 666, subProperty2: 3 } },
			{ sort: 2, property1: 'test', property2: { subProperty1: 2, subProperty2: 3 } },
			{ sort: 3, property35: 'test', property24: { subProperty1: 1, subProperty2: 1 } } ] ) );
} );
