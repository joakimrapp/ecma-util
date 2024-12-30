import { test, equals } from '@jrapp/node-test';
import { importable, resolve, join, dirname, relative, extname, isAbsolute, basename, fromUrl, toUrl } from '../src/index.mjs';

test( 'importable', async o => {
	await o.test( 'should map values', async o => {
		equals( importable( '/a/b/c/d.mjs', '/a/b/c/e/f.mjs' ), './e/f.mjs' );
	} );
} );
