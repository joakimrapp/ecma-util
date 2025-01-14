import { VALUE, PROTOTYPE } from '@jrapp/object';
import { isFn } from '@jrapp/is';

export const
	{ replace } = String[ PROTOTYPE ];

export function fn( ...{ length } ) {
	for( let i = 1, a, v ; a = this[ i ], ( i < length ) && ( a != null ) ; i++ )
		if( v = arguments[ i ], v != null )
			return isFn( a ) ? a( v, ...arguments ) : a;
	const [ f ] = this;
	return isFn( f ) ? f( ...arguments ) : f; }

export default { [ VALUE ]( s, ...a ) {
	return replace.call( s, this, fn.bind( a ) ); } };
