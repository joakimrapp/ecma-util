export { writeFile, readFile, stat, opendir } from 'node:fs/promises';
export { resolve, join, dirname, relative, extname, isAbsolute, basename, fromMeta } from '@jrapp/node-path';
import { F_OK, DATA, YAML, TEXT, GZIP } from './constants.mjs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { mkdir, rm as rmdir, access, link } from 'node:fs/promises';
import { extname } from '@jrapp/node-path';
import { parse, render } from '@jrapp/yaml';
import { isReadable, isStream, isView, isString } from '@jrapp/is-type';
import ByteArray from '@jrapp/byte-array';

const
	re = /\.?(?:(ya?ml)|(json)|(?:utf8|txt|text|js|mjs|cjs|text|utf-8))(?:\.gz)?$/,
	format = a => { if( a = a.match?.( re ) ) return a[ 1 ] ? YAML : a[ 2 ] ? DATA : TEXT; };

export const
	md = p => mkdir( p, { recursive: true } ),
	rm = p => rmdir( p, { force: true, recursive: true } ),
	exists = async p => { try { await access( p, F_OK ); return true; } catch { return false; } },
	mv = async( ...a ) => await link( ...a );

export async function write( p, a, gz = ( extname( p ) === '.gz' ) ) {
	if( !isStream( a ) )
		if( isReadable( a ) ) a = ReadableStream.from( a );
		else a = new Blob( [ isView( a ) || isString( a ) ? a : format( p ) === YAML ? render( a ) : JSON.stringify( a ) ] ).stream();
	await finished( Readable.fromWeb( gz ? a.pipeThrough( new CompressionStream( GZIP ) ) : a ).pipe( createWriteStream( p ) ) ); }

export async function read( p, f, gz = ( extname( p ) === '.gz' ) ) {
	let a = Readable.toWeb( createReadStream( p ) );
	if( gz ) a = a.pipeThrough( new DecompressionStream( GZIP ) );
	switch( format( f ?? p ) ) {
		case YAML: return parse( await new Response( a ).text() );
		case DATA: return await new Response( a ).json();
		case TEXT: return await new Response( a ).text();
		default: return await ByteArray.read( a ); } }
