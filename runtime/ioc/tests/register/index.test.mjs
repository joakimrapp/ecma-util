import { test, truthy, resolves, rejects, executes, throws, falsy, equals, differs, readFile } from '@jrapp/testing';
import { resolve } from 'node:path';
import log from '@jrapp/log/local';
import Registry from '../../src/modules/registry.mjs';
import { SCANNING, IMPORTING, REGISTERING, COMPILING, INCLUDING } from '#events';

const path = resolve( import.meta.dirname, '../data' );





test( 'find', async o => {
	const registry = new Registry();
	await registry.scan( path );
	registry.targets( 'buildTarget1' ).event( 'event' ).include( 'ns1.name1' );
} );



// registry.events.on( SCANNING, p => log.debug( `scanning ${p}` ) );
// registry.events.on( IMPORTING, p => log.debug( `importing ${p}` ) );
// registry.events.on( REGISTERING, p => log.debug( `registering ${p?.n}` ) );
// registry.events.on( COMPILING, b => log.debug( `compiling ${b}` ) );
// registry.events.on( INCLUDING, ( { n, lifestyle } ) => log.debug( `including ${lifestyle} ${n}` ) );
