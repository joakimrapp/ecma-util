import { isIterable } from '@jrapp/is';

const
	listeners = [],
	{ log } = console,
	enableType = a => emit[ a ] ??= emit.bind( listeners, a ),
	disableType = a => delete emit[ a ];

export function emit() {
	for( let f of this )
		try { f( ...arguments ); }
		catch( e ) { log( e ); } }

export function enable() {
	for( let a of arguments )
		isIterable( a ) ? enable( ...a ) : enableType( a ); }

export function disable() {
	for( let a of arguments )
		isIterable( a ) ? disable( ...a ) : disableType( a ); }

export function listen() {
	listeners.push( ...arguments ); }
