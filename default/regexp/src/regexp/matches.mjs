import { PROTOTYPE, VALUE } from '@jrapp/object';
import { MATCH_ALL } from '#symbols';

const
	{ [ MATCH_ALL ]: matches } = RegExp[ PROTOTYPE ];

export default { [ VALUE ]: matches };
