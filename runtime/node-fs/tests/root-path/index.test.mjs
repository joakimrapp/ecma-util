import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs, readFile } from '@jrapp/testing';
import { rootPath, resolve } from '../../src/index.mjs';

test( 'rootPath', async o => {
	await o.test( 'should read and write a json file', async o => {
		equals( await rootPath(), resolve( import.meta.dirname, '../..' ) );
	} );
} );
