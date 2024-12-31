import { test, rejects, throws } from '@jrapp/node-test';
import { CYCLIC, SOURCE, SCOPE, INJECTABLE, EXPORT, MISSING, AMBIGUOUS, COLLISION, ARGUMENT, LIFESTYLE } from '../../src/errors.mjs';
import { fileURLToPath } from 'node:url';
import Registry from '#registry';

test( 'modules/registry', async o => {
	await o.test( 'should detect a cyclic dependency', () => throws(
		() => new Registry().singleton( 'a', ( { b } ) => {} ).singleton( 'b', ( { c } ) => {} ).singleton( 'c', ( { a } ) => {} ).build().include( 'a' ),
		CYCLIC ) );
	await o.test( 'should detect invalid lifestyle', async() => throws(
		() => new Registry().singleton( 'a', ( { b } ) => {} ).scoped( 'b', () => {} ).build().include( 'a' ),
		LIFESTYLE ) );
	await o.test( 'should detect if not injectable', async() => throws(
		() => new Registry().singleton( 'a', {} ),
		INJECTABLE ) );
	await o.test( 'should detect if singleton input is missing', async() => rejects(
		() => new Registry().singleton( 'a', ( { b } ) => {} ).config( 'b' ).container().resolve( 'a' ),
		SCOPE ) );
	await o.test( 'should detect if scoped input is missing', async() => rejects(
		() => new Registry().scoped( 'a', ( { b } ) => {} ).input( 'b' ).container().scope().resolve( 'a' ),
		SCOPE ) );
	await o.test( 'should detect if transient is deconstructed', async() => throws(
		() => new Registry().singleton( 'a', ( { b } ) => {} ).transient( 'b', () => {} ).build().include( 'a' ),
		ARGUMENT ) );
	await o.test( 'should detect missing dependency', async() => throws(
		() => new Registry().singleton( 'a', ( { b } ) => {} ).build().include( 'a' ),
		MISSING ) );
	await o.test( 'should detect missing service', async() => rejects(
		() => new Registry().container().scope().resolve( 'a' ),
		MISSING ) );
	await o.test( 'should detect if there is a namespace/service conflict', async() => throws(
		() => new Registry().singleton( 'a.b', () => {} ).singleton( 'a', () => {} ).build().include( 'a.b', 'a' ),
		COLLISION ) );
	await o.test( 'should not allow registering a service when it exists one with the same name and targets', async() => throws(
		() => new Registry().service( 'a', () => {} ).service( 'a', () => {} ),
		AMBIGUOUS ) );
	await o.test( 'detect if service is not exported', async() => rejects(
		() => new Registry().scan( fileURLToPath( import.meta.resolve( './files' ) ) ),
		EXPORT ) );
} );
