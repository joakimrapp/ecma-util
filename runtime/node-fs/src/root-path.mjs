import { join, dirname } from 'node:path';
import { exists } from './fs.mjs';
import { stat } from 'node:fs/promises';

async function find_root_path() {
	let [ , p ] = process.argv;
	if( !( await stat( p ) ).isDirectory() ) p = dirname( p );
	while( !( await exists( join( p, 'node_modules' ) ) ) ) if( p === ( p = dirname( p ) ) ) throw new Error( 'unable to find node_modules' );
	return p; }

let root_path;

export default () => ( root_path ??= find_root_path() );
