export { default as Args } from './args.mjs';
import { INJECTS, LIFE, INJECT, INVOKE, NEW, BIND, TRANSIENT, RESERVED } from '#constants';
import { SCOPE } from '#errors';
import { defines, defineName } from '@jrapp/object';
import Service from './service.mjs';

function INJECT_NEW() {
	return new this( ...arguments ); }

function ioc( container, context ) { return { resolve() { return container.get( container.res( ...arguments ), context ); } }; }

const
	lifestyles = 'service|transient|singleton|scoped'.match( /\w+/g ),
	set = ( t, l, name, Class = class extends Service {} ) => {
		defines( Class.prototype, { t: { value: t }, l: { value: l }, ...( l === TRANSIENT ) ? { get: { value: Service.prototype.res } } : { sets: { value: true } } } );
		return defineName( Class, name ); },
	get = t => {
		const l = t & LIFE, name = lifestyles[ l ];
		switch( t & INJECTS ) {
			case INVOKE: return set( t, l, name );
			case NEW: return set( t, l, name.replace( /^./, c => c.toUpperCase() ), class extends Service {
				constructor( a, d, f ) { super( a, d, INJECT_NEW.bind( f ) ); } } );
			case BIND: return set( t, l, `${name}.inject`, class extends Service {
				constructor( a, d, f ) { super( a, d, f[ INJECT ].bind( f ) ); } } );
			default: switch( t ) {
				case RESERVED: return defineName( class extends Service {
					static {
						defines( this.prototype, { t: { value: RESERVED }, l: { value: TRANSIENT } } ); }
					constructor() {
						super( ...arguments );
						switch( this.n ) {
							case 'ioc': defines( this, { get: { value: ioc }, res: { value: ioc } } ); } }
				}, 'reserved' );
				default: return set( t, l, `input.${name}`, class extends Service {
					async res( { i } ) {
						return i[ this.n ] ?? SCOPE.throw( this.n ); } } ); } } };

export default t => get[ t ] ??= get( t );
