import { rm as rmdir } from 'node:fs/promises';

export default p => rmdir( p, { force: true, recursive: true } );
