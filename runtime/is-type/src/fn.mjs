export { isFn } from './index.mjs';
import { isIterable, isReadable } from './index.mjs';

const
	PROTOTYPE = 'prototype',
	Async = ( async() => {} ).constructor,
	isAsyncFunction = a => a instanceof Async,
	hasProtoProto = a => Object.prototype.hasOwnProperty.call( a, PROTOTYPE ),
	isProtoWritable = a => Object.getOwnPropertyDescriptor( a, PROTOTYPE )?.writable === true,
	isProtoReadonly = a => Object.getOwnPropertyDescriptor( a, PROTOTYPE )?.writable === false;

export const
	isArrow = a => !( hasProtoProto( a ) || isAsyncFunction( a ) ),
	isClass = a => isProtoReadonly( a ),
	isAsync = a => ( !hasProtoProto( a ) ) && isAsyncFunction( a ),
	isFunction = a => isProtoWritable( a ) && !( isGenerator( a ) || isAsyncGenerator( a ) ),
	isGenerator = a => isIterable( a?.prototype ),
	isAsyncGenerator = a => isReadable( a?.prototype );
