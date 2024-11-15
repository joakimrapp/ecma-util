export default function*( a ) {
	for( let e of a )
		if( e?.[ 1 ] != null )
			yield e;
}
