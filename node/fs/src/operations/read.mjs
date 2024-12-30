import { YAML, TEXT, DATA, GZIP } from '../util/formats.mjs';
import { Readable, createReadStream } from '../util/node.mjs';
import { extname } from '@jrapp/node-path';
import { parse } from '@jrapp/yaml';
import ByteArray from '@jrapp/byte-array';
import format from '../util/format.mjs';

export default async function( p, f, gz = ( extname( p ) === '.gz' ) ) {
	let a = Readable.toWeb( createReadStream( p ) );
	if( gz ) a = a.pipeThrough( new DecompressionStream( GZIP ) );
	switch( format( f ?? p ) ) {
		case YAML: return parse( await new Response( a ).text() );
		case DATA: return await new Response( a ).json();
		case TEXT: return await new Response( a ).text();
		default: return await ByteArray.read( a ); } }
