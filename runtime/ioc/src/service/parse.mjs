import { stringify, parseArgs, isFn, isClass } from '@jrapp/reflection';
import { INJECT, INPUT, BIND, NEW, INVOKE } from '../constants.mjs';
import { EXPORT } from '../errors.mjs';
import { isString } from '@jrapp/is-type';

const
	reResolving = /(?<=ioc\s*\.\s*resolve\s*\(\s*(["'])\s*)[\w.]+(?=\1\s*\))/sg,
	reId = /(?:(.+?)\.)?(\w+)$/;

export const
	getN = ( ns, n ) => ns?.length ? `${ns}.${n}` : n,
	getT = f => isFn( f?.[ INJECT ] ) ? BIND : isFn( f ) ? isClass( f ) ? NEW : INVOKE : INPUT,
	getD = ( f, t ) => ( t !== INPUT ) && parseArgs( t === BIND ? f[ INJECT ] : f ) || [],
	getR = ( f, t, d ) => f && d.includes( 'ioc' ) && stringify( t === BIND ? f[ INJECT ] : f ).match( reResolving ) || [],
	getS = ( p, o ) => ( f, n ) => {
		if( isFn( f ) ) for( let a in o ) if( o[ a ] === f ) return [ f, [ p, a ] ];
		else if( isString( f ) && isFn( o[ f ] ) ) return [ o[ f ], [ p, f ] ];
		else if( f == null ) return [ , [ p ] ];
		EXPORT.throw( n, p ); },
	create = ( n, l, bt, [ f, s ], t = getT( f ), d = getD( f, t ), r = getR( f, t, d ) ) => [ n, bt, l, f, s, t, d, r ],
	id = n => id[ n ] ??= n.match( reId );
