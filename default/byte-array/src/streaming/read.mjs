import ByteArray from '../byte-array/index.mjs';

export default async function( a, f ) {
	a = new Response( a );
	switch( f ) {
		case 'json': return await a.json();
		case 'utf8': case 'text': case 'utf-8': case 8: return await a.text();
		default: return ByteArray.from( await a.arrayBuffer() ).decoded( f );
	}
}
