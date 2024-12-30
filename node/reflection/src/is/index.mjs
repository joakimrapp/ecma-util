export { isFn } from '@jrapp/is';
import { isIterable, isReadable } from '@jrapp/is';
import { isAsyncFunction, hasProtoProto, isProtoWritable, isProtoReadonly } from './util.mjs';

export const
	isArrow = a => !( hasProtoProto( a ) || isAsyncFunction( a ) ),
	isClass = a => isProtoReadonly( a ),
	isAsync = a => ( !hasProtoProto( a ) ) && isAsyncFunction( a ),
	isFunction = a => isProtoWritable( a ) && !( isGenerator( a ) || isAsyncGenerator( a ) ),
	isGenerator = a => isIterable( a?.prototype ),
	isAsyncGenerator = a => isReadable( a?.prototype );
