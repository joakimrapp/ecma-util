import { test, truthy, resolves, rejects, executes, throws, log, falsy, equals, differs } from '@jrapp/testing';
import { defines, getter, methods, names, property, set, symbols, ownProperty } from './index.mjs';

test( 'properties', async o => {
	await o.test( 'defines', async o => {
		await o.test( 'should define properties from property descriptors', async() => {
			equals( defines( {}, { a: { get() { return 1; } } } ).a, 1 );
		} );
		await o.test( 'should define properties from entries', async() => {
			equals( defines( {}, [ [ 'a', { get() { return 1; } } ] ] ).a, 1 );
		} );
	} );
	await o.test( 'getter', async o => {
		await o.test( 'should create a getter', async() => {
			let i = 0;
			class X { constructor() { getter( this, 'a', () => i++ ); } }
			const x = new X;
			x.a;
			equals( x.a, 0 );
			equals( i, 1 );
		} );
		await o.test( 'should create an enumerable getter', async() => {
			let i = 0;
			class X { constructor() { getter( this, 'a', () => i++, true ); } }
			const x = new X;
			equals( Object.keys( x ), [ 'a' ] );
			x.a;
			equals( Object.keys( x ), [ 'a' ] );
			equals( x.a, 0 );
			equals( i, 1 );
		} );
	} );
	await o.test( 'methods', async o => {
		await o.test( 'should get all methods', async() => {
			class X { constructor() { this.q = () => 1; } x() {} }
			class Y extends X { y() {} get r() {} }
			class Z extends Y { z() {} y() {} }
			equals( [ ...methods( new Z ) ], [ 'q', 'z', 'y', 'x' ] );
		} );
	} );
	await o.test( 'names', async o => {
		await o.test( 'should get all names', async() => {
			class X { constructor() { this.q = () => 1; this.w = 6; } x() {} get c() {} }
			class Y extends X { y() {} get r() {} }
			class Z extends Y { z() {} y() {} i = 5; }
			equals( [ ...names( new Z ) ], [ 'w', 'i', 'r', 'c' ] );
		} );
	} );
	await o.test( 'property', async o => {
		await o.test( 'should get property', async() => {
			class X { a() {} }
			class Y extends X { b() {} }
			equals( property( new Y, 'b' ), ownProperty( Y.prototype, 'b' ) );
		} );
	} );
	await o.test( 'set', async o => {
		await o.test( 'should set value of property', async() => {
			equals( { get a() { return set( this, 'a', 4 ); } }[ 'a' ], 4 );
		} );
		await o.test( 'should set value of enumerable property', async() => {
			const a = { get a() { return set( this, 'a', 4, true ); } };
			a.a;
			equals( Object.keys( a ), [ 'a' ] );
		} );
	} );
	await o.test( 'symbols', async o => {
		await o.test( 'should get Symbol.iterator from an iterator', async() => {
			truthy( [ ...symbols( ( function*() {} )() ) ].includes( Symbol.iterator ) );
		} );
	} );
} );
