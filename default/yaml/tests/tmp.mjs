import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import Parser from '../src/parse/parser/index.mjs';

const
	{	log } = console,
	path = ( { resolve }, ...a ) => fileURLToPath( resolve( ...a ) ),
	read = ( ...a ) => readFile( path( ...a ), 'utf8' ),
	data = await read( import.meta, './parse/index.yaml' );

log( data );
new Parser().parse( data );
