import { test, equals, truthy, falsy } from '@jrapp/node-test';
import { fileURLToPath } from 'node:url';
import Registry from '#registry';

test( 'container', async o => {
	await o.test( 'type', async o => {
		const registry = new Registry().singleton( 's1', () => {} ).scoped( 's2', () => {} );
		await o.test( 'should return singleton if service is singleton', async() =>
			equals( await registry.build().get( 's1' ).type, 'singleton' ) );
	} );
	await o.test( 'has', async o => {
		const registry = new Registry().singleton( 's1', () => {} ).scoped( 's2', () => {} );
		await o.test( 'should return false if container is singleton and service does not exist', async() =>
			falsy( await registry.container().has( 's0' ) ) );
		await o.test( 'should return true if container is scoped and service does not exist', async() =>
			falsy( await registry.container().scope().has( 's0' ) ) );
		await o.test( 'should return true if container is singleton and service is singleton', async() =>
			truthy( await registry.container().has( 's1' ) ) );
		await o.test( 'should return false if container is singleton and service is scoped', async() =>
			falsy( await registry.container().has( 's2' ) ) );
		await o.test( 'should return true if container is scoped and service is singleton', async() =>
			truthy( await registry.container().scope().has( 's1' ) ) );
		await o.test( 'should return false if container is scoped and service is scoped', async() =>
			truthy( await registry.container().scope().has( 's2' ) ) );
	} );
} );
