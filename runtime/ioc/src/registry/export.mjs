import { ids } from '@jrapp/reflection/generate';

const
	reNs = /^.+?(?=\.\w+$)/;

function *generateAllNs( i ) {
	for( let { n } of i )
		for( ; ( n = n.match( reNs )?.[ 0 ] )?.length ; )
			yield n;
}

const getAllNs = services =>
	[ ...new Set( generateAllNs( services.values() ) ) ].sort();



const test = new Set( [
	'wqd.fwewe.wdqdwe',
	'wqd.fwewe.ddd',
	'eqwfew.ewfwefe.ewqwe',
	'dw',
	'fefef.fefef'
].map( n => ( { n } ) ) );

console.log( getAllNs( test ) );
