import create from '@jrapp/error';

export const
	SERVICE_EXISTS 				= create( 'SERVICE_EXISTS', ( n, b = 'default' ) => `${n} already exists in registry for target ${b}` ),
	SERVICE_MISSING				= create( 'SERVICE_MISSING', n => `${n} not in registry` ),
	TARGETS_MISSING				= create( 'TARGETS_MISSING', ( n, ...a ) => `${n} has no default target and none of the targets: ${a.join( ', ' )}` ),
	DEFAULT_MISSING				= create( 'DEFAULT_MISSING', ( p, n ) => `${p} defines $service '${n}' but does not export a default` ),
	EXPORTS_MISSING				= create( 'EXPORTS_MISSING', ( p, n ) => `${p} defines a service '${n}' but it is not exported` ),
	NAMESPACE_COLLISION		= create( 'NAMESPACE_COLLISION', ( n, ns ) => `service ${n} collides with namespace ${ns}` );
