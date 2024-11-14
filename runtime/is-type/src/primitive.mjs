export const
	isNullish = a => a == null,
	isDefined = a => a != null,
	isPrimitive = a => Object( a ) !== a,
	isBoolean = a => typeof a === 'boolean',
	isBigint = a => typeof a === 'bigint',
	isString = a => typeof a === 'string',
	isNumber = Number.isFinite,
	isInteger = Number.isInteger,
	isUInt = a => isInteger( a ) && ( a >= 0 );
