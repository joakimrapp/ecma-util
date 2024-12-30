import { isPrimitive, isBinary } from './is.mjs';

export const
	arePrimitives = ( a0, a1 ) => isPrimitive( a0 ) && isPrimitive( a1 ),
	areBinaries = ( a0, a1 ) => isBinary( a0 ) && isBinary( a1 );
