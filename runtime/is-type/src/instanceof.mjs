export const
	isStream			= a => a instanceof ReadableStream,
	isRegExp			= a => a instanceof RegExp,
	isBuffer			= a => a instanceof ArrayBuffer,
	isBytes				= a => a instanceof Uint8Array,
	isFn					= a => a instanceof Function,
	isError				= a => a instanceof Error,
	isPromise			= a => a instanceof Promise;
