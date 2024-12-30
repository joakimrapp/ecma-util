import { ok, strictEqual, deepStrictEqual } from 'node:assert';
import { arePrimitives, areBinaries } from './are.mjs';
import binaryFrom from './from.mjs';

const
	{ compare } = Buffer,
	binaryEqual = ( a0, a1, ...a ) => {
		ok( areBinaries( a0, a1 ), ...a );
		const b0 = binaryFrom( a0 ), b1 = binaryFrom( a1 );
		strictEqual( b0.byteLength, b1.byteLength, ...a );
		ok( !compare( b0, b1 ), ...a ); };

export default ( ...a ) => arePrimitives( ...a ) ? strictEqual( ...a ) : areBinaries( ...a ) ? binaryEqual( ...a ) : deepStrictEqual( ...a );
