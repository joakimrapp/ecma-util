import { ownProperty } from '@jrapp/object';

export const
	PROTOTYPE = 'prototype',
	asyncFunction = async() => {},
	AsyncFunction = asyncFunction.constructor,
	{ prototype: { hasOwnProperty: hasOwn } } = Object,
	isAsyncFunction = a => a instanceof AsyncFunction,
	hasProtoProto = a => hasOwn.call( a, PROTOTYPE ),
	isProtoWritable = a => ownProperty( a, PROTOTYPE )?.writable === true,
	isProtoReadonly = a => ownProperty( a, PROTOTYPE )?.writable === false;
