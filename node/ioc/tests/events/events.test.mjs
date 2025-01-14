import { test, truthy } from '@jrapp/node-test';
import { fileURLToPath } from 'node:url';
import { RESOLVE, RESOLVING, INJECTING, REJECTED, RESOLVED, SETTLED, SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, ENCODED, ALL, enable, disable, listen } from '#events';
import Registry from '#registry';

test( 'scan', async o => {
	await o.test( 'should emit all events', async() => {
		const events = new Set();
		enable( ALL );
		listen( type => events.add( type ) );
		const registry = await new Registry().scan( fileURLToPath( import.meta.resolve( './files' ) ) );
		await registry.container().scope( { i1: 1 } ).resolve( 'ns1.s1' );
		await registry.build().export( fileURLToPath( import.meta.resolve( './ioc.mjs' ) ), 'ns1.s1' );
		for( let [ k, v ] of Object.entries( { RESOLVE, RESOLVING, INJECTING, RESOLVED, SETTLED, SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, ENCODED } ) )
			truthy( events.has( v ), `missing ${k}` );
	} );
	await o.test( 'should not emit if disabled', async() => {
		const events = new Set();
		enable( ALL );
		disable( ALL );
		listen( type => events.add( type ) );
		const registry = await new Registry().scan( fileURLToPath( import.meta.resolve( './files' ) ) );
		await registry.container().scope( { i1: 1 } ).resolve( 'ns1.s1' );
		truthy( events.size === 0 );
	} );
	await o.test( 'should emit reject if service rejects', async() => {
		const events = new Set();
		enable( ALL );
		listen( type => events.add( type ) );
		const registry = await new Registry().service( 'n', () => { throw new Error(); } ).container().resolve( 'n' ).catch( () => {} );
		truthy( events.has( REJECTED ) );
	} );
	await o.test( 'should emit reject if service rejects', async() => {
		const events = new Set();
		enable( ALL );
		listen( type => events.add( type ) );
		const registry = await new Registry().service( 'n', () => { throw new Error(); } ).container().resolve( 'n' ).catch( () => {} );
		truthy( events.has( REJECTED ) );
	} );
} );
