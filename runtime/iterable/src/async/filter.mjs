import fn from '../fn.mjs';

const
	is = e => e != null;

export default async function*( i, f = fn( this ) ?? is ) {
	for await( let e of i )
		if( await f( e ) )
			yield e;
}
