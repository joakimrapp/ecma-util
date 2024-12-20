import { TRANSIENT, SINGLETON } from '../../../service/constants.mjs';
import { xwriteln, xtermify, xlen, term } from '@jrapp/xtermify';

const
	sp = i => ' '.repeat( i );
export default ( name, t0, t1, ri ) => {
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
};
