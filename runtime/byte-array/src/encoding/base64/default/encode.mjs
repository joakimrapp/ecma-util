const
	textEncoder = new TextEncoder(),
	[ padding, ...dictionary ] = textEncoder.encode( '=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/-_' ),
	entries = [ [ 0, 0 ], [ padding, 0 ], ...dictionary.map( ( c, i ) => [ c, i < 64 ? i : i - 2 ] ) ],
	m = new Uint16Array( ( 256 ** 2 ) >> 2 );
for( let [ a, b ] of entries ) for( let [ c, d ] of entries ) m[ ( a << 7 ) | c ] = ( ( b << 6 ) | d );

export default function( a ) {
	textEncoder.encodeInto( a, a = new Uint8Array( a.length + 15 ) );
	let
		i = a.indexOf( padding, -22 ),
		n = ( ( i = i < 0 ? a.indexOf( 0, -22 ) : i ) + 15 ) >> 4,
		o = a.subarray( 0, ~~( ( i < 0 ? n : i ) * 0.75 ) ),
		b = a.buffer,
		w0 = ( a = new DataView( b ) ).setUint32.bind( a ),
		r0 = a.getUint8.bind( a ),
		r1 = ( a = new DataView( b, 0x1 ) ).getUint8.bind( a ),
		r2 = ( a = new DataView( b, 0x2 ) ).getUint8.bind( a ),
		r3 = ( a = new DataView( b, 0x3 ) ).getUint8.bind( a ),
		w4 = ( a = new DataView( b, 0x4 ) ).setUint32.bind( a ),
		r4 = a.getUint8.bind( a ),
		r5 = ( a = new DataView( b, 0x5 ) ).getUint8.bind( a ),
		r6 = ( a = new DataView( b, 0x6 ) ).getUint8.bind( a ),
		r7 = ( a = new DataView( b, 0x7 ) ).getUint8.bind( a ),
		w8 = ( a = new DataView( b, 0x8 ) ).setUint32.bind( a ),
		r8 = a.getUint8.bind( a ),
		r9 = ( a = new DataView( b, 0x9 ) ).getUint8.bind( a ),
		ra = ( a = new DataView( b, 0xa ) ).getUint8.bind( a ),
		rb = ( a = new DataView( b, 0xb ) ).getUint8.bind( a ),
		rc = ( a = new DataView( b, 0xc ) ).getUint8.bind( a ),
		rd = ( a = new DataView( b, 0xd ) ).getUint8.bind( a ),
		re = ( a = new DataView( b, 0xe ) ).getUint8.bind( a ),
		rf = ( a = new DataView( b, 0xf ) ).getUint8.bind( a );
	i = b.byteLength >> 4;
	for( let q, s = 0, t = 0 ; i ; s += 16, t += 12, i-- )
		w0( t, m[ r0( s ) << 7 | r1( s ) ] << 20 | m[ r2( s ) << 7 | r3( s ) ] << 8 | ( q = m[ r4( s ) << 7 | r5( s ) ] ) >> 4 ),
		w4( t, q << 28 | m[ r6( s ) << 7 | r7( s ) ] << 16 | m[ r8( s ) << 7 | r9( s ) ] << 4 | ( q = m[ ra( s ) << 7 | rb( s ) ] ) >> 8 ),
		w8( t, q << 24 | m[ rc( s ) << 7 | rd( s ) ] << 12 | m[ re( s ) << 7 | rf( s ) ] );
	return o; }
