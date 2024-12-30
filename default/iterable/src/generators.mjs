export function *entries( o, fn ) {
	let value;
	if( fn )
		for( let key in o ) {
			value = o[ key ]
			if( value != null )
				yield fn( key, value ); }
	else
		for( let key in o ) {
			yield [ key, o[ key ] ]; } }

export function *generate( i, f, whilst ) {
	for( ; whilst?.( i ) ?? true ; i = f( i ) )
		yield i; }
