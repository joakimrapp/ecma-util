import { test, truthy, falsy } from '@jrapp/node-test';
import { resolve } from 'node:path';
import exists from '../../src/operations/exists.mjs';

test( 'exists', async o => {
	await o.test( 'should return true if exists', async o => {
		truthy( await exists( resolve( import.meta.dirname, 'find.test.mjs' ) ) );
	} );
	await o.test( 'should return false if not exists', async o => {
		falsy( await exists( resolve( import.meta.dirname, 'notExists.test.mjs' ) ) );
	} );
} );
