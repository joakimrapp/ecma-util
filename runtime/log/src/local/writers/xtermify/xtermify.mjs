import { Timer } from '@jrapp/humanify';
import { xtitle, xcolors, xwrite, xwriteln, H, Grad } from '@jrapp/xtermify';

const
	timer = Timer(),
	g = Grad.default( '#465' ), fg = Grad.default( '#f32' ),
	h = H( [ /(?<![\w])(?:\.\/|\/|https?:\/\/)[\w-\/\.]+(?![\w])/g, '<#3a9afa>' ], [ /(?<![\w-])\d+(?:\.\d+)?(?![\w])/g, '<#fb0>' ] ),
	time = ( reduced_xterm ) => reduced_xterm ? ` <#243>${timer()}`.padEnd( 20, ' ' ) : g.r( ` <#243>${timer()}`.padEnd( 20, ' ' ) ),
	schemes = [
		[ [ 1, 0, 0 ], [ 5, 1, 0 ], [ 5, 5, 1 ], [ -1, -1, 5 ], [ 0, 0, -1 ] ],
		[ [ 1, 0, 0 ], [ 5, 1, 0 ], [ 5, 5, 1 ], [ 5, 5, -1 ], [ 5, -1, 0 ], [ -1, 0, 0 ] ] ],
	get_index = ( { length } ) => ~~( Math.random() * length ),
	get_scheme = a => schemes[ a ?? get_index( schemes ) ],
	get_colors = a => get_scheme( a ).map( i => [ ...xcolors( ...i ) ] ).flat(),
	write = ( nl, ...a ) => nl ? xwriteln( ...a ) : xwrite( ...a );

export default class {
	constructor( reduced_xterm ) { this.reduced_xterm = reduced_xterm; this.clear = reduced_xterm ? '' : '<back><clear>'; }
	async write( type, s ) { switch( type ) {
		case 'FAIL': await write( true, this.clear, time( this.reduced_xterm ), '</0><C8><b><!#f32><#000> FAIL </0></C><#FFF>', fg.l( ` ${s}` ) ); break;
		case 'WARN': await write( true, this.clear, time( this.reduced_xterm ), '</0><C8><b><!#fd0><#000> WARN </0></C> ', h( s ) ); break;
		case 'INFO': await write( true, this.clear, time( this.reduced_xterm ), '</0><C8><b><#afa><!#000> INFO </0></C> ', h( s ) ); break;
		case 'DONE': await write( true, this.clear, time( this.reduced_xterm ), '</0><C8><#784><!#000> DONE </0></C> ', h( s ), '</0>' ); break;
		case 'DEBUG': await write( true, this.clear, time( this.reduced_xterm ), '</0><C8><b><#777><!#000> info </0></C> ', h( s ) ); break;
	} }
	async progress( t, i, w = 80, f ) {
		if( !this.reduced_xterm ) await xwrite( `<update> <progress ${t} ${i} ${w} !#78f #fff>${f ? f( i ) : i} / ${f ? f( t ) : t}</!#333 #fff></0></update>` );
		else if( !this.last ) this.last = [ Date.now(), i ];
		else {
			const sec = ( Date.now() - this.last[ 0 ] ) / 1000;
			if( sec >= 1 ) {
				const
					ic = f ? f( i ) : i,
					it = f ? f( t ) : t,
					is = ( i - this.last[ 1 ] ) / sec,
					sl = ( t - i ) / is;
				await this.write( 'DEBUG', `completed ${ic}/${it}, estimated time remaining: ${Math.ceil( sl )} seconds (${~~is}/s)` );
				this.last = [ Date.now(), i, ];
			}
		}
	}
	async update( type, s, ...a ) { switch( type ) {
		case 'TASK': this.last = null; await write( this.reduced_xterm, this.clear, time( this.reduced_xterm ), '</0><C8><#78f><!#000> TASK </0></C> ', h( s ) ); break;
		case 'PROG': await this.progress( s, ...a ); break;
		case 'TITLE': if( !this.reduced_xterm ) { await xwriteln(); xtitle( s, ...get_colors() ); } break;
	} } };
