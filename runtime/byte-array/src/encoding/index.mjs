export { default as encode } from './encode.mjs';
export { default as decode } from './decode.mjs';

import ByteArray from '../byte-array/index.mjs';

export const
	encoded = ( a, f ) => ByteArray.from( a, f ),
	decoded = ( a, f ) => typeof a == 'string' ? a : ByteArray.from( a ).decoded( f );
