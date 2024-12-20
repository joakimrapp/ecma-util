import container from './sindex.mjs';

console.log( await container.scope( { event: 5 } ).resolve( 'ns1.name2' ) );
