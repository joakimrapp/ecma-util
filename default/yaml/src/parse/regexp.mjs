const
	pre_array												= [ /(?<=\n([ ]*)[^ -][^\n]*)(?=\n\1[-])(\n\1[- ][^\n]*)*/g, ( m, i, d ) => m.replace( /\n/g, '\n  ' ) ],
	pre_indent											= [ /(?<=\n(?:\t| )*)\t/g, '  ' ];

const
	find_value_primitive						=	/(?<primitive>(?:null|true|false|-?(?:[1-9]|0(?=\.]))\d*(?:\.\d+)?)[ ]*(?=[#\n]))/,
	find_value_json									= /(?<json>[[{][ ]*(?:(?:'(?:[^']+|'')*'|"(?:[^"]*|(?<=\\)")*"|null|true|false|-?\d+(?:\.\d+)?)[ ]*(?:[,][ ]*(?![ }\]]))?)*[}\]])/,
	find_value_single_quote					= /'(?<single>(?:[^']+|'')*)'/,
	find_value_double_quote					= /"(?<double>(?:[^"]*|(?<=\\)")*)"/,
	find_value_block_scalar					= /(?<style>[|>])(?<chomping>[+-])?\d*[ ]*(?<block>[^\n]*(?:\n(?:\2\4\4[ ]+[^\n]+|[ ]*(?=[\n])))*)/,
	find_value_plain_flow						= /(?<plain>(?:[^\n#: ]+[ ]*|[:]+(?![: \n])|(?<![# \n])[#]+)+(?<multiline>(?:\n\2\4\4[ ]+[^\n]+)+)?)/,
	find_values_joined							= [ find_value_primitive, find_value_json, find_value_single_quote, find_value_double_quote, find_value_block_scalar, find_value_plain_flow ].map( a => a.source ).join( '|' ),
	find_pre_void										= /(?<=^|\n)(?<pre>(?:[ ]*\n|[ ]*[#][^\n]*\n)*)/,
	find_indent											= /(?<indent>[ ]*)/,
	find_array											= /(?<array>-)?([ ]?)[ ]*/,
	find_key												= /(?<key>(?:'(?<k1>(?:[^'\n]|'')*)'|"(?<k2>(?:[^"]*|(?<=\\)")*)"|(?<k0>(?:[ ](?!#)|:(?![ \n])|[^\n :])*))[:](?:[ ]+|(?=\n)))?(?:[!](?<fn>\w+)(?=[ \n])[ ]*)?/,
	find_value											= /(?<value>(?:)[ ]*)?/.source.replace( /(?<=\(\?:)(?=\))/, find_values_joined ),
	find_comment										= /(?<com>[#][^\n]*)?/,
	find_error											= /(?<error>[^\n]+)?(?:\n|$)/,
	find														= new RegExp( [ find_pre_void, find_indent, find_array, find_key, find_value, find_comment, find_error ].map( a => a.source ?? a ).join``, 'gs' );

const
	post_value_single_quote					= [ /('')|[ ]*\n(\n)[ ]*/g, ( m, q, n ) => q ? '\'' : n != null ? '\n' : ' ' ],
	post_value_double_quote					= [ /(\\")|(\\\n)|\\n|[ ]*\n\n[ ]*/g, ( m, q, e ) => q != null ? '"' : e != null ? '' : '\n' ],
	post_value_block_scalar					= [ /^[ ]*\n[ ]*|[ ]+(?=\n)|(?<=^[^\n]*[\n]([ ]+).*?)\1/sg, '' ],
	post_value_block_folded					= [ /\n(\n)?(?=\s*[^\n])/g, ( m, a ) => a != null ? '\n' : ' ' ],
	post_value_json									= [ /'((?:[^'\n]|'')*)'/g, ( m, c ) => JSON.stringify( c.replace( ...post_value_single_quote ) ) ],
	post_value_plain_flow_multiline	= [ /^[\n ]+|[ ]+$|((?<=[^\n])[ ]*\n[ ]*(?=[^\n]))|(?<=[^\n])[ ]*\n[ ]*|([ ]*\n[ ]*)/g, ( m, s, n ) => s != null ? ' ' : n != null ? '\\n' : '' ],
	post_value_block_clip						= [ /(?<=[^\s])\s*(?=$)/, '\n' ],
	post_value_block_strip					= [ /(?<=[^\s])\s*(?=$)/, '' ];

export const
	get_string = ( single_quote, double_quote, plain, multiline ) =>
		plain != null ? multiline == null ? plain : plain.replace( ...post_value_plain_flow_multiline ) : ( single_quote?.replace( ...post_value_single_quote ) ?? double_quote?.replace( ...post_value_double_quote ) ),
	get_block = ( value, style, chomping ) =>
		( ( chomping === '+' ) || ( value = chomping === '-' ? value.replace( ...post_value_block_strip ) : value.replace( ...post_value_block_clip ) ), style === '|' ? value : value.replace( ...post_value_block_folded ) );

export default function*( yaml ) {
	for( let { index, input, groups: { error, indent: { length: i } = {}, ...o } } of yaml.replace( ...pre_array ).replace( ...pre_indent ).matchAll( find ) )
		if( error != null ) throw new Error( `invalid syntax '${error}' on row ${input.slice( 0, index ).match( /^|\n/g )?.length ?? 1}` );
		else {
			const { array, key, fn, value, primitive, json, block, style, chomping, single, double, plain, multiline } = o, a = { i, a: array != null };
			if( key != null ) a.k = get_string( o.k1, o.k2, o.k0 );
			if( fn != null ) a.f = `Fn::${o.fn}`;
			if( value != null )
				if( ( primitive ?? json ) != null ) a.v = JSON.parse( primitive ?? json.replace( ...post_value_json ) );
				else if( block != null ) a.v = get_block( block.replace( ...post_value_block_scalar ), style, chomping );
				else a.v = get_string( single, double, plain, multiline );
			yield a;
		} }
