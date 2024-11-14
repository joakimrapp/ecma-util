import { test, truthy, falsy } from '@jrapp/testing';

export default ( title, values, f ) => {
	test( title, f( async( n, f, a ) => {
		a = new Set( a.split( ',' ) );
		await test( n, async o => {
			for( let [ t, v ] of Object.entries( values ) )
				await o.test( `${n} should ${a.has( t ) ? 'accept' : 'reject'} ${/^[aoueiy]/i.test( t ) ? 'an' : 'a' } ${t}`, a.has( t ) ? () => truthy( f( v ) ) : () => falsy( f( v ) ) );
		} );
	} ) );
};
