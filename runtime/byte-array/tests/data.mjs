import { metaPath, readFile } from '@jrapp/testing';

export const
	object = { a: 1, b: 3, f: 'fwefwefew' },
	text = await readFile( metaPath( import.meta, '../src/encoding/base64/default/encode.mjs' ), 'utf8' );
