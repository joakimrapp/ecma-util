import { test, truthy, rejects, executes, throws, log, falsy, equals, differs, readFile } from '@jrapp/testing';
import build from '../src/build.mjs';

test( 'build', async o => {
	await o.test( 'should apply defined filter', async o => equals( build().defined().array( [ 1, undefined, 2, null ] ), [ 1, 2 ] ) );
	await o.test( 'should flatten items', async o => equals( build().flat().array( [ 1, null, [ 2, 3 ], [ 4, null ] ] ), [ 1, 2, 3, 4, null ] ) );
	await o.test( 'should map items', async o => equals( build().map( i => i + 1 ).array( [ 1, 2, 3 ] ), [ 2, 3, 4 ] ) );
	await o.test( 'should apply unique filter', async o => equals( build().unique().array( [ 1, 2, 2, 3 ] ), [ 1, 2, 3 ] ) );
	await o.test( 'should chain filters', async o => equals( build().flat().defined().unique().array( [ 1, [ 2, null ], null, [ 2, 3 ] ] ), [ 1, 2, 3 ] ) );
} );
