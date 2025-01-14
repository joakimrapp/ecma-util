import { SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, EXPORTED, ENCODED, RESOLVE, RESOLVING, INJECTING, REJECTED, RESOLVED, SETTLED, DECODED } from '#events';
import settled from './settled.mjs';
import { xwriteln, xtermify, xlen, term } from '@jrapp/xtermify';


const
	{ log } = console,
	STYLES = [
		'<#111><L14>{@}</L><#000><!#333>▌<!#555> <!#333>▐</0>',
		'<#363>{@}</0>',
		' {@}',
		'(<#ac6>{@}</0>)' ],
	MODULE = {
		REGISTRY: 'ioc.registry',
		CONTAINER: 'ioc.container' },
	EVENT = {
		[ SCANNING ]: ( a ) => write( MODULE.REGISTRY, 'scanning', a ),
		[ IMPORTING ]: ( p ) => write( MODULE.REGISTRY, 'importing', p ),
		[ REGISTERING ]: ( n, b, l ) => write( MODULE.REGISTRY, 'register', n, items( b ) ),
		[ BUILDING ]: ( a ) => write( MODULE.REGISTRY, 'building', a.join( ', ' ) ),
		[ INCLUDING ]: ( { n, type } ) => write( MODULE.REGISTRY, 'include', n, items( [ type ] ) ),
		[ ENCODED ]: ( n, i ) => write( MODULE.REGISTRY, 'encoded', n, i ),
		[ DECODED ]: ( n, i ) => write( MODULE.CONTAINER, 'decoded', n, i ),
		[ EXPORTED ]: ( a, i ) => write( MODULE.REGISTRY, 'exported', a, `${i}` ),
		[ RESOLVE ]: ( { n } ) => write( MODULE.CONTAINER, 'resolve', n ),
		[ RESOLVING ]: ( o ) => write( MODULE.CONTAINER, 'resolving', o.n, items( o.d?.map( e => e.map?.( i => i.n ) ?? e.n ).flat() ?? [] ) ),
		[ INJECTING ]: ( { n } ) => write( MODULE.CONTAINER, 'injecting', n ),
		[ REJECTED ]: ( { n }, e ) => write( MODULE.CONTAINER, 'rejected', n, e?.message ?? e ),
		[ RESOLVED ]: ( { n }, ms ) => write( MODULE.CONTAINER, 'resolved', n, `${ms} ms` ),
		[ SETTLED ]: settled },
	items = a => a.length ? ` ${a.join( ', ' )} ` : '',
	write = ( ...a ) => xwriteln( ...a.map( ( v, i ) => STYLES[ i ].replace( /\{@\}/g, () => v.shift?.() ?? v ) ) );

export default ( i, ...a ) => EVENT[ i ]?.( ...a );
