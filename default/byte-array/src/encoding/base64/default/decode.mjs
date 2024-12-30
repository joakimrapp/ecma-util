const
	textEncoder = new TextEncoder(),
	textDecoder = new TextDecoder(),
	[ pad, plus, slash, dash, under, ...alphanum ] = textEncoder.encode( '=+/-_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' ),
	dictionary = { org: new Uint8Array( [ ...alphanum, plus, slash ] ), url: new Uint8Array( [ ...alphanum, dash, under ] ) };

export default function( a, url ) {
	let
		T = new Uint8Array( url ? Math.ceil( a.length / 3 * 4 ) : Math.ceil( a.length / 3 ) * 4 ),
		m = url ? dictionary.url : dictionary.org,
		L = a.length,
		l = L - ( L % 3 ),
		s = 0,
		t = -4,
		c,
		v = new DataView( T.buffer );
	while( s < l ) v.setUint32( t += 4, ( m[ ( ( c = a[ s++ ] ) >> 2 ) ] << 24 ) | ( m[ ( ( c & 0x3 ) << 4 ) | ( ( c = a[ s++ ] ) >> 4 ) ] << 16 ) | ( m[ ( ( c & 0xf ) << 2 ) | ( ( c = a[ s++ ] ) >> 6 ) ] << 8 ) | m[ c & 0x3f ] );
	t += 4;
	if( s < L ) ( v.setUint16( t, ( m[ ( ( c = a[ s++ ] ) >> 2 ) ] << 8 ) | m[ ( ( c & 0x3 ) << 4 ) | ( ( s < L ) ? ( ( c = a[ s ] ) >> 4 ) : 0 ) ] ), t += 2 );
	if( s < L ) T[ t++ ] = m[ ( ( a[ s++ ] & 0xf ) << 2 ) ];
	while( t < T.length ) T[ t++ ] = pad;
	return textDecoder.decode( T ); }
