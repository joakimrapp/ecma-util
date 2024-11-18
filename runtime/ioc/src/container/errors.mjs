import create from '@jrapp/error';

export const
	SERVICE_EXISTS 				= create( 'SERVICE_EXISTS', ( n, b = 'default' ) => `ioc service ${n} already exists in registry for target ${b}` ),
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
