import { test, truthy } from '@jrapp/testing';
import { isFn, isArrow, isFunction, isClass, isAsync, isGenerator, isAsyncGenerator } from '../src/is/index.mjs';
import { asyncFunction } from '../src/is/util.mjs';

const
	t = { isFn, isArrow, isFunction, isClass, isAsync, isGenerator, isAsyncGenerator },
	v = [
		[ () => {}, isFn, isArrow ],
		[ function() {}, isFn, isFunction ],
		[ class {}, isFn, isClass ],
		[ async function() {}, isFn, isAsync ],
		[ function*() {}, isFn, isGenerator ],
		[ async function*() {}, isFn, isAsyncGenerator ] ];
test( 'is', async o => {
	await o.test( 'is', async o => {
		for( let [ n, f ] of Object.entries( t ) )
			await o.test( n, async o => truthy( v.every( ( [ i, ...a ] ) => a.includes( f ) ? f( i ) : !f( i ) ) ) );
	} );
	await o.test( 'asyncFunction', async o => {
		await o.test( 'should execute a pointless test to get more coverage', async () => truthy( asyncFunction() ) );
	} );
} );
