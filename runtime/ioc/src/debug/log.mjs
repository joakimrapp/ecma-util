import { TRANSIENT, SINGLETON } from '../constants.mjs';
import { SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, RESOLVE, RESOLVING, INJECTING, REJECTED, RESOLVED, SETTLED } from './events.mjs';

import { xwriteln, xtermify, xlen, term } from '@jrapp/xtermify';

const
	{ log } = console,
	sp = i => ' '.repeat( i );
const o = {
	[ SETTLED ]: ( name, t0, t1, ri ) => {
		const
			t = t1 - t0,
			W = term.w >> 1,
			V = i => Math.round( ( i - t0 ) / t * W ),
			M = Math.max.bind( Math );
		ri = ri
			.filter( ( [ { l } ] ) => l !== TRANSIENT )
			.map( ( [ a, l, e, r, tc, ti, tr ] ) => [ `<#${a.l === SINGLETON ? 'aaa' : 'fff'}>${a.type}</0>`, `${sp( l )}<#${e ? 'f77' : '3f3' }>${a.n}</0>(${r.join( ',' )})`, ( ti - t0 ).toString(), ( tr - ti ).toString(), V( ti ), V( tr ), a.l ] );
		const
			[ w0, w1, w2, w3 ] = ri.reduce( ( ma, ia ) => ma.map( ( a, i ) => M( a, xlen( ia[ i ] ) ) ), [ 0, 0, 0, 0 ] );
		ri = ri.map( ( [ t, n, msi, msr, i, r, e, l ] ) => xtermify( `<!#444> </0> <R${w0}>${t}</R> <!#444> </0> <L${w1}>${n}</L> <!#444> </0> <R${w2}><#aa0>${msi}</0></R> ms <!#021>${' '.repeat( i )}</0><!#eff>${' '.repeat( r - i )}</0><!#354>${' '.repeat( W - r )}</0> <R${w3}><#aa0>${msr}</0></R> ms <!#444> </0>` ) );
		const
			fw = Math.max( ...ri.map( i => xlen( i ) ) ),
			title = xtermify( ` <#666>ioc.resolve( <#0ff><b>${name}</b><#666> )</0> ` ),
			rest = fw - xlen( title ),
			left = rest >> 1;
		xwriteln( `<#444>${'▄'.repeat( left )}</0>${title}<#444>${'▄'.repeat( rest - left )}</0>` );
		for( let row of ri ) xwriteln( row );
		const right = xtermify( ` <#444>time</0> <#fff>${t}</0> <#444>ms</0> ` ), rrest = fw - xlen( right );
		xwriteln( `<#000><!#444>${'▄'.repeat( rrest - 10 )}</0>${right}<#000><!#444>${'▄'.repeat( 10 )}</0>` );
		xwriteln( term.w );
	}
};

const
	service = o => o.n,
	write = ( a, b ) => xwriteln( `<#363>${a}</0> <#ac6>${b}</0>` ),
	log3 = ( s0, s1, s2 ) => xwriteln( `<#111><R10>${s0}</R>.</0><#363>${s1}( </0><#ac6>${s2} <#363>)</0>` );

export default ( i, ...a ) => { switch( i ) {
	case SCANNING:			log( 'SCANNING', ...a ); break;
	case IMPORTING:			log( 'IMPORTING', ...a ); break;
	case REGISTERING:		log3( 'ioc', 'register', service( ...a ) ); break;
	case BUILDING:			log3( 'ioc', 'building', a.join( ', ' ) ); break;
	case INCLUDING:			log3( 'ioc', 'include', service( ...a ) ); break;
	case RESOLVE:				log3( 'ioc', 'resolve', service( ...a ) ); break;
	case RESOLVING:			log3( 'ioc', 'resolving', service( ...a ) ); break;
	case INJECTING:			log3( 'ioc', 'injecting', service( ...a ) ); break;
	case REJECTED:			log3( 'ioc', 'rejected', service( ...a ) ); break;
	case RESOLVED:			log3( 'ioc', 'resolved', service( ...a ) ); break;
	case SETTLED:				o[ SETTLED ]( ...a ); break;
} };
