import { test, equals, truthy, falsy } from '@jrapp/node-test';
import { fileURLToPath } from 'node:url';
import Registry from '#registry';

test( 'reserved', async o => {
	await o.test( 'ioc', async o => {
		const registry = new Registry().singleton( 's1', () => 1 ).scoped( 's2', ( ioc ) => ioc.resolve( 's1' ) );
		await o.test( 'should resole with an ioc dependency', async() =>
			equals( await registry.container().scope().resolve( 's2' ), 1 ) );
	} );
} );
