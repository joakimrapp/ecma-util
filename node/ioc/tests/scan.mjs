import Registry from '#registry';
import { listen, enable, disable, SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, RESOLVE, RESOLVING, INJECTING, REJECTED, RESOLVED, SETTLED, ALL } from '#events';
import out from '../src/debug/log.mjs';
import { resolve } from 'node:path';

const path = resolve( import.meta.dirname, './scan/files' );

const { log } = console;
enable( ALL );
disable( RESOLVING, INJECTING );
listen( out );

const
	registry = await new Registry().scan( path );

log( await registry.container().scope( { i1: 1 } ).resolve( 'ns2.s4' ) );




//	build = registry.build();
//
//await build.export( 'ns1.name2' ).write( resolve( path, '../sindex.mjs' ) );
//
//const container = build.container();
//
//
//log( await container.scope( { event: 5 } ).resolve( 'ns1.name2' ) );
