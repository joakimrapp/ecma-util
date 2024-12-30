import { test, equals } from '@jrapp/node-test';
import { resolve } from 'node:path';
import rootPath from '../../src/operations/root-path.mjs';

test( 'rootPath', async o => {
	await o.test( 'should read and write a json file', async o => {
		equals( await rootPath(), resolve( import.meta.dirname, '../..' ) );
	} );
} );
