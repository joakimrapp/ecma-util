import { test, equals, truthy, falsy } from '@jrapp/node-test';
import { fileURLToPath } from 'node:url';
import Registry from '#registry';

test( 'scan', async o => {
	await o.test( 'should scan files, create container and resolve value', async() => {
		const registry = await new Registry().scan( fileURLToPath( import.meta.resolve( './files' ) ) );
		equals( await registry.container().scope( { i1: 1 } ).resolve( 'ns2.s4' ), 13 );
	} );
} );
