import { SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, EXPORTED, RESOLVE, RESOLVING, INJECTING, REJECTED, RESOLVED, SETTLED } from '../../events.mjs';
import settled from './settled.mjs';
import { xwriteln, xtermify, xlen, term } from '@jrapp/xtermify';

const
	{ log } = console,
	STYLES = [
		'<R10>[<#111>{@}</0>]</R>',
		' <#363>{@}</0>',
		' {@}',
		'(<#ac6>{@}</0>)' ],
	MODULE = 'ioc',
	EVENT = {
		[ SCANNING ]: ( a ) => write( MODULE, 'scanning', a ),
		[ IMPORTING ]: ( p ) => write( MODULE, 'importing', p ),
		[ REGISTERING ]: ( n, b, l ) => write( MODULE, 'register', n, items( b ) ),
		[ BUILDING ]: ( a ) => write( MODULE, 'building', a.join( ', ' ) ),
		[ INCLUDING ]: ( { n, type } ) => write( MODULE, 'include', n, items( [ type ] ) ),
		[ EXPORTED ]: ( a, i ) => write( MODULE, 'exported', a, `${i}` ),
		[ RESOLVE ]: ( { n } ) => write( MODULE, 'resolve', n ),
		[ RESOLVING ]: ( o ) => write( MODULE, 'resolving', o.n, items( o.d?.map( e => e.map?.( i => i.n ) ?? e.n ).flat() ?? [] ) ),
		[ INJECTING ]: ( { n } ) => write( MODULE, 'injecting', n ),
		[ REJECTED ]: ( { n }, e ) => write( MODULE, 'rejected', n, e?.message ?? e ),
		[ RESOLVED ]: ( { n }, ms ) => write( MODULE, 'resolved', n, `${ms} ms` ),
		[ SETTLED ]: settled },
	items = a => a.length ? ` ${a.join( ', ' )} ` : '',
	write = ( ...a ) => xwriteln( ...a.map( ( v, i ) => STYLES[ i ].replace( /\{@\}/g, () => v.shift?.() ?? v ) ) );

export default ( i, ...a ) => EVENT[ i ]?.( ...a );
