import { importable } from '@jrapp/node-path';
import { isArray } from '@jrapp/is-type';

const
	keys = a => a.map( i => isArray( i ) && ( i.length === 2 ) ? i.join( ' as ' ) : i ).join( ', ' );

export default ( items, ...from ) => `import { ${keys( items )} } from '${from.length === 2 ? importable( ...from ) : from }';`
