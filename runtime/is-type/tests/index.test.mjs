import { test, truthy } from '@jrapp/testing';
import { isNullish, isDefined, isPrimitive, isBoolean, isBigint, isString, isNumber, isInteger, isUInt } from '../src/index.mjs';
import { isObject, isLiteral, isIterable, isArray, isReadable, isStream, isBuffer, isView, isBytes, isFn, isError, isPromise } from '../src/index.mjs';

const
	v = [
		[ undefined, isNullish, isPrimitive ],
		[ null, isNullish, isPrimitive ],
		[ false, isDefined, isPrimitive, isBoolean ],
		[ 0n, isDefined, isPrimitive, isBigint ],
		[ '', isDefined, isPrimitive, isString ],
		[ 4.6, isDefined, isPrimitive, isNumber ],
		[ -6, isDefined, isPrimitive, isNumber, isInteger ],
		[ 0, isDefined, isPrimitive, isNumber, isInteger, isUInt ],
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
		[ Promise.resolve(), isDefined, isObject, isPromise ]



	];

test( 'is', async o => {
	for( let [ n, f ] of Object.entries( { isNullish, isDefined, isPrimitive, isBoolean, isBigint, isString, isNumber, isInteger, isUInt, isObject, isLiteral, isIterable, isArray, isReadable, isStream, isBuffer, isView, isBytes, isFn, isError, isPromise } ) )
		await o.test( n, async o => truthy( v.every( ( [ i, ...a ] ) => a.includes( f ) ? f( i ) : !f( i ) ) ) );
} )


//		[ new Blob( [ '' ] ).stream() ],
//		[ new DataView( new Uint8Array( 1 ).buffer ) ],
//		[ Promise.resolve() ],
//		[ () => {} ],
//		[ new Error ],
//		[ [] ],
//		[ [].entries() ],
//		[ ( async function*() {} )() ],

// view: new DataView( new Uint8Array( 1 ).buffer ),
// promise: Promise.resolve(),
// fn: () => {},
// error: new Error,
// array: [],
// iterable: [].entries(),
// readable: ( async function*() {} )()
