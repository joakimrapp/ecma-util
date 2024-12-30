import { test, equals } from '@jrapp/node-test';
import { deflateRaw as zip } from 'node:zlib';
import { promisify } from 'node:util';
import { object, text } from '../data.mjs';

import { compress, decompress, stream } from '../../src/streaming/index.mjs';

test( 'streaming/compression', async o => {
	const
		zText = await promisify( zip )( text ),
		zObject = await promisify( zip )( JSON.stringify( object ) );
	await o.test( 'compress', async o => {
		await o.test( 'should compress utf8 to buffer', async() =>
			equals( await compress( text ), zText ) );
		await o.test( 'should compress utf8 to base64', async() =>
			equals( await compress( text, 64 ), zText.toString( 'base64' ) ) );
		await o.test( 'should compress utf8 to base64url', async() =>
			equals( await compress( text, -64 ), zText.toString( 'base64url' ) ) );
		await o.test( 'should compress utf8 to hex', async() =>
			equals( await compress( text, 16 ), zText.toString( 'hex' ) ) );
		await o.test( 'should compress object to base64', async() =>
			equals( await compress( object, 64 ), zObject.toString( 'base64' ) ) );
		await o.test( 'should compress promise to buffer', async() =>
			equals( await compress( Promise.resolve( text ) ), zText ) );
	} );
	await o.test( 'decompress', async o => {
		await o.test( 'should decompress buffer to utf8', async() =>
			equals( await decompress( zText, 8 ), text ) );
		await o.test( 'should decompress base64 to utf8', async() =>
			equals( await decompress( zText.toString( 'base64' ), 'utf8' ), text ) );
		await o.test( 'should decompress base64url to utf8', async() =>
			equals( await decompress( zText.toString( 'base64url' ), 'utf-8' ), text ) );
		await o.test( 'should decompress hex to utf8', async() =>
			equals( await decompress( Buffer.from( zText.toString( 'hex' ), 'hex' ), 'text' ), text ) );
		await o.test( 'should decompress base64 to object', async() =>
			equals( await decompress( zObject.toString( 'base64' ), 'json' ), object ) );
		await o.test( 'should decompress promise to utf8', async() =>
			equals( await decompress( Promise.resolve( zObject.toString( 'base64' ) ), 'json' ), object ) );
	} );
	await o.test( 'compress/decompress', async o => {
		async function *ai() { yield 'a'; yield await new Promise( r => setTimeout( r, 1, 'b' ) ); yield 'c'; }
		await o.test( 'should compress and decompress output of a readable stream', async() =>
			equals( await decompress( await compress( stream( new Blob( [ 'a', 'b', 'c' ] ).stream() ), 64 ), 8 ), 'abc' ) );
		await o.test( 'should compress and decompress output of async iterator', async() =>
			equals( await decompress( await compress( ai(), 64 ), 8 ), 'abc' ) );
	} );
} );
