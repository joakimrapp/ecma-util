export const
	int = a => { if( a != null ) return parseInt( a ); },
	num = a => { if( a != null ) return parseFloat( a ); },
	hex = a => { if( a != null ) return parseInt( a, 16 ); },
	fermat_number = a => ( ( 2n ** ( 1n << BigInt( +a.match( /(?<=^F)\d+$/ )?.at( 0 ) ) ) ) ) + 1n;
