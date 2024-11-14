import { isArray, isPrimitive } from '@jrapp/is-type';

const
	isValue = a => isPrimitive( a ) || isArray( a );

function merge( o, a ) {
	for( let k in a )
		if( a[ k ] != null )
			o[ k ] = get( o[ k ], a[ k ] );
	return o;
}

function get( o, a ) {
	return isValue( a ) ? a : merge( isValue( o ) ? {} : o, a );
}

export default function() {
	let o = {};
	for( let a of arguments )
		if( a != null )
			o = get( o, a );
	return o;
}
