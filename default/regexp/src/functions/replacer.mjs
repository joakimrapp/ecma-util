import { replace, fn } from '../regexp/replace.mjs';

export default ( re, ...a ) => {
	const args = [ re, fn.bind( a ) ];
	return s => replace.apply( s, args ); };
