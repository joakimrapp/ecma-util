const
	write = process.stdout.write.bind( process.stdout ), is24 = ( process.stdout.getColorDepth?.() === 24 ),
	w = ( ...a ) => write( a.join`` ),
	c6 = ( r, g, b, i, ...a ) => `\x1b[${[ i ? 48 : 38, 5, ( r * 36 ) + ( g * 6 ) + b + 16 ].join( ';' )}m`,
	gs = [ 16, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 231 ],
	ca = function*( ...a ) { for( let v = a.map( e => e === 1 ? 1 : e === -1 ? 5 : e ), i = 5 ; i-- ; v = v.map( ( e, i ) => Math.abs( a[ i ] ) === 1 ? e + a[ i ] : e ) ) yield ( v[ 0 ] * 36 ) + ( v[ 1 ] * 6 ) + v[ 2 ] + 16; },
	w8 = ( a, n ) => new Promise( r => setTimeout( r, Math.max( a + n - ( n = Date.now() ) ), n ) ),
	cs = ( ...a ) => a.map( ( e, y ) => e.replace( /(?=(█|▀)?)(?:(█+|▄+)|▀+| +)/g, ( m, u, d, x ) =>
		`\x1b[${[ ...u != null ? [ 48, 5, `${y << 1}:${x}` ] : [ 40 ], ...d != null ? [ 38, 5, `${( y << 1 ) + 1}:${x}` ] : [ 30 ] ].join( ';' )}m${'▄'.repeat( m.length )}` ) ).join( '\x1b[0m\n' ),
	rc = ( ...a ) => a.map( a => [ ...a.matchAll( /(?<k>[A-Z\d.,!:?()[\]\\/\-@]) (?<v>[█▀▄ ]*?) (?![█▀▄ ])/g ) ].map( ( { groups: { k, v } } ) => [ k, v ] ) ).reduce( ( o, a ) => ( a.forEach( ( [ k, v ] ) => ( o[ k ] ??= [] ).push( v ) ), o ), {} ),
	sc = {
		...rc(
			'A ▄▀▀▀▀▀▄ B █▀▀▀▀▀▄ C ▄▀▀▀▀▀▄ D █▀▀▀▀▀▄ E █▀▀▀▀▀█ F █▀▀▀▀▀█ G ▄▀▀▀▀▀▄ H █▀█ █▀█ I █▀▀▀█ J     █▀█ K █▀█ █▀█ L █▀█     M █▀▄ ▄▀█ N █▀▄ ▄▀█ O ▄▀▀▀▀▀▄ P █▀▀▀▀▀▄ Q ▄▀▀▀▀▀▄ R █▀▀▀▀▀▄ S ▄▀▀▀▀▀▄ T █▀▀▀▀▀█ U █▀█ █▀█ V █▀█ █▀█ W █▀█ █▀█ X █▀█ █▀█ Y █▀█ █▀█ Z █▀▀▀▀▀█',
			'A █ █▀█ █ B █ █▀█ █ C █ █▀█▄█ D █ █▀█ █ E █ █▀▀▀▀ F █ █▀▀▀▀ G █ █▀█▄█ H █ █ █ █ I ▀█ █▀ J     █ █ K █ █ █ █ L █ █     M █ ▀▄▀ █ N █  ▀█ █ O █ █▀█ █ P █ █▀█ █ Q █ █▀█ █ R █ █▀█ █ S █ █▀▀▄█ T ▀▀█ █▀▀ U █ █ █ █ V █ █ █ █ W █ █ █ █ X █ █ █ █ Y █ █ █ █ Z ▀▀▀█▀ █',
			'A █ ▀▀▀ █ B █ ▀▀▀▄▀ C █ █     D █ █ █ █ E █ ▀▀▀█  F █ ▀▀▀█  G █ █ █▀█ H █ ▀▀▀ █ I  █ █  J ▄▄▄ █ █ K █ ▀▀ ▄▀ L █ █     M █ ▄ ▄ █ N █ █▄  █ O █ █ █ █ P █ ▀▀▀ █ Q █ █ █ █ R █ ▀▀▀▄▀ S █▄ ▀▀▄▄ T   █ █   U █ █ █ █ V  █ █ █  W █ █▀█ █ X ▀▄ ▀ ▄▀ Y ▀▄ ▀ ▄▀ Z   █ ▄▀ ',
			'A █ █▀█ █ B █ █▀█ █ C █ █ ▄▄▄ D █ █ █ █ E █ █▀▀▀  F █ █▀▀▀  G █ █ █ █ H █ █▀█ █ I  █ █  J █ █ █ █ K █ █▀▄ █ L █ █     M █ █▀█ █ N █ █ █ █ O █ █ █ █ P █ █▀▀▀  Q █ █ █▄▀ R █ █▀█ █ S ▄▄▀▀▄ █ T   █ █   U █ █ █ █ V  █ █ █  W █  ▄  █ X █ ▄▀▄ █ Y   █ █   Z ▄▀ ▄▀  ',
			'A █ █ █ █ B █ ▀▀▀ █ C █ ▀▀▀ █ D █ ▀▀▀ █ E █ ▀▀▀▀█ F █ █     G █ ▀▀▀ █ H █ █ █ █ I █▀ ▀█ J █ ▀▀▀ █ K █ █ █ █ L █ ▀▀▀▀█ M █ █ █ █ N █ █ █ █ O █ ▀▀▀ █ P █ █     Q █ ▀▀▄▀█ R █ █ █ █ S █ ▀▀▀ █ T   █ █   U █ ▀▀▀ █ V   █ █   W █ █ █ █ X █ █ █ █ Y   █ █   Z █ ▀▀▀▀█',
			'A ▀▀▀ ▀▀▀ B ▀▀▀▀▀▀  C  ▀▀▀▀▀  D ▀▀▀▀▀▀  E ▀▀▀▀▀▀▀ F ▀▀▀     G  ▀▀▀▀▀  H ▀▀▀ ▀▀▀ I ▀▀▀▀▀ J  ▀▀▀▀▀  K ▀▀▀ ▀▀▀ L ▀▀▀▀▀▀▀ M ▀▀▀ ▀▀▀ N ▀▀▀ ▀▀▀ O  ▀▀▀▀▀  P ▀▀▀     Q  ▀▀▀▀▀▀ R ▀▀▀ ▀▀▀ S  ▀▀▀▀▀  T   ▀▀▀   U  ▀▀▀▀▀  V   ▀▀▀   W ▀▀   ▀▀ X ▀▀▀ ▀▀▀ Y   ▀▀▀   Z ▀▀▀▀▀▀▀' ),
		...rc(
			'0 ▄▀▀▀▀▀▄ 1 ▄▀▀█  2 ▄▀▀▀▀▀▄ 3 █▀▀▀▀▀▄ 4 █▀█ █▀█ 5 █▀▀▀▀▀█ 6 ▄▀▀▀▀▀▄ 7 █▀▀▀▀▀█ 8 ▄▀▀▀▀▀▄ 9 ▄▀▀▀▀▀▄ .     ,     ! █▀█ : ▄▄▄ ? ▄▀▀▀▀▀▄ (  ▄▀█ ) █▀▄  [ █▀▀█ ] █▀▀█ \\ █▀█   /   █▀█ -       @  ▄▄▄▄▄  ',
			'0 █ █▀█ █ 1 ▀█ █  2 █▄█▀█ █ 3 ▀▀▀▀█ █ 4 █ █ █ █ 5 █ █▀▀▀▀ 6 █ █▀▀▀▀ 7 ▀▀▀█▀ █ 8 █ █▀█ █ 9 █ █▀█ █ .     ,     ! █ █ : █▄█ ? █▄█▀█ █ ( ▄▀ █ ) █ ▀▄ [ █ █▀ ] ▀█ █ \\ █ █   /   █ █ -       @ █ ▄▄▄ █ ',
			'0 █ █▀▄ █ 1  █ █  2   ▄▀ ▄▀ 3   ▄▀ ▄▀ 4 █ ▀▀▀ █ 5 █▄ ▀▀▄▄ 6 █ ▀▀▀▀▄ 7   █ ▄▀  8 ▀▄ ▀ ▄▀ 9 █ ▀▀▀ █ .     ,     ! █ █ :     ?   ▄▀ ▄▀ ( █ █  )  █ █ [ █ █  ]  █ █ \\  █ █  /  █ █  - █▀▀▀█ @ █ █ █ █ ',
			'0 █ ▄▀█ █ 1  █ █  2 ▄▀ ▄▀   3    ▀▄ █ 4  ▀▀▀█ █ 5 ▄▄▀▀▄ █ 6 █ █▀█ █ 7  █ ▄▀   8 █ ▄▀▄ █ 9  ▀▀▀█ █ .     ,     ! ▀▀▀ : ▄▄▄ ?   ▀▀▀   ( █ ▀▄ ) ▄▀ █ [ █ █  ]  █ █ \\  ▀▄▀▄ / ▄▀▄▀  - ▀▀▀▀▀ @ █ █▄▄▄█ ',
			'0 █ ▀▀▀ █ 1 █▀ ▀█ 2 █ ▀▀▀▀█ 3 █▀▀▀▀ █ 4     █ █ 5 █ ▀▀▀ █ 6 █ ▀▀▀ █ 7  █ █    8 █ ▀▀▀ █ 9 █▀▀▀▀ █ . █▀█ , █▀█ ! █▀█ : █▄█ ?   █▀█   (  █ █ ) █ █  [ █ ▀█ ] █▀ █ \\   █ █ / █ █   -       @ ▀▄▄▄▄▄▀ ',
			'0  ▀▀▀▀▀  1 ▀▀▀▀▀ 2 ▀▀▀▀▀▀▀ 3 ▀▀▀▀▀▀  4     ▀▀▀ 5  ▀▀▀▀▀  6  ▀▀▀▀▀  7  ▀▀▀    8  ▀▀▀▀▀  9  ▀▀▀▀▀  . ▀▀▀ , ▀▀  ! ▀▀▀ :     ?   ▀▀▀   (   ▀▀ ) ▀▀   [ ▀▀▀▀ ] ▀▀▀▀ \\   ▀▀▀ / ▀▀▀   -       @         ' ) },
	rr = function*( s, i ) { for( let c of s.toUpperCase() ) yield c === ' ' ? '  ' : sc[ c ][ i ]; },
	rs = function*( s ) { s = s.toUpperCase(); for( let i = 0 ; i < 6 ; i++ ) yield [ ...rr( s, i ) ].join( ' ' ); },
	sn = n => Uint8Array.from( { length: n }, ( _, i ) => ( ( ( Math.sin( ( Math.PI * 2 ) * ( ( i / n ) + 0.75 ) ) + 1 ) * 255 ) + 1 ) >> 1 ),
	s1 = sn( 256 ),
	cb = async( a, s, o = {} ) => {
		await w( '\n'.repeat( s.length + 1 ), `\x1b[${s.length + 1}F`, '\x1b7' ); s = cs( ...s );
		for( let l = a.length, i = l, n = 0 ; !o.c ; i = ( i + 1 ) % l ) n = await w8( 100, n ), await w( '\x1b8', s.replace( /(\d+):(\d+)/g, ( m, y, x ) => a.at( ( i + parseInt( y ) + s1[ ( 45 + parseInt( x ) ) & 0xff ] ) % l ) ), '\x1b[0m\x1b[2000G' );
		await w( '\x1b8\x1b[0m\x1b[0J' ); };

export const
	xtitle = ( s, ...a ) => { const o = {}, p = cb( a, [ ...rs( s ) ], o ); return () => ( ( o.c = true ), p ); },
	xcolors = ca;
