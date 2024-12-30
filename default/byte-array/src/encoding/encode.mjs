import { encode as hex } from './hex.mjs';
import { encode as base64 } from '#base64';
import { encode as text } from './text.mjs';

export default function( s, a ) { switch( a ) {
	case 'hex': case 'HEX': case 16: case -16: return hex( s, this );
	case 'base64': case 'base64url': case 64: case -64: return base64( s );
	default: return text( s );
} };
