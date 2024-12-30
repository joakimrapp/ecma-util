import { test, equals, read } from '@jrapp/node-test';
import parse from '#parse';

test( 'parse', async o => {
	await o.test( 'strings', async o => {
		const data = parse( await read( import.meta, 'index.yaml', 'utf8' ) );
		await o.test( 'should parse a flow scalar plain string', async() =>
			equals( data[ 'string-flow' ], 'hello this is a string' ) );
		await o.test( 'should parse a flow scalar plain multiline string', async() =>
			equals( data[ 'string-flow-multiline' ], 'hello this is another string' ) );
		await o.test( 'should parse a flow scalar single-quoted string', async() =>
			equals( data[ 'string-flow-single-quoted' ], 'this is a "test" string' ) );
		await o.test( 'should parse a flow scalar double-quoted string', async() =>
			equals( data[ 'string-flow-double-quoted' ], 'this is another \'test\' string with a comment after' ) );
		await o.test( 'should parse a block scalar folded string', async() =>
			equals( data[ 'string-block-folded' ], 'this is a string that\nis folded' ) );
		await o.test( 'should parse a block scalar clipped string', async() =>
			equals( data[ 'string-block-clip' ], 'this is a\nclip string\n' ) );
		await o.test( 'should parse a block scalar stripped string', async() =>
			equals( data[ 'string-block-strip' ], 'this is a\nstrip string' ) );
		await o.test( 'should parse a block scalar kept string', async() =>
			equals( data[ 'string-block-keep' ], 'this is a\nkept string\n\n' ) );
		await o.test( 'should parse an number', async() =>
			equals( data[ 'number' ], 1.2 ) );
		await o.test( 'should parse a boolean', async() =>
			equals( data[ 'boolean' ], true ) );
		await o.test( 'should parse an array', async() =>
			equals( data[ 'array' ], [ 1, 2 ] ) );
		await o.test( 'should parse a more comples object', async() =>
			equals( data[ 'more-complex-object' ], { 'with-a-property': 4, 'and-another': [ 'rtrt', 4 ], ok: false, inner: { fewfewfwefe: 'test' } } ) );
	} );
} );
