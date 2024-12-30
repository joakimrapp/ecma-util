import { decode as hex } from './hex.mjs';
import { decode as base64 } from '#base64';
import { decode as text } from './text.mjs';

export default function( a, f ) { switch( f ) {
	case 'hex': case 16: return hex( a );
	case 'HEX': case -16: return hex( a, true );
	case 'base64': case 64: return base64( a );
	case 'base64url': case 'url': case -64: return base64( a, true );
	default: return text( a );
} }
