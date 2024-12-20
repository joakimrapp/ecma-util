import { INVOKE, BIND, NEW, LIFE, SINGLETON, SCOPED, INJECT } from './constants.mjs';
import { stringify, parseArgs, isFn, isClass } from '@jrapp/reflection';

const
	IOC = 'ioc',
	reResolves = /(?<=ioc\s*\.\s*resolve\s*\(\s*(["'])\s*)[\w.]+(?=\1\s*\))/sg,
	parse = ( t, f, a, s, d = parseArgs( a ) ) => [ t, f, d, d.includes( IOC ) && stringify( a ).match( reResolves ) || [], ...s ?? [] ];

export default ( l, f, s ) => {
		if( isFn( f?.[ INJECT ] ) ) return parse( BIND | ( l & LIFE ), f, f[ INJECT ], s );
		else if( isFn( f ) ) return parse( ( isClass( f ) ? NEW : INVOKE ) | ( l & LIFE ), f, f, s );
		else return [ ( l & LIFE ) === SINGLETON ? SINGLETON : SCOPED ]; };
