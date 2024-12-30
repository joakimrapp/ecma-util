import { test, equals } from '@jrapp/node-test';
import { ctor, proto, define, definesProto, set, getter, value, valueGetter, groupBy } from '../src/index.mjs';

test( 'object', async o => {
	await o.test( 'proto/ctor', async o => {
		class Test {}
		await o.test( 'should return class is ctor( proto )', async o =>
			equals( ctor( proto( Test ) ), Test ) );
	} );
	await o.test( 'definesProto', async o => {
		class Test {}
		definesProto( Test, { aKey: { value: 5 } } );
		await o.test( 'should get value on instance', async o =>
			equals( new Test().aKey, 5 ) );
	} );
	await o.test( 'set', async o => {
		class Test {
			get test() { return set( this, 'test', 5 ); }
		}
		await o.test( 'should set value on getter', async o =>
			equals( new Test().test, 5 ) );
	} );
	await o.test( 'getter', async o => {
		const a = {};
		await o.test( 'should create getter', async o =>
			equals( define( a, ...getter( 'r', () => 4, true, true ) ).r, 4 ) );
	} );
	await o.test( 'value', async o => {
		const a = {};
		await o.test( 'should create value', async o =>
			equals( define( a, ...value( 'r', 8, true, true ) ).r, 8 ) );
	} );
	await o.test( 'valueGetter', async o => {
		const a = {};
		await o.test( 'should create value', async o =>
			equals( define( a, ...valueGetter( 'x', k => k.toUpperCase(), true ) ).x, 'X' ) );
	} );
	await o.test( 'groupBy', async o => {
		const a = groupBy( [ { a: 'B' }, { a: 'A' }, { a: 'A' }, { a: 'A' }, { a: 'B' } ], ( o ) => o.a );
		await o.test( 'should group by property', async o =>
			equals( a, { B: [ { a: 'B' }, { a: 'B' } ], A: [ { a: 'A' }, { a: 'A' }, { a: 'A' } ] } ) );
	} );
} );
