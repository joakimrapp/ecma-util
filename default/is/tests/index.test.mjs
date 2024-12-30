import { test, truthy } from '@jrapp/node-test';
import {
	isNullish, isDefined, isPrimitive, isObject, isLiteral, isIterable, isReadable,
	isBoolean, isBigint, isString,
	isNumber, isInteger, isArray, isView,
	isStream, isRegExp, isBuffer, isBytes, isFn, isError, isPromise } from '../src/index.mjs';

const
	all = {
		isNullish, isDefined, isPrimitive, isObject, isLiteral, isIterable, isReadable,
		isBoolean, isBigint, isString,
		isNumber, isInteger, isArray, isView,
		isStream, isRegExp, isBuffer, isBytes, isFn, isError, isPromise },
	tests = [
		[ undefined, isNullish, isPrimitive ],
		[ null, isNullish, isPrimitive ],
		[ false, isDefined, isPrimitive, isBoolean ],
		[ 0n, isDefined, isPrimitive, isBigint ],
		[ '', isDefined, isPrimitive, isString ],
		[ 4.6, isDefined, isPrimitive, isNumber ],
		[ -6, isDefined, isPrimitive, isNumber, isInteger ],
		[ 0, isDefined, isPrimitive, isNumber, isInteger ],
		[ new Set(), isDefined, isObject, isIterable ],
		[ [].entries(), isDefined, isObject, isIterable ],
		[ [], isDefined, isObject, isArray, isIterable ],
		[ {}, isDefined, isObject, isLiteral ],
		[ function() {}, isDefined, isObject, isFn ],
		[ new ArrayBuffer( 1 ), isDefined, isObject, isBuffer ],
		[ new Uint8Array( 1 ), isDefined, isObject, isIterable, isBytes, isView ],
		[ new Error(), isDefined, isObject, isError ],
		[ new Set(), isDefined, isObject, isIterable ],
		[ new Set(), isDefined, isObject, isIterable ],
		[ ( async function*() {} )(), isDefined, isObject, isReadable ],
		[ new Blob( [ '' ] ).stream(), isDefined, isObject, isReadable, isStream ],
		[ Promise.resolve(), isDefined, isObject, isPromise ],
		[ /o/, isDefined, isObject, isRegExp ] ];

test( 'is', async o => {
	for( let [ n, f ] of Object.entries( all ) )
		await o.test( n, async o => truthy( tests.every( ( [ i, ...a ] ) => a.includes( f ) ? f( i ) : !f( i ) ) ) );
} );
