import suite from './index.mjs';
import { isArrow, isFunction, isClass, isAsync, isGenerator, isAsyncGenerator } from '../src/fn.mjs';

suite( 'function types', {
	arrow: () => {},
	function: function() {},
	class: class {},
	async: async function() {},
	generator: function*() {},
	asyncGenerator: async function*() {}
}, async tests => {
	await tests( 'isArrow', isArrow, 'arrow' );
	await tests( 'isFunction', isFunction, 'function' );
	await tests( 'isClass', isClass, 'class' );
	await tests( 'isAsync', isAsync, 'async' );
	await tests( 'isGenerator', isGenerator, 'generator' );
	await tests( 'isAsyncGenerator', isAsyncGenerator, 'asyncGenerator' );
} );
