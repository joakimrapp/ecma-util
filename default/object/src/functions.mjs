import { PROTOTYPE, CONSTRUCTOR } from './constants.mjs';
import { defines } from './object.mjs';

export const
	ctor = o => o[ CONSTRUCTOR ],
	proto = o => o[ PROTOTYPE ],
	definesProto = ( o, a ) => ( defines( o[ PROTOTYPE ], a ), o );
