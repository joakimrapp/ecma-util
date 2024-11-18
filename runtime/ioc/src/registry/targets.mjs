import { define } from '@jrapp/object';
import { SERVICE_EXISTS } from '../errors.mjs';

export default class extends Map {
	has( ...a ) { return ( this.default != null ) || a.some( i => super.has( i ) ); }
	get( ...a ) {
		for( let b of a )
			if( super.has( b ) )
				return super.get( b );
		return this.default; }
	set( o ) {
		if( o.b == null )
			return ( this.default == null ) ? define( this, 'default', { value: o } ) : SERVICE_EXISTS.throw( o.n );
		for( let b of o.b )
			super.has( b ) ? SERVICE_EXISTS.throw( o.n, b ) : super.set( b, o );
		return this; } }
