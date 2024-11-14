import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs } from '@jrapp/testing';
import ByteArray from '../../src/byte-array/index.mjs';

const { crypto } = globalThis;

test( 'ByteArray', async o => {
	await o.test( 'ByteArray.read()', async o => {
	} );
	await o.test( 'ByteArray.resolve()', async o => {
		await o.test( 'should create if a promise', async o => {
			const values = new TextEncoder().encode( 'test, this it a test...' );
			equals( await ByteArray.resolve( Promise.resolve( values ) ), values );
		} );
	} );
	await o.test( 'ByteArray.random()', async o => {
		await o.test( 'should create with random data', async o => {
			const values = Uint8Array.from( { length: 100 }, () => 0 );
			differs( ByteArray.random( 100 ), values );
		} );
		await o.test( 'should create more than 65536 bytes of data (no more than 10% diff for any value)', async o => {
			const
				count = 2_000_000,
				mean = count / 256,
				values = Array.from( { length: 256 }, () => 0 );
			for( let i of ByteArray.random( count ) ) values[ i ]++;
			const
				min = Math.min( ...values ),
				max = Math.max( ...values );
			truthy( Math.max( ~~( ( mean - min ) / mean * 100 ), ~~( ( max - mean ) / mean * 100 ) ) < 10 );
			truthy( min !== max );
		} );
	} );
	await o.test( 'ByteArray.from()', async o => {
		await o.test( 'should not create new if is byte-array', async o => {
			const values = ByteArray.from( 100 );
			truthy( ByteArray.from( values ) === values );
		} );
		await o.test( 'should create with fixed size, containing only 0', async o => {
			const values = Uint8Array.from( { length: 100 }, () => 0 );
			equals( ByteArray.from( 100 ), values );
		} );
		await o.test( 'should create from view', async o => {
			const
				values = crypto.getRandomValues( new Uint8Array( 100 ) ),
				someValues = values.subarray( 25, 50 ),
				bytes = ByteArray.from( someValues );
			equals( bytes.byteLength, 25 );
			equals( bytes.byteLength, someValues.byteLength );
			equals( bytes, someValues );
		} );
		await o.test( 'should create from ArrayBuffer', async o => {
			const values = crypto.getRandomValues( new Uint8Array( 100 ) );
			equals( ByteArray.from( values.buffer ), values );
		} );
		await o.test( 'should create from ArrayBuffer', async o => {
			const values = crypto.getRandomValues( new Uint8Array( 100 ) );
			equals( ByteArray.from( values.buffer ), values );
		} );
		await o.test( 'should create from string', async o => {
			const value = 'jippi nkerhlghi khegrh';
			equals( ByteArray.from( value ).stringify(), value );
		} );
		await o.test( 'should create from bigint', async o => {
			const value = 0x16463844c6390a465930465d7e937573eee93f03765783987648392020274a74n;
			equals( ByteArray.from( value ).stringify( 'hex' ), value.toString( 16 ) );
		} );
		await o.test( 'should create from int', async o => {
			equals( ByteArray.from( 20 ).byteLength, 20 );
		} );
		await o.test( 'should create from array', async o => {
			const array = [ 1, 2, 3, 4, 5, 6, 7 ];
			equals( ByteArray.from( array ), new Uint8Array( array ) );
		} );
		await o.test( 'should create from stream', async o => {
			equals( await ByteArray.from( new Blob( [ 'a', 'b', 'c' ] ).stream() ), new TextEncoder().encode( 'abc' ) );
		} );
		await o.test( 'should create from readable promise', async o => {
			equals( await ByteArray.from( Promise.resolve( ( async function*() { const t = new TextEncoder(); for( let i of 'abc' ) yield t.encode( i ); } )() ) ), new TextEncoder().encode( 'abc' ) );
		} );
		await o.test( 'should create from literal', async o => {
			const value = { a: 1, b: 'b', c: [ 1, 2, 4 ] };
			equals( JSON.parse( ByteArray.from( value ).stringify() ), value );
		} );
	} );
	await o.test( '.bigint()', async o => {
		await o.test( 'should convert to bigint', async o => {
			const hex = '0xaabb25c0004def1217aa885198';
			equals( ByteArray.from( hex.slice( 2 ), 'hex' ).bigint(), BigInt( hex ) );
		} );
	} );
	await o.test( '.stringify()', async o => {
		await o.test( 'should stringify', async o => {
			const hex = 'aabb25c0004def1217aa885198';
			equals( ByteArray.from( hex, 'hex' ).stringify( -16 ), hex.toUpperCase() );
		} );
	} );
	await o.test( '.decoded()', async o => {
		const bytes = ByteArray.from( 'aabb25c0004def1217aa885198', 'hex' );
		await o.test( 'should decode if format is specified', async o =>
			equals( bytes.decoded( 'hex' ), bytes.stringify( 'hex' ) ) );
		await o.test( 'should not decode if format is not specified', async o =>
			equals( bytes.decoded(), bytes ) );
	} );
} );

/*

export default class ByteArray extends Uint8Array {
	static async read( a, f ) { return this.from( await new Response( stream( isPromise( a ) ? await a : a ) ).arrayBuffer() ); }
	static async resolve( ...a ) { a[ 0 ] = await a[ 0 ]; return this.from( ...a ); }
	static random() { const a = new this( ...arguments ); for( let i = 0, l = 0x10000 ; i < a.length ; i += l ) crypto.getRandomValues( new Uint8Array( a.buffer, i, Math.min( l, a.length - i ) ) ); return a; }
	static from( o ) { switch( true ) {
		case isReadable( o ): return this.read( o );
		case isPromise( o ): return this.resolve( ...arguments );
		default: return this.from( encode( JSON.stringify( o ), 'utf8' ) ); } }
	bigint() { return BigInt( `0x${this.stringify( 'hex' )}` ); }
	decoded( f ) { return isNullish( f ) ? this : this.stringify( ...arguments ); }
}

*/
