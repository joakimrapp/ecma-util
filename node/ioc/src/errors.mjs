import create from '@jrapp/error';

export const
	CYCLIC 			= create( 'CYCLIC', ( ...a ) => a.join( ' > ' ) ),
	SOURCE			= create( 'SOURCE', ( n ) => `source missing: ${n}` ),
	SCOPE				= create( 'SCOPE', ( n ) => `container input missing: ${n}` ),
	INJECTABLE	= create( 'INJECTABLE', ( n ) => `not injectable: ${n}` ),
	EXPORT			= create( 'EXPORT', ( n, p ) => `injectable not exported: ${n} (${p})` ),
	MISSING			= create( 'MISSING', ( n, p ) => `not registered: ${p == null ? n : `${p}( ${n} )`}` ),
	AMBIGUOUS 	= create( 'AMBIGUOUS', ( n, b ) => `ambiguous target: ${n} ( ${b.join( ', ' )} )` ),
	COLLISION		= create( 'COLLISION', ( n, ns = n ) => `service ${n} collides with namespace ${ns}` ),
	ARGUMENT		= create( 'ARGUMENT', ( a, n ) => `transient argument cannot be deconstructed: ${n} ( { ${a} } )` ),
	LIFESTYLE		= create( 'LIFESTYLE', ( n, p ) => p ? `singleton ${p} cannot resolve scoped ${n}` : `${n} cannot be resolved in singleton context` );
