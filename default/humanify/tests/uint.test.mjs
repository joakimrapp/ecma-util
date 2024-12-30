import { test, equals } from '@jrapp/node-test';
import uint from '../src/uint.mjs';

test( 'uint', async o => {
	await o.test( 'should handle 5', async o =>
		equals( uint( 5 ), 'five' ) );
	await o.test( 'should handle > 20', async o =>
		equals( uint( 35 ), '35' ) );
} );
