import { isIterable } from '@jrapp/is-type';

let i = 0;

export const
	ALL						= i++,
	SCANNING			= i++,
	IMPORTING			= i++,
	REGISTERING		= i++,
	BUILDING			= i++,
	INCLUDING			= i++,
	EXPORTED			= i++,
	REGISTRY			= [ SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, EXPORTED ],
	RESOLVE				= i++,
	RESOLVING			= i++,
	INJECTING			= i++,
	REJECTED			= i++,
	RESOLVED			= i++,
	SETTLED				= i++,
	CONTAINER			= [ RESOLVE, RESOLVING, INJECTING, REJECTED, RESOLVED, SETTLED ];

const
	listeners = [],
	{ log } = console;

export function emit() { for( let f of this )
	try { f( ...arguments ); }
	catch( e ) { log( e ); } }

export function enable() { for( let a of arguments )
	if( isIterable( a ) ) enable( ...a );
	else if( a === ALL ) enable( ...REGISTRY, ...CONTAINER );
	else emit[ a ] ??= emit.bind( listeners, a ); }
export function disable() { for( let a of arguments )
	if( isIterable( a ) ) disable( ...a );
	else delete emit[ a ]; }

export function listen() {
	listeners.push( ...arguments ); }
