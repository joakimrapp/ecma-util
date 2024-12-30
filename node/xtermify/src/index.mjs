import { int, num } from './parse.mjs';
import { len, align, term, R, X, H, write, sleep } from './util.mjs';
import { esc, csi, osc, FF, LF, SI, SO, BS, DEL, BEL } from './ascii.mjs';
import { rap, parse as sgr, Grad } from './sgr.mjs';
import { xtitle, xcolors } from './title.mjs';


const
	w50 = a => int( a ) ?? ~~( term.w / 2 ),
	progress = ( sc, l, lc, rc ) => { return [ csi( '?25l' ), lc, sc.slice( 0, l ), rc, sc.slice( l ) ].join``; },
	{ replace } = [
		X.s( /(R|C|L)(\d+)>(.*?)<\/\2?/g, a => align[ a ], int, null, ( f, w, s ) => f( s, w - len( s ) ) ),
		X.s( /double>(.*?)<\/double/, null, s => [ esc( 7 ), esc( '#3' ), s, '\n', esc( 8 ), csi( '1B' ), esc( '#4' ), s ].join`` ),
		X.s( /progress\s+(\d+)\s+(\d+)(?:\s+(\d+))?(?:\s+([^>]+))>(.*?)<\/([^>]+)?/, num, num, w50, sgr, null, sgr, ( t, c, w, lc, s, rc ) => ( c >= t ) ? [ '?25h', '0K' ].map( csi ).join`` : progress( align.C( s, w - len( s ) ), ~~( ( ( c / t ) ) * w ), lc, rc ) )
	].reduce( ( o, a ) => o.add( a ), new R( [
		X.g()
			.v( /ff|form feed|new page/, FF ).v( /lf|line feed|new line/, LF ).v( /shift/, SI ).v( /\/shift/, SO ).v( /bs|back space/, BS ).v( /delete/, DEL )
			.v( /home|<<</, csi( 'H' ) ).v( /back|<</, csi( 'G' ) ).v( /clear screen/, csi( '2J' ) ).v( /clear row/, csi( '2K' ) ).v( /clear/, csi( '0K' ) ).v( /soft reset/, csi( '!p' ) )
			.v( /</, esc( 6 ) ).v( />/, esc( 9 ) ).v( /save/, esc( 7 ) ).v( /load/, esc( 8 ) ).v( /hard reset/, esc( 'c' ) ).v( /enter/, esc( 'E' ) ),
		X.s( ...rap ),
		X.g().i( /(\/)?/, a => ( a != null ) ? 1 : 0 ).f( ( i, a ) => csi( a[ i ] ) )
			.v( /clean buffer/, '?1049h', '?1049l' ).v( /alt buffer/, '?1047h', '?1047l' ).v( /invert/, '?5h', '?5l' ).v( /hide/, '?25l', '?25h' ).v( /update/, [ esc( 7 ), csi( '0K' ) ].join``, esc( 8 ) )
			.v( /minimize/, '2t', '1t' ).v( /maximize/, '9;1t', '9;0t' ).v( /stack/, '5t', '6t' ).v( /full screen/, '10;1t', '10;0t' ).v( /push label/, '22:0t', '23:0t' ),
		X.g().a( /(?:\s+(\d+))?/, int ).f( ( v, ...a ) => csi( `${a.join( ';' )}${v}` ) )
			.v( /up/, 'A' ).v( /down/, 'B' ).v( /left/, 'C' ).v( /right/, 'D' ).v( /line/, 'd' ).v( /col/, 'G' ).v( /ins line/, 'L' ).v( /ins/, '@' )
			.v( /del line/, 'M' ).v( /del/, 'P' ).v( /clear chars/, 'X' ).v( /prev soft/, 'F' ).v( /next soft/, 'E' ).v( /scroll up/, 'S' ).v( /scroll down/, 'T' ),
		X.g().a( /\s+(\d+)/, int ).a( /\s+(\d+)/, int ).f( ( v, ...a ) => csi( `${a.join( ';' )}${v}` ) )
			.v( /to|pos/, 'H' ),
		X.s( /title>(.*?)<\/title/, a => `2;${a}${BEL}`, v => osc( v ) ) ].reduce( ( o, a ) => o.add( a ), new R() ) ) );

export { xtitle, xcolors, H, Grad, sleep, term };
export const
	xlen = s => len( xtermify( s ) ),
	xtermify = s => `${replace( s )}\x1b[0m`,
	xwrite = ( ...a ) => new Promise( f => write( xtermify( a.join`` ), f ) ),
	xwriteln = ( ...a ) => new Promise( f => write( `${xtermify( a.join`` )}\n`, f ) );


// xwriteln( '<double><b>EIAC</double>' );
//
//

// const tit = xtitle( 'joakim.rappext@delaval.com', ...xcolors( 1, 0, 0 ), ...xcolors( 5, 1, 0 ), ...xcolors( 5, 5, 1 ), ...xcolors( -1, -1, 5 ), ...xcolors( 0, 0, -1 ) );
//
// setTimeout( () => tit(), 6000 );
