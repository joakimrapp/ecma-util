import { YAML, TEXT, DATA } from './formats.mjs';

const
	re = /\.?(?:(ya?ml)|(json)|(?:utf8|txt|text|js|mjs|cjs|text|utf-8))(?:\.gz)?$/;

export default a => { if( a = a.match?.( re ) ) return a[ 1 ] ? YAML : a[ 2 ] ? DATA : TEXT; };
