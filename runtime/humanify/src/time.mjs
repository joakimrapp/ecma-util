import { uint } from './uint.mjs';

const
	pad = i => `${i}`.padStart( 2, '0' ),
	s1q = ( i, s ) => `${i} ${s}${i === 1 ? '' : 's'}`,
	ums = { ms: 1, short: i => `${i} ms`, long: i => s1q( i, 'millisecond' ) },
	u_s = { ms: 1000, short: i => `${i} s`, long: i => s1q( i, 'second' ) },
	u_m = { ms: u_s.ms * 60, short: i => `${i} min`, long: i => s1q( i, 'minute' ) },
	u_h = { ms: u_m.ms * 60, short: i => s1q( i, 'hr' ), long: i => s1q( i, 'hour' ) },
	u_d = { ms: u_h.ms * 24, short: i => s1q( i, 'day' ), long: i => s1q( i, 'day' ) },
	u_y = { ms: new Date( 0 ).setFullYear( 1971 ), get: ms => new Date( ms ).getFullYear() - 1970, sub: n => new Date( 0 ).setFullYear( 1970 + n ), short: i => s1q( i, 'yr' ), long: i => s1q( uint( i ), 'year' ) },
	get = function*( ms, k, ...a ) { for( let { ms: i, get = ( e => ~~( e / i ) ), sub = ( e => e * i ), [ k ]: s } of a ) if( ms >= i ) { const n = get( ms ); ms -= sub( n ); yield s( n ); } },
	t_l = ( ms, ...a ) => [ ...get( ms, 'long', ...a ) ].join( ', ' ).replace( /,(?=[^,]*$)/, ' and' ),
	t_s = ( ms, ...a ) => [ ...get( ms, 'short', ...a ) ].join( ' ' ),
	dat = ( a = new Date() ) => a instanceof Date ? a : new Date( a );

export const
	milliseconds = ( ms, long ) => {
		if( ms < u_s.ms ) return long ? ums.long( ms ) : ums.short( ms );
		else if( ms === u_s.ms ) return long ? u_s.long( 1 ) : u_s.short( 1 );
		else if( ms < u_m.ms ) { const n = ( ms / u_s.ms ), s = n.toFixed( n < 10 ? 3 : 1 ); return long ? u_s.long( s ) : u_s.short( s ); }
		else if( ms < u_d.ms ) return long ? t_l( ms, u_h, u_m, u_s ) : t_s( ms, u_h, u_m, u_s );
		else if( long ) return t_l( ms, u_y, u_d, u_h, u_m, u_s );
		else if( ms < u_y.ms ) return t_s( ms, u_d, u_h );
		else return t_s( ms, u_y, u_d ); },
	timespan = ( from, to ) => milliseconds( dat( to ) - dat( from ), true ),
	Timer = ( ...a ) => { const d = new Date(); return () => milliseconds( new Date() - d, ...a ); },
	date = d => { d = dat( d ); return [ d.getFullYear(), ...[ d.getMonth() + 1, d.getDate() ].map( pad ) ].join( '-' ); },
	time = d => { d = dat( d ); return [ d.getHours(), d.getMinutes(), d.getSeconds() ].map( pad ).join( ':' ); },
	datetime = d => { d = dat( d ); return `${date( d )} ${time( d )}`; };
