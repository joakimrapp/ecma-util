import suite from './index.mjs';
import { isNullish, isDefined, isPrimitive, isBoolean, isBigint, isString, isNumber, isInteger } from '../src/primitive.mjs';

suite( 'primitive types', {
	null: null,
	undefined: undefined,
	boolean: false,
	bigint: 0n,
	string: '',
	number: 1.1,
	integer: 0,
	object: {},
	fn: function() {}
}, async tests => {
	await tests( 'isNullish', isNullish, 'null,undefined' );
	await tests( 'isDefined', isDefined, 'boolean,bigint,string,number,integer,object,fn' );
	await tests( 'isPrimitive', isPrimitive, 'undefined,null,boolean,bigint,string,number,integer' );
	await tests( 'isBoolean', isBoolean, 'boolean' );
	await tests( 'isBigint', isBigint, 'bigint' );
	await tests( 'isString', isString, 'string' );
	await tests( 'isNumber', isNumber, 'number,integer' );
	await tests( 'isInteger', isInteger, 'integer' );
} );
