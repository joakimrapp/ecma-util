import { ok, notStrictEqual, notDeepStrictEqual } from 'node:assert';
import { arePrimitives, areBinaries } from './are.mjs';
import binaryFrom from './from.mjs';

const
	{ compare } = Buffer,
	binaryDiffers = ( a0, a1, ...a ) => ok( compare( binaryFrom( a0 ), binaryFrom( a1 ) ), ...a );

export default ( ...a ) => arePrimitives( ...a ) ? notStrictEqual( ...a ) : areBinaries( ...a ) ? binaryDiffers( ...a ) : notDeepStrictEqual( ...a );
