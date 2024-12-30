const
	not = [
		'abstract', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if',
		'import', 'in', 'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with', 'let', 'static', 'yield',
		'await', 'enum', 'implements', 'interface', 'package', 'private', 'protected', 'public', 'boolean', 'byte', 'char', 'double', 'final', 'float', 'goto', 'int',
		'long', 'native', 'short', 'synchronized', 'throws', 'transient', 'volatile', 'arguments', 'as', 'async', 'eval', 'from', 'get', 'of', 'set' ],
	dic =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_',
	re = /^[a-zA-Z]/,
	test = a => re.test( a ) && ( !not.includes( a ) );

export default function*f( ...exclude ) {
	exclude = new Set( exclude );
	for( let s, i = 0 ; s = i.toString( 8 ).match( /..?(?=(..)*$)/g ).map( i => dic[ parseInt( i, 8 ) ] ).join`` ; i++ )
		if( test( s ) && ( !exclude.has( s ) ) )
			yield s; }
