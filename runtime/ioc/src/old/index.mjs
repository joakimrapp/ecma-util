import { NS, INPUT, TRANSIENT, SINGLETON, SCOPE, IOC, LOG } from '../../constants.mjs';
import { DUPLICATE, MISSING, NOT_SUPPORTED, IMPORT_FAILED } from '../errors.mjs';
import { define } from '@jrapp/object';
import { isClass } from '@jrapp/is-type/fn';
import { Log } from '@jrapp/log';
import { SingletonWrapper, RuntimeWrapper } from './ioc.mjs';

const log = new Log( 'ioc' );

function *decode( data ) {
	const map = [], nsmap = [];
	for( let [ ti, ns, k, i, d ] of data ) {
		ns = ns ? nsmap[ ns ] : undefined;
		const n = ns ? `${ns}.${k}` : k, t = ti & 0xf;
		if( !t ) nsmap.push( n );
		else if( ( map.push( n ), !( d = d?.map( e => e?.map?.( i => map[ i ] ) ?? map[ e ] ) ) ) ) yield { t, n };
		else {
			yield { t, n, d, c: !!( ( ti >>= 4 ) & 1 ), ...( ti >>= 1 ) ? { a: i } : { i } }; } }

class Service {
	constructor( l, n ) { const ns = n.split( '.' ); Object.assign( this, { l, n, k: ns.pop(), ns } ); } }
			

async function inject( c, f, i, a ) {
	if( !f ) try { f = await i(); } catch( e ) { IMPORT_FAILED.throw( `${this.n} import failed :${e.message}` ); }
	return define( this, 'inject', { value: ( c ?? isClass( f ) ) ? async a => new f( ...a ) : async a => f( ...a ) } ).inject( a ); }

class Service {
	constructor( l, n ) { const ns = n.split( '.' ); Object.assign( this, { l, n, ns, k: ns.pop() } ); } }
class Injectable extends Service {
	constructor( l, n, d, f, c, i ) { super( l, n, d ); this.d = d; this.inject = inject.bind( this, c, f, i ); } }
class Transient extends Service {
	constructor( n, inject ) { super( 0, n ); this.inject = inject; } }
class TransientIoC extends Transient { #s;
	constructor( s ) { super( IOC ); this.#s = s; }
	inject( p, c, o ) { return new RuntimeWrapper( this.#s, c, o ); } }
class TransientLog extends Transient {
	constructor() { super( LOG ); }
	inject( p ) { return new Log( p ); } }

export class Services extends Map { evt = [];
	static from( a ) { const o = new this(); for( let { t, n, d, i, a, c } of a ) o.add( t, n, d, i, a, c ); return o.container(); }
	static decode( ...a ) { return this.from( decode( a ) ); }
	container() { return new SingletonWrapper( this ); }
	decode( data ) {
		const map = [], nsmap = [];
		for( let [ ti, nsi, k, i, d ] of data ) {
			const ns = nsi ? nsmap[ nsi ] : undefined, n = ns ? `${ns}.${k}` : k, t = ti & 0xf;
			if( t === NS ) nsmap.push( n );
			else if( ( map.push( n ), !( d ) ) ) this.add( { t, n } );
			else {
				yield { t, n, d, c: !!( ( ti >>= 4 ) & 1 ), ...( ti >>= 1 ) ? { a: i } : { i } }; } } }	
	get( n ) { return super.get( n ) ?? MISSING.throw( n ); }
	add( t, n, d, ...f ) { if( this.has( n ) ) DUPLICATE.throw( n ); else switch( t ) {
		case 8: case 9: return this.set( n, new Injectable( t - 7, n, d?.map( e => e.map?.( i => this.get( i ) ) ?? this.get( e ) ), ...f ) );
		case 2: switch( n ) {
			case 'ioc': return this.set( n, new Transient( n ) );
			case 'log': return this.set( n, new TransientLog() );
			default: NOT_SUPPORTED.throw( `custom transients: ${n}` ); }
		case 3: this.evt.push( n ); return this.set( n, new Service( 9, n ) );
		default: NOT_SUPPORTED.throw( `runtime type ${t}: ${n}` ); }
	}
}
