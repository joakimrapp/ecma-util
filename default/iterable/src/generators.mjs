export function *entries( o, fn, all ) {
	let v;
	for( let k in o )
		if( v = o[ k ], fn && ( all || v != null ) && ( v = fn( v, k, o ) ), all || v != null )
			yield [ k, v ]; }

export function *generate( i, f ) {
	for( ; i != null ; i = f( i ) )
		yield i; }
