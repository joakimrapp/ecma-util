import { isBuffer, isBytes, isView } from './is.mjs';

export default a => {
	if( isBytes( a ) ) return a;
	else if( isBuffer( a ) ) return new Uint8Array( a );
	else if( isView( a ) ) { const { buffer, byteOffset, length } = a; return new Uint8Array( buffer, byteOffset, length ); } };
