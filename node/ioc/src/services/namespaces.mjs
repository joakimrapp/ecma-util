import { COLLISION } from '#errors';
import { NAMESPACE } from '#constants';
import { define, defines, enumerable, defineName } from '@jrapp/object';

const
	re = /^(?:(.+?)\.)?(\w+)$/;

export class Namespace {
	static {
		define( defineName( this, 'namespace' ).prototype, 't', { value: NAMESPACE } ); }
	constructor( n, ns, k ) {
		defines( this, { n: { value: n, enumerable }, ns: { value: ns }, k: { value: k } } ); } }

export default class extends Map { #s = new Set;
	constructor() {
		super( [ [ new Namespace ] ] ); }
	set( o ) {
		return ( super.set( o.n, o ), o ); }
	get( name ) {
		return super.get( name ) ?? this.set( this.#s?.has( name ) ? COLLISION.throw( ...arguments ) : new Namespace( ...this.arg( ...arguments ) ) ); }
	arg( name, serviceName ) {
		const [ n, ns, k ] = name?.match( re ) ?? Array.from( { length: 3 } );
		return [ n, this.get( ns, serviceName ), k ]; }
	service( name ) {
		this.has( name ) ? COLLISION.throw( name, ...arguments ) : this.#s.add( name );
		return this.arg( name, ...arguments ); } }
