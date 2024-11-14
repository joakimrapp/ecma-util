const
	re_resolves = /(?<=ioc\s*\.\s*resolve\s*\(\s*(["'])\s*)[\w.]+(?=\1\s*\))/sg,
	re_constructor = /(?<=constructor\s*\()(?!.*constructor).*?(?=\s*\)\s*{)/,
	re_function = /(?<=^\s*(?:async(?!\w)\s*)?)\w+(?=\s*=>)|(?<=^[^(]*\(\s*).*?(?=\s*\)\s*(?:{|=>))/,
	re_args = /(\w+)(?:\s*:\s*(?:({)|\w+))?|({)|(})|(\(|(\)))/g;

function *args( s, a, l, pl = 0 ) {
	for( let [ , n, k, cb, ce, p, pe ] of s.matchAll( re_args ) )
		if( p != null ) pl += ( pe != null ) ? -1 : 1;
		else if( !pl )
			if( cb != null ) ( a = [], l = [] );
			else if( n != null )
				if( l ) ( k != null ) ? l.push( n ) : a.push( [ ...l, n ].join( '.' ) );
				else yield n;
			else if( ( ce != null ) && ( l.pop() == null ) ) yield ( l = undefined, a ); }

export const
	stringify = a => a instanceof Function ? Function.prototype.toString.call( a ) : a,
	cArgs = a => [ ...args( ...stringify( a ).match( re_constructor ) ) ],
	fArgs = a => [ ...args( ...stringify( a ).match( re_function ) ) ],
	resolves = a => stringify( a ).match( re_resolves ) ?? [];
