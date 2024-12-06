import R from './index.mjs';
import { listen, enable, ALL } from '../debug/events.mjs';
import out from '../debug/log.mjs';

const { log } = console;
enable( ALL );
listen( out );

const rnd = ( i ) => new Promise( r => setTimeout( r, ~~( Math.random() * 500 ), i ) );

log( await new R()
	.singleton( 'a', () => rnd( 1 ) )
	.service( 'b', ( { a } ) => rnd( a + 1 ) )
	.service( 'x', ( { c } ) => c + 1 )
	.service( 'c', ( { b } ) => rnd( b + 1 ) )
	.service( 's', ( { a, b } ) => rnd( a + b + 1 ) )
	.singleton( 'r', ( { s } ) => rnd( s + 1 ) )
	.scoped( 'd', ( { x, c } ) => rnd( c + 1 ) )
	.singleton( 'e', () => rnd( 1 ) )
	.service( 'f', ( { e } ) => rnd( e + 1 ) )
	.service( 'g', ( { f } ) => rnd( f + 1 ) )
	.service( 'h', ( { g } ) => rnd( g + 1 ) )
	.scoped( 'i', ( { d, h, r } ) => r + d + h )
	.build()
	.container()
	.scope()
	.resolve( 'i', true ) );
