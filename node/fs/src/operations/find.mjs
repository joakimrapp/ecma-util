import { groupBy } from '@jrapp/object';
import { opendir } from '../util/node.mjs';
import { join, resolve } from '@jrapp/node-path';

const
	re = /^(?:((?:\/|\.\/)?(?:[^*/]+\/)*[^*/]+)\/)?((?<=\/)\*\*\/)?(?:([^/]+)\/)?([^/]+)$/,
	test = a => RegExp.prototype.test.bind( new RegExp( `^${a.replace( /(!)?\((.*?)\)/g, ( m, n, g ) => n ? `(?<!${g})` : `(${g})` ).replace( /\.|(\*)/g, ( m, w ) => w ? '.*?' : '\\.' )}$` ) ),
	path = ( { parentPath, name } ) => join( parentPath, name );

async function *scan( a, dir, file, middlewares ) { for await( const e of ( await opendir( a, { encoding: 'utf8' } ) ) ) switch( true ) {
	case e.isFile(): if( file( e.name ) ) yield middlewares?.reduce( ( a, f ) => a.then?.( f ) ?? f( a ), path( e ) ) ?? path( e ); break;
	case e.isDirectory(): if( dir?.( e.name ) ) yield* scan( path( e ), dir, file, middlewares ); } }

function generate( ...o ) {
	const { f, s } = groupBy( o.map( i => i.dirname ?? i ), i => ( typeof i )[ 0 ] ), [ , p, r, dp, fp ] = resolve( ...s ).match( re );
	return scan( p, r && ( dp ? test( dp ) : () => true ), fp ? test( fp ) : () => true, f ); }

export default async function() { const a = []; for await( let i of generate( ...arguments ) ) a.push( i ); return Promise.all( a ); }
