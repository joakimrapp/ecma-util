export const
	encode = ( a ) => Buffer.from( a, 'base64' ),
	decode = ( a, url ) => { a = Buffer.from( a ); return a.toString( url ? 'base64url' : 'base64' ); };
