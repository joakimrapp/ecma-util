import { isNullish, isInteger, isString, isBigint, isBuffer, isView, isIterable, isReadable, isPromise } from '@jrapp/is';
import { stream } from '../streaming/stream.mjs';
import encode from '../encoding/encode.mjs';
import decode from '../encoding/decode.mjs';

const { crypto } = globalThis;

export default class ByteArray extends Uint8Array {
	static async read( a ) { return this.from( await new Response( stream( isPromise( a ) ? await a : a ) ).arrayBuffer() ); }
	static async resolve( ...a ) { a[ 0 ] = await a[ 0 ]; return this.from( ...a ); }
	static random() { const a = new this( ...arguments ); for( let i = 0, l = 0x10000 ; i < a.length ; i += l ) crypto.getRandomValues( new Uint8Array( a.buffer, i, Math.min( l, a.length - i ) ) ); return a; }
	static from( o ) { switch( true ) {
		case o instanceof this: return o;
		case isView( o ): { const { buffer, byteOffset, length } = o; return new this( buffer, byteOffset, length ); }
		case isBuffer( o ): return new this( ...arguments );
		case isString( o ): return this.from( encode( ...arguments ) );
		case isBigint( o ): return this.from( encode( o.toString( 16 ), 'hex' ) );
		case isInteger( o ): case isIterable( o ): return new this( ...arguments );
		case isReadable( o ): return this.read( o );
		case isPromise( o ): return this.resolve( ...arguments );
		default: return this.from( encode( JSON.stringify( o ), 'utf8' ) ); } }
	bigint() { return BigInt( `0x${this.stringify( 'hex' )}` ); }
	stringify() { return decode( this, ...arguments ); }
	decoded( f ) { return isNullish( f ) ? this : this.stringify( ...arguments ); }
}
