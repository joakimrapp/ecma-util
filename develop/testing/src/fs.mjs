import { fileURLToPath as fromUrl } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readFile } from 'node:fs/promises';

export default async function( { url }, p, ...a ) { return await readFile( resolve( dirname( fromUrl( url ) ), p ), ...a ); }
