import globals from 'globals';

const
	{ node } = globals,
	languageOptions = {
		ecmaVersion: 2022,
		sourceType: 'module',
		globals: { ...node } },
	files = [ '**/*.mjs' ],
	ignores = [ 'node_modules/**', '**/*.skip/**', '**/*.skip.*', '**/*.json.mjs' ],
	rules = {
		'no-unused-vars': 0,
		'no-fallthrough': 0,
		'getter-return': 0,
		'no-undef': 'error',
		'no-var': 'error',
		'no-eval': 'error',
		'no-irregular-whitespace': 'error',
		'no-control-regex': 0,
		'no-console': 'error',
		'quotes': [ 'error', 'single' ],
		'indent': [ 'error', 'tab', { SwitchCase: 1 } ],
		'space-before-function-paren': [ 'error', 'never' ],
		'padded-blocks': [ 'error', 'never' ],
		'semi': [ 'error', 'always' ],
		'space-in-parens': [ 'error', 'always', { exceptions: [ 'empty' ] } ],
		'no-trailing-spaces': [ 'error' ],
		'no-mixed-spaces-and-tabs': [ 'error' ],
		'space-infix-ops': [ 'error' ],
		'comma-spacing': [ 'error', { before: false, after: true } ] };

export default [
	{ ignores },
	{ files, languageOptions, rules }
];
