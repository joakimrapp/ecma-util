import { isFn } from '@jrapp/is-type';

export default function*( i, f = this ) {
	if( isFn( f ) )
		for( let a of i ) {
			a = f( a );
			if( a != null )
				yield a; }
	else
		for( let a of i )
			if( a != null )
				yield a;
} 
