export { isNullish, isDefined, isPrimitive, isBoolean, isBigint, isString, isNumber, isInteger, isUInt } from './primitive.mjs';

export const
	isObject = a => Object( a ) === a,
	isLiteral = a => isObject( a ) && ( Object.getPrototypeOf( a ) === Object.prototype ),
	isIterable = a => isObject( a ) && ( a?.[ Symbol.iterator ] instanceof Function ),
	isArray = Array.isArray,
	isReadable = a => a?.[ Symbol.asyncIterator ] instanceof Function,
	isStream = a => a instanceof ReadableStream,
	isBuffer = a => a instanceof ArrayBuffer,
	isView = ArrayBuffer.isView,
	isBytes = a => a instanceof Uint8Array,
	isFn = a => a instanceof Function,
	isError = a => a instanceof Error,
	isPromise = a => a instanceof Promise;
