import node from './node.mjs';

export default ( options, ...entryPoints ) => ( { ...node, ...options, entryPoints } );
