import { SINGLETON } from '#constants';
import { xwriteln, xlen, term } from '@jrapp/xtermify';
import { milliseconds } from '@jrapp/humanify';

const
	sp = i => ' '.repeat( i ),
	sep = '<!#444> </0>',
	col = ( width, align, pad, ...a ) => [ `<${align}${width}>${' '.repeat( pad )}`, ...a, `${' '.repeat( pad )}</${align}>` ].join``;

const
	color = {
		type( lifestyle ) { switch( lifestyle ) { case SINGLETON: return '<#aaa>'; default: return '<#fff>'; } },
		name( error ) { return error ? '<#f77>' : '<#3f3>'; },
		time( time, value = '<#aa0>' ) { return time.replace( /\d+/, `${value}$&</0>` ); } },
	column = {
		type( w, [], [ { l, type } ] ) { return ( w[ 0 ].push( type.length ), [ color.type( l ), type, '</0>' ].join`` ); },
		name( w, [], [ { n }, lvl, err, args ] ) { return ( args = args.join( ',' ), w[ 1 ].push( lvl + n.length + args.length + 2 ), [ sp( lvl ), color.name( err ), n, '</0>', '(', args, ')' ].join`` ); },
		tinj( w, [ tb ], [ {}, , , , , ti,  ] ) { return ( ti = milliseconds( ti - tb ), w[ 2 ].push( ti.length ), color.time( ti ) ); },
		bar1( w, [ tb, , tt ], [ {}, , , , , ti, tr ] ) { return [ tt, ti - tb, tr - ti ]; },
		bar2( w, [ tt, ti, tr ] ) { return [ `<L${w}>`, '<!#021>', sp( ~~( ti / tt * w ) ), '</0><!#eff>', sp( ~~( tr / tt * w ) ), '</0><!#354></L></0>' ].join``; },
		tres( w, [], [ {}, , , , , ti, tr ] ) { return ( tr = milliseconds( tr - ti ), w[ 3 ].push( tr.length ), color.time( tr ) ); } },
	map = {
		*content( w, t, a ) { for( let i of a ) { yield [ column.type( w, t, i ), column.name( w, t, i ), column.tinj( w, t, i ), column.bar1( w, t, i ), column.tres( w, t, i ) ]; } },
		*join( wm, w, [ w0, w1, w2, w4 ], { n }, [ , , tt ], a ) {
			const
				head = [ ' ioc.resolve( ', '<#0ff><b>', n, '</b><#666>', ' ) ' ].join``, headRest = wm - xlen( head ), wHeadL = headRest >> 1,
				foot = ` time ${milliseconds( tt )} `, footRest = wm - foot.length, wHeadR = footRest >> 3, wl = footRest - wHeadR;
			yield [ '<#444>', '▄'.repeat( wHeadL ), '</0><#666>', head, '</0><#444>', '▄'.repeat( headRest - wHeadL ), '</0>' ].join``;
			for( let [ c0, c1, c2, c3, c4 ] of a ) yield [ sep, col( w0, 'R', 1, c0 ), sep, col( w1, 'L', 1, c1 ), sep, col( w2, 'R', 1, c2 ), column.bar2( w, c3 ), col( w4, 'R', 1, c4 ), sep ].join``;
			yield [ '<#000><!#444>', '▄'.repeat( wl ), '</0>', color.time( foot ), '<#000><!#444>', '▄'.repeat( wHeadR ), '</0>' ].join``; } };

export default ( s, tb, te, a ) => {
	let wm = term.w - 10, w = [ [], [], [], [] ], t = [ tb, te, te - tb ], lines = [ ...map.content( w, t, a ) ], widths = w.map( i => Math.max( ...i ) + 2 );
	xwriteln( [ ...map.join( wm, wm - widths.reduce( ( n, i ) => n + i, 4 ), widths, s, t, lines ) ].join( '\n' ) ); };
