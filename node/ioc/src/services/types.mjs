import { INJECTS, LIFE, AUTO, SINGLETON, SCOPED } from '#constants';
import { LIFESTYLE, MISSING } from '#errors';
import { Args } from '#service';

class Scoped extends Map {
	set( name, scoped = name ) {
		super.get( name )?.add( scoped ) ?? super.set( name, new Set( [ scoped ] ) ); }
	arg( name, depending ) {
		if( this.has( name ) ) this.set( depending, name ); }
	get( name, type ) {
		switch( type & LIFE ) {
			case AUTO:
				return ( type - AUTO ) | ( this.has( name ) ? SCOPED : SINGLETON );
			case SCOPED:
				this.set( name );
				break;
			case SINGLETON:
				if( this.has( name ) )
					LIFESTYLE.throw( name, ...super.get( name ) );
				break; }
		return type; } }

export default class extends Map { #s; #l = new Scoped();
	constructor( s ) { super(); this.#s = s; }
	has( n ) {
		return this.#s.has( ...arguments ) || ( n === 'ioc' ); }
	get( n ) {
		try {
			return this.#s.has( n ) ? this.#s.get( ...arguments ) : ( n === 'ioc' ) ? this.#s.ioc() : MISSING.throw( ...arguments ); }
		finally { this.#l.arg( ...arguments ); }; }
	set( name, t, fn, dependencies, resolves, ...names ) {
		if( t & INJECTS ) {
			resolves.forEach( n => this.get( n, ...names ) );
			dependencies = Args.res( this, dependencies, ...names ); }
		const type = this.#l.get( name, t );
		super.set( name, type );
		return [ name, type, fn, dependencies ];
	} }
