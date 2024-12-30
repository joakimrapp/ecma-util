import { configurable } from './constants.mjs';
import { define } from './object.mjs';

export const
	set = ( object, key, value ) => define( object, key, { value } )[ key ],
	getter = ( key, get, enumerable, configurable ) => [ key, { get, enumerable, configurable } ],
	value = ( key, value, enumerable, configurable ) => [ key, { value, enumerable, configurable } ],
	valueGetter = ( key, fn, enumerable ) => [ key, { configurable, enumerable, get() { return define( this, key, { enumerable, value: fn( key ) } )[ key ] } } ];
