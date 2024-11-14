export { ok as truthy, doesNotReject as resolves, rejects, doesNotThrow as executes, throws } from 'node:assert';
import { isPrimitive, isBuffer, isView, isBytes } from '@jrapp/is-type';
import { strictEqual, notStrictEqual, deepStrictEqual, notDeepStrictEqual, ok } from 'node:assert';

const
	{ compare } = Buffer,
	is_data = a => isBytes( a ) || isView( a ) || isBuffer( a ),
	to_data = a => {
		if( isBytes( a ) ) return a;
		else if( isView( a ) ) { const { buffer, byteOffset, length } = a; return new Uint8Array( buffer, byteOffset, length ); }
		else if( isBuffer( a ) ) return new Uint8Array( a ); };

export function falsy( i, ...a ) {
	ok( !i, ...a );
}
export function equals( i0, i1, ...a ) {
	if( isPrimitive( i0 ) && isPrimitive( i1 ) ) strictEqual( i0, i1, ...a );
	else if( is_data( i0 ) && is_data( i1 ) ) strictEqual( compare( to_data( i0 ), to_data( i1 ) ), 0, ...a );
	else deepStrictEqual( i0, i1, ...a );
}
export function differs( i0, i1, ...a ) {
	if( isPrimitive( i0 ) && isPrimitive( i1 ) ) notStrictEqual( i0, i1, ...a );
	else if( is_data( i0 ) && is_data( i1 ) ) notStrictEqual( compare( to_data( i0 ), to_data( i1 ) ), 0, ...a );
	else notDeepStrictEqual( i0, i1, ...a );
}
