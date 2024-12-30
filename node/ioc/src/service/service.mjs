import { INJECTS, INJECT, INVOKE, NEW, BIND } from '#constants';
import { defines, enumerable } from '@jrapp/object';

function INJECT_NEW() { return new this( ...arguments ); }
function inject( o, f, d ) { switch( o.t & INJECTS ) {
	case INVOKE: return { i: { value: f }, d: { value: d } };
	case NEW: return { i: { value: INJECT_NEW.bind( f ) }, d: { value: d } };
	case BIND: return { i: { value: f[ INJECT ].bind( f ) }, d: { value: d } }; } }

export default class {
	constructor( [ n, ns, k ] = [], ...a ) { defines( this, { n: { value: n, enumerable }, ns: { value: ns }, k: { value: k }, ...inject( this, ...a ) } ); }
	all( c, f ) { return c.get( this, f ); }
}
