import { isFn, isClass } from '../is/index.mjs';
import stringify from './stringify.mjs';

const
	reGetIsClass = /^\s*class\W/,
	reGetCtorArgs = /(?<=constructor\s*\()(?!.*constructor).*?(?=\s*\)\s*{)/,
	reGetFnArgs = /(?<=^\s*(?:async(?!\w)\s*)?)\w+(?=\s*=>)|(?<=^[^(]*\(\s*).*?(?=\s*\)\s*(?:{|=>))/,
	reGetArgs = /(\w+)(?:\s*:\s*(?:({)|\w+))?|({)|(})|(\(|(\)))/g,
	getIsClass = a => isFn( a ) ? isClass( a ) : reGetIsClass.test( a ),
	getParsable = a => isFn( a ) ? stringify( a ) : a,
	getCtorArgs = a => getParsable( a ).match( reGetCtorArgs )?.[ 0 ],
	getFnArgs = a => getParsable( a ).match( reGetFnArgs )?.[ 0 ],
	parseArgs = a => [ ...getArgs( a ) ];

function *getArgs( s ) {
	let a, l, pl = 0;
	for( let [ , n, k, cb, ce, p, pe ] of s.matchAll( reGetArgs ) )
		if( p != null ) pl += ( pe != null ) ? -1 : 1;
		else if( !pl )
			if( cb != null ) ( a = [], l = [] );
			else if( n != null )
				if( l ) ( k != null ) ? l.push( n ) : a.push( [ ...l, n ].join( '.' ) );
				else yield n;
			else if( ( ce != null ) && ( l.pop() == null ) ) yield ( l = undefined, a ); }

export default a => parseArgs( getIsClass( a ) ? getCtorArgs( a ) : getFnArgs( a ) );
