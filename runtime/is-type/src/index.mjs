export { isStream, isRegExp, isBuffer, isBytes, isFn, isError, isPromise } from './instanceof.mjs';
export { isNumber, isInteger, isArray, isView } from './alias.mjs';
export { isBoolean, isBigint, isString } from './typeof.mjs';

import { isInteger } from './alias.mjs';

export const
	isNullish			= a => a == null,
	isDefined			= a => a != null,
	isPrimitive		= a => Object( a ) !== a,
	isObject			= a => Object( a ) === a,
	isUInt				= a => isInteger( a ) && ( a >= 0 ),
	isLiteral			= a => isObject( a ) && ( Object.getPrototypeOf( a ) === Object.prototype ),
	isIterable		= a => isObject( a ) && ( a?.[ Symbol.iterator ] instanceof Function ),
	isReadable		= a => a?.[ Symbol.asyncIterator ] instanceof Function
;
