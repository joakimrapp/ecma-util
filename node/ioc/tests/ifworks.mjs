import container from './sindex.mjs';

const { log } = console;

log( await container.scope( { event: 5 } ).resolve( 'ns1.name2' ) );
