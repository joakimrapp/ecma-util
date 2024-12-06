import { INJECT, INPUT, NEW, BIND } from '../constants.mjs';
import { SCOPE } from '../errors.mjs';

function INJECT_NEW() {
	return new this( ...arguments ); }

export default ( { t, f } ) => { switch( t ) {
	case INPUT: return { async value( a ) { return a != null ? a : SCOPE.throw( this.n ); } };
	case NEW: return { value: INJECT_NEW.bind( f ) };
	case BIND: return { value: f[ INJECT ].bind( f ) };
	default: return { value: f }; } };
