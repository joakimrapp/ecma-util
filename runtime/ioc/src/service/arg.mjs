import { TRANSIENT } from './constants.mjs';
import { ARGUMENT, MISSING } from '#errors';
import { define } from '@jrapp/object';

const
	all = Promise.all.bind( Promise ),
	re = /^.+?(?=\.\w+$)/,
	verify = ( o, n ) => o.l === TRANSIENT ? ARGUMENT.throw( o.n, n ) : o;

function *find( s, services, e, ...a ) { for( let n of e )
	for( let i = n ; ; i = i.match( re )?.[ 0 ] ?? MISSING.throw( n, ...a ) )
		if( services.has( i ) ) {
			if( s.size !== s.add( i ).size ) yield verify( services.get( i, ...a ) );
			break; } }

export default class extends Array { static { define( this, 'name', { value: '' } ); }
	static get( s, a ) { return this.from( a, n => s.get( n ) ); }
	static res() { return this.from( find( new Set, ...arguments ) ); }
	all( c, o, f ) { return all( this.filter( a => !( a.n in o ) ).map( a => c.get( a, f ) ) ).then( () => o ); } }
