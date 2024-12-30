import { LIFE, AUTO, SINGLETON, SCOPED } from '#constants';
import { LIFESTYLE } from '#errors';

export default class extends Map {
	set( n, a = n ) { super.get( n )?.add( a ) ?? super.set( n, new Set( [ a ] ) ); }
	arg( n, p ) { if( this.has( n ) ) this.set( p, n ); }
	get( n, t ) {
		switch( t & LIFE ) {
			case AUTO: return ( t - AUTO ) | ( this.has( n ) ? SCOPED : SINGLETON );
			case SCOPED: this.set( n ); break;
			case SINGLETON: if( this.has( n ) ) LIFESTYLE.throw( n, ...super.get( n ) ); break; }
		return t; } }
