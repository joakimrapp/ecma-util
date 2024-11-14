import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs } from '@jrapp/testing';
import decode from '../../src/encoding/decode.mjs';

test( 'encoding/decode', async o => {
	const data = Buffer.from( '2a52b86a9e', 'hex' );
	await o.test( 'hex', async o => {
		const decoded = data.toString( 'hex' );
		await o.test( 'should decode hex', () =>
			equals( decode( data, 'hex' ), decoded ) );
		await o.test( 'should decode 16', () =>
			equals( decode( data, 16 ), decoded ) );
	} );
	await o.test( 'hex (upper case)', async o => {
		const decoded = data.toString( 'hex' ).toUpperCase();
		await o.test( 'should decode HEX', () =>
			equals( decode( data, 'HEX' ), decoded ) );
		await o.test( 'should decode -16', () =>
			equals( decode( data, -16 ), decoded ) );
	} );
	await o.test( 'base64', async o => {
		const decoded = data.toString( 'base64' );
		await o.test( 'should decode base64', () =>
			equals( decode( data, 'base64' ), decoded ) );
		await o.test( 'should decode 64', () =>
			equals( decode( data, 64 ), decoded ) );
	} );
	await o.test( 'base64url', async o => {
		const decoded = data.toString( 'base64url' );
		await o.test( 'should decode base64url', () =>
			equals( decode( data, 'base64url' ), decoded ) );
		await o.test( 'should decode url', () =>
			equals( decode( data, 'url' ), decoded ) );
		await o.test( 'should decode -64', () =>
			equals( decode( data, -64 ), decoded ) );
	} );
	await o.test( 'utf8', async o => {
		const decoded = 'hej hopp';
		await o.test( 'should decode utf8', () =>
			equals( decode( Buffer.from( 'hej hopp', 'utf8' ) ), decoded ) );
	} );
} );
