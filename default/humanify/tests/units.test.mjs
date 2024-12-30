import { test, equals } from '@jrapp/node-test';
import { bytes, grams, meter } from '../src/units/index.mjs';

test( 'units', async o => {
	await o.test( 'bytes', async o => {
		await o.test( 'should handle non value', async o =>
			equals( bytes( null, 2, 'n/a' ), 'n/a' ) );
		await o.test( 'should handle < 1024 bytes', async o =>
			equals( bytes( 342 ), '342 B' ) );
		await o.test( 'should handle < 1024 * 1024 bytes', async o =>
			equals( bytes( 342 * 1024 ), '342.00 kB' ) );
		await o.test( 'should handle < 1024 * 1024 bytes with 1 decimal precision', async o =>
			equals( bytes( 342 * 1024, 1 ), '342.0 kB' ) );
		await o.test( 'should handle < 1024 * 1024 * 1024 bytes', async o =>
			equals( bytes( 342 * 1024 * 1024, 0 ), '342 MB' ) );
	} );
	await o.test( 'grams', async o => {
		await o.test( 'should handle < 1000 grams', async o =>
			equals( grams( 761 ), '761 g' ) );
		await o.test( 'should handle > 1000 grams', async o =>
			equals( grams( 13564, 1 ), '13.6 kg' ) );
	} );
	await o.test( 'meter', async o => {
		await o.test( 'should handle < 1000 meter', async o =>
			equals( meter( 224 ), '224 m' ) );
		await o.test( 'should handle > 1000 meter', async o =>
			equals( meter( 2240, 1 ), '2.2 km' ) );	
	} );
} );
