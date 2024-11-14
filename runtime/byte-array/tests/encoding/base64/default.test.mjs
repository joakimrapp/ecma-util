import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs } from '@jrapp/testing';
import { encode, decode } from '#base64/default';

const { crypto } = globalThis;

test( 'encoding/base64/default', async o => {
	const lengths = [ 1, 2, 3, 4, 5, 6, 7, 8, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031 ];
	await o.test( 'encode', async o => {
		async function testEncode( length, format ) { await o.test( `should encode a ${format} buffer of ${length} bytes`, () => {
			const data = crypto.getRandomValues( new Uint8Array( length ) );
			equals( encode( Buffer.from( data ).toString( format ) ), data );
		} ); }
		for( let i of lengths ) await testEncode( i, 'base64' );
		for( let i of lengths ) await testEncode( i, 'base64url' );
	} );
	await o.test( 'decode', async o => {
		async function testDecode( length, format ) { await o.test( `should decode a buffer of ${length} bytes to ${format}`, () => {
			const data = crypto.getRandomValues( new Uint8Array( length ) );
			equals( decode( data, format === 'base64url' ), Buffer.from( data ).toString( format ) );
		} ); }
		for( let i of lengths ) await testDecode( i, 'base64' );
		for( let i of lengths ) await testDecode( i, 'base64url' );
	} );
} );
