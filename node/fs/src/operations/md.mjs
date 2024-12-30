import { mkdir } from 'node:fs/promises';

export default p => mkdir( p, { recursive: true } );
