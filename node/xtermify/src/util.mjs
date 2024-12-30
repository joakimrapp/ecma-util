export class X {
	static g() { return new this(); }
	static s( re, ...ra ) { const f = ra.pop(); return { re, ra, parse( m ) { return f( ...ra.map( ( e, i ) => e instanceof Function ? e( m[ i ] ) : ( m[ i ] == null ) || ( e == null ) ? m[ i ] : e ) ); } }; }
	#o = { i: [ [], [] ], v: [ [], [] ], a: [ [], [] ] }; #f = ( v => v );
	i( { source: s }, i ) { this.#o.i[ 0 ].push( s ); this.#o.i[ 1 ].push( i ); return this; }
	a( { source: s }, a ) { this.#o.a[ 0 ].push( s ); this.#o.a[ 1 ].push( a ); return this; }
	u( { source: s }, ...a ) { this.#o.v[ 0 ].push( s ); for( let i of a ) this.#o.v[ 1 ].push( i ); return this; }
	v( { source: s }, v, ...a ) { this.#o.v[ 0 ].push( `(${s})` ); this.#o.v[ 1 ].push( a.length ? [ v, ...a ] : v ); return this; }
	f( f ) { this.#f = f; return this; }
	get re() { const { i: [ ir ], v: [ vr ], a: [ ar ] } = this.#o, v = vr.map( i => i ).join( '|' ); return new RegExp( ir.length + ar.length ? `${ir.join``}(?:${v})${ar.join``}` : v ); }
	get ra() { const { i: [ , i ], v: [ , v ], a: [ , a ] } = this.#o; return [ ...i, ...v, ...a ]; }
	get parse() { const { i: [ , i ], v: [ , v ], a: [ , a ] } = this.#o, f = this.#f; return function( m ) {
		const mia = m.slice( 0, i.length ), mva = m.slice( i.length, ...a.length ? [ -a.length ] : [] ), mvi = mva.findIndex( e => e != null ), mvv = v.at( mvi ), maa = m = a.length ? m.slice( -a.length ) : [];
		return f( ...mia.map( ( e, ei ) => i[ ei ]( e ) ), mvv instanceof Function ? mvv( mva.at( mvi ) ) : mvv, ...maa.map( ( e, ei ) => a[ ei ]( e ) ).filter( i => i != null ) ); }; } }

export class R {
	#o; constructor( p ) { this.#o = [ p?.replace ?? p, [], [] ]; }
	add( { re, ra: { length }, parse } ) { const [ , r, a ] = this.#o; r.push( `(${re.source ?? re})` ); a.push( [ length + 1, parse ] ); return this; }
	get replace() {
		const [ p, rs, ra ] = this.#o, r = new RegExp( `<(?:${rs.join( '|' )})>([ ](?=\w))?`, 'g' ), f = ( ...m ) => { let i = 1; for( let [ n, f ] of ra ) if( m[ i ] != null ) { const v = f( m.slice( i + 1 ) ); return v; } else i += n; }, a = [ r, f ];
		return ( p == null ) ? ( s => s.replace( ...a ) ) : ( s => p( s ).replace( ...a ) ); } }

export const
	out = process.stdout,
	write = out.write.bind( out ),
	sleep = ( ...a ) => new Promise( r => setTimeout( r, ...a ) ),
	term = {
		get w() { return out.getWindowSize()?.at( 0 ); },
		get h() { return out.getWindowSize()?.at( 1 ); } },
	len = a => a.replace( /\x1b(?:\w|\[[\d;]*\w)/g, '' ).length,
	pad = a => ' '.repeat( a ),
	align = { R: ( s, n ) => `${pad( n )}${s}`, C: ( s, n, l = ~~( n / 2 ), r = n - l ) => `${pad( l )}${s}${pad( r )}`, L: ( s, n ) => `${s}${pad( n )}` },
	H = ( ...a ) => { a = a.map( ( [ r, s ] ) => [ r, `${s}$&<default>` ] ); return s => { for( let e of a ) s = s.replace( ...e ); return s; }; };
