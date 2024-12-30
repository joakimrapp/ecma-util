import { YAML, TEXT, DATA, GZIP } from '../util/formats.mjs';
import { Readable, finished, createWriteStream } from '../util/node.mjs';
import { extname } from '@jrapp/node-path';
import { render } from '@jrapp/yaml';
import { isReadable, isStream, isView, isString } from '@jrapp/is';
import format from '../util/format.mjs';

export default async function( p, a, gz = ( extname( p ) === '.gz' ) ) {
	if( !isStream( a ) )
		if( isReadable( a ) ) a = ReadableStream.from( a );
		else a = new Blob( [ isView( a ) || isString( a ) ? a : format( p ) === YAML ? render( a ) : JSON.stringify( a ) ] ).stream();
	await finished( Readable.fromWeb( gz ? a.pipeThrough( new CompressionStream( GZIP ) ) : a ).pipe( createWriteStream( p ) ) ); }
