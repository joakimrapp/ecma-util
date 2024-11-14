class ERROR extends Error {
	static extend( n, f ) { n = `${n}_ERROR`; return Object.defineProperty( ( class extends this {
		static get name() { return n; }
		constructor( a ) { super( f instanceof Function ? f( ...arguments ) : a ); }
	} ).prototype, 'name', { value: n } ).constructor; }
	static throw() { throw new this( ...arguments ); } }

export const
	NOT_EXPORTED = ERROR.extend( 'NOT_EXPORTED' ),
	TARGET_EXISTS = ERROR.extend( 'TARGET_EXISTS', ( n, b ) => `${n} for ${b} already exists in registry` ),
	SERVICE_IN_NAMESPACE = ERROR.extend( 'SERVICE_IN_NAMESPACE', ( n, ns ) => `namespace ${ns} and service ${n} not valid` ),
	EVENT_DEFINED = ERROR.extend( 'EVENT_ALREADY_DEFINED', () => 'should not be called more than once' ),



	NOT_SUPPORTED = ERROR.extend( 'NOT_SUPPORTED' ),
	DUPLICATE = ERROR.extend( 'DUPLICATE' ),
	MISSING = ERROR.extend( 'MISSING' ),
	UNREGISTERED = ERROR.extend( 'UNREGISTERED', ( n, a ) => ( a != null ) ? `${a}( ${n} ) not in registry` : `${n} not in registry` ),
	PARSE_FAILED = ERROR.extend( 'PARSE_FAILED' ),
	SCOPE = ERROR.extend( 'SCOPE' ),
	LIFESTYLE = ERROR.extend( 'LIFESTYLE' ),
	CYCLIC = ERROR.extend( 'CYCLIC', ( ...a ) => a.join( ' > ' ) ),
	IMPORT_FAILED = ERROR.extend( 'IMPORT_FAILED' ),
	UNKNOWN = ERROR.extend( 'UNKNOWN' );
