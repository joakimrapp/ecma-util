import { read } from '@jrapp/node-test';

export const
	object = { a: 1, b: 3, f: 'fwefwefew' },
	text = await read( import.meta, '../src/encoding/base64/default/encode.mjs', 'utf8' );
