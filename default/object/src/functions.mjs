import { PROTOTYPE, CONSTRUCTOR } from './constants.mjs';
import { define, defines } from './object.mjs';

export const
	ctor = o => o[ CONSTRUCTOR ],
	proto = o => o[ PROTOTYPE ],
	definesProto = ( o, a ) => ( defines( o[ PROTOTYPE ], a ), o ),
	defineName = ( o, value ) => define( o, 'name', { value } );
