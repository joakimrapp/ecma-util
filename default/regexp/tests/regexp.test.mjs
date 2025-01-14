import { test, equals } from '@jrapp/node-test';
import RegExp from '../src/regexp/index.mjs';

test( 'RegExp', async o => {
	await o.test( 'groups', async o => {
		await o.test( 'should return groups', async() =>
			equals( { ...new RegExp( /a(?<b>b)/ ).groups( 'ab' ) }, { b: 'b' } ) );
		await o.test( 'should return matched index', async() =>
			equals( new RegExp( /a(b)/ ).match( 'ab', 1 ), 'b' ) );
	} );
	await o.test( 'match', async o => {
		await o.test( 'should return match', async() =>
			equals( [ ...new RegExp( /a(b)/ ).match( 'ab' ) ], [ 'ab', 'b' ] ) );
		await o.test( 'should return matched index', async() =>
			equals( new RegExp( /a(b)/ ).match( 'ab', 1 ), 'b' ) );
	} );
	await o.test( 'matches', async o => {
		await o.test( 'should return matches', async() =>
			equals( [ ...new RegExp( /a|(b)/g ).matches( 'aabb' ) ].map( ( [ ...a ] ) => a ), [ [ 'a', undefined ], [ 'a', undefined ], [ 'b', 'b' ], [ 'b', 'b' ] ] ) );
	} );
	await o.test( 'reduce', async o => {
		await o.test( 'should yield until null', async() =>
			equals( [ ...new RegExp( /.*?(?=\.\w+$)/ ).reduce( 'hej.hopp.ditt' ) ], [ 'hej.hopp.ditt', 'hej.hopp', 'hej' ] ) );
	} );
	await o.test( 'replace', async o => {
		await o.test( 'should replace with matching index', o =>
			equals( new RegExp( /\\\n[\t ]*|(?<=\n)[\t ]*\n[\t ]*|(\n[\t ]*)(?!\s)/g ).replace( 'a\n  a\n  \n  a\n  a', '', ' ' ), 'a a\na a' ) );
	} );
	await o.test( 'replacer', async o => {
		await o.test( 'should replace using function', o =>
			equals( new RegExp( /a|([bc])/g ).replacer( () => 'å', a => a.toUpperCase() )( 'abbbbac' ), 'åBBBBåC' ) );
	} );
} );
