import suite from './index.mjs';
import { isObject, isLiteral, isIterable, isArray, isReadable, isStream, isBuffer, isBytes, isView, isFn, isError, isPromise } from '../src/index.mjs';

suite( 'is object type', {
	primitive: null,
	set: new Set(),
	literal: {},
	buffer: new ArrayBuffer( 1 ),
	bytes: new Uint8Array( 1 ),
	stream: new Blob( [ '' ] ).stream(),
	view: new DataView( new Uint8Array( 1 ).buffer ),
	promise: Promise.resolve(),
	fn: () => {},
	error: new Error,
	array: [],
	iterable: [].entries(),
	readable: ( async function*() {} )()
}, async tests => {
	await tests( 'isObject', isObject, 'set,literal,buffer,bytes,fn,error,array,iterable,readable,promise,view,stream' );
	await tests( 'isLiteral', isLiteral, 'literal' );
	await tests( 'isIterable', isIterable, 'set,iterable,array,bytes' );
	await tests( 'isArray', isArray, 'array' );
	await tests( 'isReadable', isReadable, 'readable,stream' );
	await tests( 'isStream', isStream, 'stream' );
	await tests( 'isBuffer', isBuffer, 'buffer' );
	await tests( 'isBytes', isBytes, 'bytes' );
	await tests( 'isView', isView, 'bytes,view' );
	await tests( 'isFn', isFn, 'fn' );
	await tests( 'isError', isError, 'error' );
	await tests( 'isPromise', isPromise, 'promise' );
} );
