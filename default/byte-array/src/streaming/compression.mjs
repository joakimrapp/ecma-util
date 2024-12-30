import { isPromise, isString } from '@jrapp/is';
import { stream } from './index.mjs';
import { encode } from '#base64';
import read from './read.mjs';

export async function compress( a, f, z = 'deflate-raw' ) {
	return await read( stream( isPromise( a ) ? await a : a, new CompressionStream( z ) ), f );
}

export async function decompress( a, f, z = 'deflate-raw' ) {
	if( isPromise( a ) ) a = await a;
	return await read( stream( isString( a ) ? encode( a ) : a, new DecompressionStream( z ) ), f );
}
