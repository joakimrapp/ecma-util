const dictionary = '0123456789abcdef';

export function decode( a, upper ) {
	const
		m = new TextEncoder().encode( upper ? dictionary.toUpperCase() : dictionary ),
		t = new Uint8Array( a.length << 1 );
	for( let l = a.length, view = new DataView( t.buffer ), write = view.setUint16.bind( view ), i = 0, v ; l-- ; )
		write( i << 1, ( m[ ( v = a[ i++ ] ) >> 4 ] << 8 ) | m[ v & 0b1111 ] );
	return new TextDecoder().decode( t );
}
export function encode( a ) {
	const
		target = new Uint8Array( ( a.length + 1 ) >> 1 ),
		items = a.match( target.length === ( a.length >> 1 ) ? /../g : /^.|../g );
	for( let l = items.length, i = 0 ; l-- ; )
		target[ i ] = parseInt( items[ i++ ], 16 );
	return target;
}
