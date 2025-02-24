import create from '@jrapp/error';

export const
	CYCLIC 			= create( 'CYCLIC', ( ...a ) => a.join( ' > ' ) ),
	SOURCE			= create( 'SOURCE', ( n ) => `source missing: ${n}` ),
	SCOPE				= create( 'SCOPE', ( n ) => `container input missing: ${n}` ),
	INJECTABLE	= create( 'INJECTABLE', ( n ) => `not injectable: ${n}` ),
	EXPORT			= create( 'EXPORT', ( n, p ) => `injectable not exported: ${n} (${p})` ),
	MISSING			= create( 'MISSING', ( n, p ) => `not registered: ${p == null ? n : `${p}( ${n} )`}` ),
	AMBIGUOUS 	= create( 'AMBIGUOUS', ( n, b ) => `ambiguous target: ${n} ( ${b.join( ', ' )} )` ),
	COLLISION		= create( 'COLLISION', ( ns, n ) => `service ${n} collides with namespace ${ns}` ),
	ARGUMENT		= create( 'ARGUMENT', ( a, n ) => `transient argument cannot be deconstructed: ${n} ( { ${a} } )` ),
	CONTAINER		= create( 'CONTAINER', ( n, ...a ) => `scoped ${n} cannot resolve in singleton container` ),
	LIFESTYLE		= create( 'LIFESTYLE', ( n, ...a ) => `singleton ${n} cannot resolve scoped ${a.join( ', ' )}` );
