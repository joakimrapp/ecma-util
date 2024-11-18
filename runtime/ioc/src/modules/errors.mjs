import create from '@jrapp/error';

export const
	SERVICE_EXISTS 				= create( 'SERVICE_EXISTS', ( n, b = 'default' ) => `${n} already exists in registry for target ${b}` ),
	SERVICE_MISSING				= create( 'SERVICE_MISSING', n => `${n} not in registry` ),
	TARGETS_MISSING				= create( 'TARGETS_MISSING', ( n, ...a ) => `${n} has no default target and none of the targets: ${a.join( ', ' )}` ),
	DEFAULT_MISSING				= create( 'DEFAULT_MISSING', ( p, n ) => `${p} defines $service '${n}' but does not export a default` ),
	EXPORTS_MISSING				= create( 'EXPORTS_MISSING', ( p, n ) => `${p} defines a service '${n}' but it is not exported` ),
	NAMESPACE_COLLISION		= create( 'NAMESPACE_COLLISION', ( n, ns ) => `service ${n} collides with namespace ${ns}` ),


	NOT_EXPORTED 					= create( 'NOT_EXPORTED' ),
	TARGET_EXISTS 				= create( 'TARGET_EXISTS', ( n, b ) => `${n} for ${b} already exists in registry` ),
	SERVICE_IN_NAMESPACE 	= create( 'SERVICE_IN_NAMESPACE', ( n, ns ) => `namespace ${ns} and service ${n} not valid` ),
	EVENT_DEFINED 				= create( 'EVENT_ALREADY_DEFINED', () => 'should not be called more than once' ),
	NOT_SUPPORTED 				= create( 'NOT_SUPPORTED' ),
	DUPLICATE 						= create( 'DUPLICATE' ),
	MISSING 							= create( 'MISSING' ),
	UNREGISTERED 					= create( 'UNREGISTERED', ( n, a ) => ( a != null ) ? `${a}( ${n} ) not in registry` : `${n} not in registry` ),
	PARSE_FAILED 					= create( 'PARSE_FAILED' ),
	SCOPE 								= create( 'SCOPE' ),
	LIFESTYLE 						= create( 'LIFESTYLE' ),
	CYCLIC 								= create( 'CYCLIC', ( ...a ) => a.join( ' > ' ) ),
	IMPORT_FAILED 				= create( 'IMPORT_FAILED' ),
	UNKNOWN 							= create( 'UNKNOWN' );
