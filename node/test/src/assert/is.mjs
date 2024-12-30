export const
	isPrimitive = a => a !== Object( a ),
	isBuffer = a => a instanceof ArrayBuffer,
	isBytes = a => a instanceof Uint8Array,
	{ isView } = ArrayBuffer,
	isBinary = a => isBuffer( a ) || isBytes( a ) || isView( a );
