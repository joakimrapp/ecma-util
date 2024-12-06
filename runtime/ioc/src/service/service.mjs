import { SINGLETON, SCOPED, INPUT } from '../constants.mjs';
import { LIFESTYLE } from '../errors.mjs';
import { define, defines } from '@jrapp/object';
import { all } from '@jrapp/iterable/async';
import { id } from './parse.mjs';
import name from '../debug/service.mjs';
import inject from './inject.mjs';

const
	add = ( c, [ n, ns, k ], v = {} ) => ( c.set( n, v ).get( ns ) ?? add( c, id( ns ) ) )[ k ] = v,
	set = async( [ n, ns, k ], c, p ) => ( c.set( n, p ).get( ns ) ?? add( c, id( ns ) ) )[ k ] = await p;

export default class extends Array {
	static t( t ) { switch( t ) {
		case INPUT: return class extends this {
			async get( c ) {
				return c.input( this.n ); } };
		default: return this; } }
	static l( l ) { switch( l ) {
		case SINGLETON: return class extends this {
			get( c, f ) {
				return c.get( this.n ) ?? set( id( this.n ), c, c.c ? this.get( c.c, f ) : super.get( c, f ) ); } };
		case SCOPED: return class extends this {
			get( c, f ) {
				return c.get( this.n ) ?? set( id( this.n ), c, c.c ? super.get( c, f ) : LIFESTYLE.throw( this.n ) ); } };
		default: return class extends this {}; } }
	static set( t, l, value = name( t, l ) ) {
		return ( defines( this.prototype, { t: { value: t }, l: { value: l }, type: { value } } ), define( this, 'name', { value } ) ); }
	get i() {
		return define( this, 'i', inject( this ) ).i; }
	get( c, f ) {
		return f?.( c, this ) ?? all( this, i => i.get( c ) ).then( a => this.i( ...a ) ); } }
