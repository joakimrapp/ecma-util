export { isStream, isRegExp, isBuffer, isBytes, isFn, isError, isPromise } from './instanceof.mjs';
export { isNumber, isInteger, isArray, isView } from './alias.mjs';
export { isBoolean, isBigint, isString } from './typeof.mjs';

const
	{ iterator,
		asyncIterator } = Symbol,
	{ prototype,
		getPrototypeOf } = Object;

export const
	isNullish			= a => a == null,
	isDefined			= a => a != null,
	isPrimitive		= a => Object( a ) !== a,
	isObject			= a => Object( a ) === a,
	isLiteral			= a => isObject( a ) && ( getPrototypeOf( a ) === prototype ),
	isIterable		= a => isObject( a ) && ( a?.[ iterator ] instanceof Function ),
	isReadable		= a => a?.[ asyncIterator ] instanceof Function;
