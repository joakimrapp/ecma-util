import fn from '../fn.mjs';

export default async( i, f ) => {
	const a = [];
	if( ( f = fn( f ?? this ) ) )
		for await( let e of i )
			a[ a.length ] = await f( await e );
	else
		for await( let e of i )
			a[ a.length ] = await e;
	return a; };
