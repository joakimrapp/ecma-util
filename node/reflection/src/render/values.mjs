import { isNumber, isString } from '@jrapp/is';

const
	join = a => a.length ? `[ ${a.join( ', ' )} ]` : '[]';

export const
	any = ( ...f ) => ( a ) => { for( let i of f ) if( ( i = i( a ) ) != null ) return i; throw new Error( `invalid: ${a}` ); },
	map = ( ...f ) => ( a ) => join( a.map( ( e, i ) => f[ i ]( e ) ) ),
	num = ( a ) => { if( isNumber( a ) ) return a; },
	str = ( a ) => { if( isString( a ) ) return `'${a.replace( /(?=')/g, '\\' )}'`; },
	ref = ( a ) => { if( /^(?!\d)\w+$/.test( a ) ) return a; },
	arr = ( f ) => ( a ) => join( a.map( i => f( i ) ) );
