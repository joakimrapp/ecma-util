import get from './get.mjs';

export default function*( a, f ) {
	for( let e of get( a ) )
		if( ( e[ 1 ] != null ) && ( ( e[ 1 ] = f( ...e ) ) != null ) )
			yield e;
}
