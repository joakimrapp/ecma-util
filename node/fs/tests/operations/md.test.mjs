import { test, truthy, falsy } from '@jrapp/node-test';
import { resolve } from 'node:path';
import md from '../../src/operations/md.mjs';
import rm from '../../src/operations/rm.mjs';
import exists from '../../src/operations/exists.mjs';

test( 'md', async o => {
	await o.test( 'should create a directory', async o => {
		const path = resolve( import.meta.dirname, 'tutut' );
		await md( path );
		truthy( await exists( path ) );
		await rm( path );
	} );
} );