import { test, truthy, rejects, executes, throws, log, falsy, equals, differs, readFile } from '@jrapp/testing';
import I from '../src/iterator.mjs';

function *values() { for( let a of arguments ) yield a; }

test( 'build', async o => {
	await o.test( 'should filter values', async o => equals( I.from( values( 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ) ).filter( i => i & 1 ).array(), [ 1, 3, 5, 7, 9 ] ) );
	await o.test( 'should filter defined values', async o => equals( I.from( values( 2, 2, 3, null, 0, 0, null ) ).defined().array(), [ 2, 2, 3, 0, 0 ] ) );
	await o.test( 'should only have unique values', async o => equals( I.from( values( 2, 2, 3, null, 0, 0, null ) ).unique().array(), [ 2, 3, null, 0 ] ) );
	await o.test( 'should flatten items', async o => equals( I.from( values( [ 1, 2 ], 4, 8, [ 1 ] ) ).flat().array(), [ 1, 2, 4, 8, 1 ] ) );
	await o.test( 'should map values', async o => equals( I.from( values( 1, 2, 3, 4, 5 ) ).map( i => i << 1 ).array(), [ 2, 4, 6, 8, 10 ] ) );
	await o.test( 'should reduce values', async o => equals( I.from( values( 1, 2, 3, 4, 5 ) ).reduce( ( v, i ) => v + i ), 15 ) );
	await o.test( 'should find a value', async o => equals( I.from( values( 1, 2, 3, 4, 5 ) ).find( i => i === 3 ), 3 ) ); } );
