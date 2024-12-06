import create from '@jrapp/error';

export const
	CYCLIC 			= create( 'CYCLIC', ( ...a ) => a.join( ' > ' ) ),
	SCOPE				= create( 'SCOPE', ( n ) => `container input missing: ${n}` ),
	EXPORT			= create( 'EXPORT', ( n, p ) => `injectable not exported: ${n} (${p})` ),
	COMMAND			= create( 'COMMAND', ( c ) => `not permitted in context: ${c}` ),
	MISSING			= create( 'MISSING', ( n, p ) => `not registered: ${p == null ? n : `${p}( ${n} )`}` ),
	AMBIGUOUS 	= create( 'AMBIGUOUS', ( n, b ) => `ambiguous target: ${n} ( ${b.join( ', ' )} )` ),
	COLLISION		= create( 'COLLISION', ( n, ns ) => `service ${n} collides with namespace ${ns}` ),
	ARGUMENT		= create( 'ARGUMENT', ( a, n ) => `transient argument cannot be deconstructed: ${n} ( { ${a} } )` ),
	LIFESTYLE		= create( 'LIFESTYLE', ( n, p ) => p ? `singleton ${p} cannot resolve scoped ${n}` : `${n} cannot be resolved in singleton context` );
