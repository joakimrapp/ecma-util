


const
	find_value_json									= /(?<json>[[{][ ]*(?:(?:'(?:[^']+|'')*'|"(?:[^"]*|(?<=\\)")*"|null|true|false|-?\d+(?:\.\d+)?)[ ]*(?:[,][ ]*(?![ }\]]))?)*[}\]])/,
	find_value_single_quote					= /'(?<single>(?:[^']+|'')*)'/,
	find_value_double_quote					= /"(?<double>(?:[^"]*|(?<=\\)")*)"/,
	find_value_block_scalar					= /(?<style>[|>])(?<chomping>[+-])?\d*[ ]*(?<block>[^\n]*(?:\n(?:\2\4\4[ ]+[^\n]+|[ ]*(?=[\n])))*)/,
	find_value_plain_flow						= /(?<plain>(?:[^\n#: ]+[ ]*|[:]+(?![: \n])|(?<![# \n])[#]+)+(?<multiline>(?:\n\2\4\4[ ]+[^\n]+)+)?)/,
	find_values_joined							= [ find_value_json, find_value_single_quote, find_value_double_quote, find_value_block_scalar, find_value_plain_flow ].map( a => a.source ).join( '|' ),
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
