import { TRANSIENT } from '#constants';
import { ARGUMENT, MISSING } from '#errors';
import { isIterable } from '@jrapp/is';
import { defineName } from '@jrapp/object';
import { all } from '@jrapp/iterable';

const
	reNs = /^.+?(?=\.\w+$)/,
	reReplace = /\w+$/,
	replace = ( key, name ) => name.replace( reReplace, key ),
	verify = ( o, n ) => o.l === TRANSIENT ? ARGUMENT.throw( o.n, n ) : o;

function *find( s, services, e, ...a ) { for( let n of e )
	for( let i = n ; ; i = i.match( reNs )?.[ 0 ] ?? MISSING.throw( n, ...a ) )
		if( services.has( i ) ) {
			if( s.size !== s.add( i ).size ) yield verify( services.get( i, ...a ) );
			break; } }

class Arg extends Array {
	static {
		defineName( this, '' ); }
	res( o, c, ...a ) {
		return c.get( o, ...a ); }
	async get( { ns } ) {
		await all( this.filter( ( { n } ) => !( n in ns ) ).map( i => this.res( i, ...arguments ) ) );
		return ns; } }

export default class extends Array {
	static {
		defineName( this, 'dependencies' ); }
	static import( a, d ) {
		if( d )
			return this.from( d, e => isIterable( e ) ? Arg.from( e, i => a.at( i ) ) : a.at( e ) ); }
	static res( s, d, ...a ) {
		return this.from( d, e => isIterable( e ) ? Arg.from( find( new Set, s, e, ...a ) ) : s.get( s.has( e ) ? e : replace( e, ...a ), ...a ) ); }
	get( container, ...a ) {
		return all( this.map( i => i.get?.( container, ...a ) ?? container.get( i, ...a ) ) ); } }
