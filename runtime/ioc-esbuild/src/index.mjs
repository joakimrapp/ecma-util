import { build } from 'esbuild';
import options from './options/index.mjs';

async function run() {
	const
		{ errors, warnings, outputFiles } = await build( options( { write: false }, ...arguments ) ),
		problems = [ ...errors, ...warnings ],
		[ problem ] = problems;
	if( problem != null ) throw problem;
	else return outputFiles;
}

// async function purge_external_sources_content( text ) {
// 	const
// 		source_map = JSON.parse( text ),
// 		{ version, sources, sourcesContent, mappings, names } = source_map,
// 		re = /\/node_modules\//,
// 		before = { length: text.length, sources: sources.length },
// 		after = { sources: 0 };
// 	return await log.task( 'purging source map external', () => {
// 		for( let i = 0 ; i < sources.length ; i++ ) {
// 			const source = ( sources[ i ] = sources[ i ].replace( /^(?:..\/)+/, '' ) );
// 			if( re.test( source ) ) sourcesContent[ i ] = '';
// 			else { sourcesContent[ i ] = sourcesContent[ i ].replace( /\/\* MIGRATE BEGIN.*?END \*\//s, '' ); after.sources++; }
// 		}
// 		const text_after = JSON.stringify( source_map );
// 		after.length = text_after.length;
// 		return text_after;
// 	}, () => `eiac-build:esbuild:purge_external_sources_content(): source maps payload reduced from ${bytes( before.length )} to ${bytes( after.length ) }` ); }
//
// export const esbuild = {
// 	async mjs() {
// 		log.debug( 'eiac-build:esbuild:mjs()' );
// 		return ( await run( options( ...arguments ) ) )[ 0 ];
// 	},
// 	async map() {
// 		log.info( `eiac-build:esbuild:map(): ${JSON.stringify( arguments )}` );
// 		const a = await run( options( { sourcemap: 'external', outfile: './ioc.mjs', pure: [ 'Scope', 'Target', 'Singleton' ] }, ...arguments ) );
// 		const src = a.find( ( { path } ) => path.endsWith( '.mjs' ) );
// 		const map = a.find( ( { path } ) => path.endsWith( '.map' ) );
// 		return [ src, await purge_external_sources_content( map.text ) ];
// 	}
// };
//
