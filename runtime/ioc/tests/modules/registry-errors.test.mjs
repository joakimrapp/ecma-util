import { test, truthy, resolves, rejects, executes, throws, falsy, equals, differs, readFile } from '@jrapp/testing';
import { resolve } from 'node:path';
import log from '@jrapp/log/local';
import Registry from '../../src/modules/registry.mjs';
import { SCANNING, IMPORTING, REGISTERING, COMPILING, INCLUDING } from '#events';

const path = resolve( import.meta.dirname, '../data' );

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
	await o.test( 'should not allow event being defined twice', () => {
		const registry = new Registry();
		registry.singleton( 'a', () => {} );
		throws( () => registry.targets().event().event().include( 'a' ) );
	} );
	await o.test( 'should detect if there is a namespace/service conflict', () => {
		const registry = new Registry();
		registry.singleton( 'a.b', () => {} ).singleton( 'a', () => {} );
		throws( () => registry.targets().event().include( 'a.b', 'a' ) );
	} );
	await o.test( 'should not allow registering a service when it exists one with the same name and targets', () => {
		const registry = new Registry();
		registry.singleton( 'a', () => {}, 'f' ).singleton( 'a', () => {} );
		throws( () => registry.singleton( 'a', () => {}, 'f' ) );
	} );
} );
