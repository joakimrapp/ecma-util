import { test, truthy, resolves, rejects, executes, throws, falsy, equals, differs, readFile } from '@jrapp/testing';
import create from '../src/index.mjs';

test( 'create', async o => {
	await o.test( 'should create error with name', async() =>
		equals( new ( create( 'TEST' ) )().name, 'TEST_ERROR' ) );
	await o.test( 'should instantiate with message derived from name if not specified', async() =>
		equals( new ( create( 'TEST_INVALID' ) )().message, 'test invalid' ) );
	await o.test( 'should instantiate with message derived from argument if specified', async() =>
		equals( new ( create( 'TEST_INVALID' ) )( 'test message' ).message, 'test message' ) );
	await o.test( 'should instantiate with message derived function', async() =>
		equals( new ( create( 'TEST_INVALID', ( a, b ) => `${a} ${b}` ) )( 'A', 'B' ).message, 'A B' ) );
	await o.test( 'should throw new error', async() =>
		throws( () => create( 'TEST_INVALID' ).throw() ) );
} );
