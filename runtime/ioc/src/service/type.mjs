import { NAMESPACE, RESERVED, INJECTS, INVOKE, NEW, BIND, LIFE } from './constants.mjs';
import { define, defines } from '@jrapp/object';
import Service from './service.mjs';

const
	lifestyles = 'service|transient|singleton|scoped'.match( /\w+/g ),
	life = t => lifestyles[ t & LIFE ],
	name = t => { switch( t & INJECTS ) {
		case INVOKE: return life( t );
		case NEW: return life( t ).replace( /^./, c => c.toUpperCase() );
		case BIND: return `${life( t )}.inject`;
		default: switch( t ) {
			case NAMESPACE: return 'namespace';
			case RESERVED: return 'reserved';
			default: return `input.${life( t )}`; } } },
	sets = ( T, t, l = t & LIFE, value = name( t ) ) =>
		( defines( define( T, 'name', { value } ).prototype, { type: { value }, t: { value: t }, l: { value: l } } ), T ),
	type = t => sets( class extends Service {}, t );

export default t => type[ t ] ??= type( t );
