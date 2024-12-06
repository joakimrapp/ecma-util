const
	reserved = [
		'abstract', 'arguments',  'await',        'boolean',			'break',    'byte',       'case',         'catch',    	'char',     'class',      'const',        'continue',
		'debugger', 'default',    'delete',       'do', 					'double',   'else',       'enum',         'eval', 			'export',   'extends',    'false',        'final',
		'finally',  'float',      'for',          'function', 		'goto',     'if',         'implements',   'import',			'in',       'instanceof', 'int',          'interface',
		'let',      'long',       'native',       'new',					'null',     'package',    'private',      'protected',	'public',   'return',     'short',        'static',
		'super',    'switch',     'synchronized', 'this',					'throw',    'throws',     'transient',    'true',				'try',      'typeof',     'var',          'void',
		'volatile', 'while',      'with',         'yield' ],
	dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_';

function *Id() { for( let s, i = 0 ; s = i.toString( 8 ).match( /..?(?=(..)*$)/g ).map( i => dictionary[ parseInt( i, 8 ) ] ).join``, i < 200 ; i++ )
	if( !( /^\d/.test( s ) || reserved.includes( s ) ) ) yield s; }

for( let i of Id() ) console.log( i );
//
// xport const
// 	Services = {
// 		Ids: function*() {
// 			for( let n = 360 ; n++ ; ) {
// 				if( /^(?!if|do|in|\d)\w/.test( n.toString( 36 ) ) ) yield n;
// 			}
// 		},
// 		encode: ( services_values, type ) => {
// 			const ids = Services.Ids();
//
// 			const uns = [ ...new Set( services_values.map( ( { ns = '' } ) => {
// 				ns = ns.split( '.' );
// 				return Array.from( { length: ns.length }, ( _, i ) => ns.slice( 0, i + 1 ).join( '.' ) );
// 			} ).flat() ) ].sort();
//
// 			const nss = new Map( uns.map( ( n, i ) => {
// 				return [ n, [ i, ...n.match( /^(?:(.*?)\.)?(\w+$)/ )?.slice( 1 ) ?? [] ] ];
// 			} ) );
// 			const arg = [
// 				...[ ...nss.values() ].map( ( [ , ns = '', k = '' ] ) => {
// 					return `\n\t\t[ ${[ 1, nss.get( ns ).at( 0 ) ?? 0, `'${k}'` ].join( ', ' )} ]`;
// 				} ),
// 				'\n\t\t[ 2, 0, \'ioc\' ]',
// 				'\n\t\t[ 2, 0, \'log\' ]',
// 				'\n\t\t[ 3, 0, \'event\' ]'
// 			];
// 			const n2i = new Map( [ [ 'ioc', 0 ], [ 'log', 1 ], [ 'event', 2 ] ] );
//
// 			const imp = [ 'import { Services } from \'@delaval/ioc-runtime\';\n', `export { Handler } from '@delaval/ioc-handlers/${type}';\n` ];
//
// 			const encode_params = params => {
// 				return params.length ? `[ ${params.map( e => {
// 					return Array.isArray( e ) ? encode_params( e ) : n2i.get( e );
// 				} ).join( ', ' )} ]` : '[]';
// 			};
// 			const sids = [];
//
// 			for( let { t, k, n, ns = '', s, d, c } of services_values ) {
// 				if( !n2i.has( n ) ) {
// 					const id = ids.next().value;
// 					const sid = id.toString( 36 );
// 					const [ ik, ip ] = s;
//
// 					n2i.set( n, n2i.size );
// 					sids.push( sid );
//
// 					imp.push( `import { ${ik} as ${sid} } from '@delaval/eiac-modules/${ip}';\n` );
//
// 					const ns_id = nss.get( ns ).at( 0 );
// 					const d_ids = encode_params( d );
// 					const arg_value = [ t, ns_id, `'${k}'`, d_ids, sid, ...c ? [ 1 ] : [] ].join( ', ' );
// 					const info = {
// 						type,
// 						params: {
// 							t,
// 							k,
// 							n,
// 							ns,
// 							s,
// 							d,
// 							c
// 						},
// 						ik,
// 						sid,
// 						ip,
// 						ns_id,
// 						d_ids,
// 						arg_value
// 					};
// 					log.debug( `eiac-build:services:encode(): encoding ioc service: ${JSON.stringify( info )}` );
// 					arg.push( `\n\t\t[ ${arg_value} ]` );
// 				}
// 			}
// 			imp.push( `export const\n\tioc = Services.decode(${arg.join( ',' )} );\n` );
// 			return imp.join``;
// 		}
// 	};
//
