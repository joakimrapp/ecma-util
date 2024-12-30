import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async ( { dirname }, p, ...a ) => await readFile( resolve( dirname, p ), ...a );
