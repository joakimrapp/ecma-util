import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs } from '@jrapp/testing';
import { encode, decode } from '../../src/encoding/hex.mjs';

test( 'encoding/hex', async o => {
	await o.test( 'encode', async o => {
		await o.test( 'should encode from hex with even amount of chars', () => {
			const data = '2a52b86a9e';
			equals( encode( data ), Buffer.from( data, 'hex' ) );
		} );
		await o.test( 'should encode from hex with uneven amount of chars', () => {
			const data = 'aa52b86a9e3';
			equals( encode( data ), Buffer.from( '0' + data, 'hex' ) );
		} );
		await o.test( 'should encode from hex with leading 0', () => {
			const data = '0002a52b86a9e3';
			equals( encode( data ), Buffer.from( data, 'hex' ) );
		} );
	} );
	await o.test( 'decode', async o => {
		await o.test( 'should decode to hex', () => {
			const data = new Uint8Array( [ 45, 212, 23, 23, 133, 212, 45, 1, 32 ] );
			equals( decode( data ), Buffer.from( data ).toString( 'hex' ) );
		} );
		await o.test( 'should decode to hex with leading 0', () => {
			const data = new Uint8Array( [ 0, 0, 0, 23, 133, 212, 45, 1, 32 ] );
			equals( decode( data ), Buffer.from( data ).toString( 'hex' ) );
		} );
		await o.test( 'should decode to hex (uppercase)', () => {
			const data = new Uint8Array( [ 45, 212, 23, 23, 133, 212, 45, 1, 32 ] );
			equals( decode( data, true ), Buffer.from( data ).toString( 'hex' ).toUpperCase() );
		} );
	} );
} );
