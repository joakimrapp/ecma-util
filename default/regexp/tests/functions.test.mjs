import { test, equals } from '@jrapp/node-test';
import replacer from '../src/functions/replacer.mjs';

test( 'functions', async o => {
	await o.test( 'replacer', async o => {
		await o.test( 'should replace with matching index', o =>
			equals( replacer( /\\\n[\t ]*|(?<=\n)[\t ]*\n[\t ]*|(\n[\t ]*)(?!\s)/g, '', ' ' )( 'a\n  a\n  \n  a\n  a' ), 'a a\na a' ) );
		await o.test( 'should replace using function', o =>
			equals( replacer( /a|([bc])/g, () => 'å', a => a.toUpperCase() )( 'abbbbac' ), 'åBBBBåC' ) );
	} );
} );
