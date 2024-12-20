import { test, truthy, resolves, rejects, executes, throws, falsy, equals, differs, readFile } from '@jrapp/testing';
import Registry from '../../src/registry/index.mjs';

test( 'modules/registry', async o => {
	await o.test( 'should detect a cyclic dependency', () => {
		const registry = new Registry();
		registry.singleton( 'a', ( { b } ) => {} );
		registry.singleton( 'b', ( { c } ) => {} );
		registry.singleton( 'c', ( { a } ) => {} );
		throws( () => registry.targets().event().include( 'a' ) );
	} );
	await o.test( 'should detect invalid lifestyle', () => {
		const registry = new Registry();
		registry.singleton( 'a', ( { b } ) => {} );
		registry.scoped( 'b', () => {} );
		throws( () => registry.targets().event().include( 'a' ) );
	} );
	await o.test( 'should detect missing service', () => {
		const registry = new Registry();
		registry.singleton( 'a', ( { b } ) => {} );
		throws( () => registry.targets().event().include( 'a' ) );
	} );
	await o.test( 'should detect if there is a namespace/service conflict', () => {
		const registry = new Registry();
		registry.singleton( 'a.b', () => {} ).singleton( 'a', () => {} );
		throws( () => registry.targets().event().include( 'a.b', 'a' ) );
	} );
	await o.test( 'should not allow registering a service when it exists one with the same name and targets', () => {
		throws( () => new Registry().service( 'a', () => {} ).service( 'a', () => {} ) );
	} );
} );
