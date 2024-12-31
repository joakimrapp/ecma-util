import { test, equals, rejects, falsy } from '@jrapp/node-test';
import { fileURLToPath } from 'node:url';
import { md, rm } from '@jrapp/node-fs';
import Registry from '#registry';

const
	files = fileURLToPath( import.meta.resolve( './files' ) ),
	output = fileURLToPath( import.meta.resolve( './output' ) ),
	exported = fileURLToPath( import.meta.resolve( './output/ioc.mjs' ) );

test( 'export', async o => {
	await rm( output );
	await md( output );
	const registry = await new Registry().scan( files );
	await registry.build().export( 'ns2.s4' ).write( exported );
	const { default: container } = await import( exported );

	await o.test( 'should get same result from export and original', async() =>
		equals( await registry.container().scope( { i1: 1 } ).resolve( 'ns2.s4' ), await container.scope( { i1: 1 } ).resolve( 'ns2.s4' ) ) );
	await o.test( 'should be able to set a service', async() =>
		equals( await registry.set( 'ns1.s1', () => 2 ).container().scope( { i1: 1 } ).resolve( 'ns2.s4' ), 19 ) );
	await o.test( 'should not be able to export if set', async() =>
		falsy( await registry.set( 'ns1.s1', () => 2 ).build().export ) );
	await o.test( 'should reject if resolve not existing', async() =>
		rejects( () => container.scope( { i1: 1 } ).resolve( 'aaa' ) ) );
} );
