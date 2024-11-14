import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs } from '@jrapp/testing';
import encode from '../../src/encoding/encode.mjs';

test( 'encoding/encode', async o => {
	await o.test( 'hex', async o => {
		const
			decoded = '2a52b86a9e',
			encoded = Buffer.from( decoded, 'hex' );
		await o.test( 'should encode hex', () =>
			equals( encode( decoded, 'hex' ), encoded ) );
		await o.test( 'should encode HEX', () =>
			equals( encode( decoded.toUpperCase(), 'HEX' ), encoded ) );
		await o.test( 'should encode 16', () =>
			equals( encode( decoded.toUpperCase(), 16 ), encoded ) );
		await o.test( 'should encode -16', () =>
			equals( encode( decoded, -16 ), encoded ) );
	} );
	await o.test( 'base64', async o => {
		const
			encoded = Buffer.from( [ 10, 55, 234, 1, 0, 33, 98, 255, 12, 1, 1, 19 ] );
		await o.test( 'should encode base64', () =>
			equals( encode( encoded.toString( 'base64' ), 'base64' ), encoded ) );
		await o.test( 'should encode base64url', () =>
			equals( encode( encoded.toString( 'base64url' ), 'base64url' ), encoded ) );
		await o.test( 'should encode 16', () =>
			equals( encode( encoded.toString( 'base64url' ), 64 ), encoded ) );
		await o.test( 'should encode -16', () =>
			equals( encode( encoded.toString( 'base64' ), -64 ), encoded ) );
	} );
	await o.test( 'utf8', async o => {
		const
			encoded = 'hej hopp';
		await o.test( 'should encode base64', () =>
			equals( encode( encoded ), Buffer.from( encoded, 'utf8' ) ) );
	} );
} );
