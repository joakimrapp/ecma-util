import { any, map, num, str, ref, arr, imports } from '@jrapp/reflection/render';

const
	renderService = map( num, num, str, arr( any( arr( num ), num ) ), ref );

export default {
	*sources( path, sources ) {
		for( let [ p, e ] of sources )
			yield imports( e, path, p ); },
	*services( services ) {
		for( let a of services )
			yield `\t${renderService( a )}`; },
	*export( path, sources, services ) {
		yield* this.sources( path, sources );
		yield '\nimport ioc from \'@jrapp/ioc/import\';';
		yield 'export default ioc( [';
		yield [ ...this.services( services ) ].join( ',\n' );
		yield '] );'; },
	container() {
		return [ ...this.export( ...arguments ) ].join( '\n' ); } };
