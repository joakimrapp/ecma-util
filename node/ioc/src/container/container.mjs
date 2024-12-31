import { SINGLETON, SCOPED } from '#constants';
import { emit, RESOLVE, SETTLED } from '#events';
import { SCOPE, MISSING } from '#errors';
import { defines } from '@jrapp/object';

const
	now = Date.now.bind( Date ),
	set = ( c, { n, ns, k }, v ) => {
		if( n !== k )
			( c[ ns.n ] ?? set( c, ns, {} ) )[ k ] = v;
		return c[ n ] = v; };

function *get( l, [ a, [ tc, ti, tf, tr ], ...r ] ) {
	yield [ a, l, tf != null, r.map( ( [ { n } ] ) => n ), tc, ti, tr ];
	for( let i of r ) yield* get( l + 1, i ); }

function *flat() { for( let i of arguments ) { yield* get( 0, i ); } }

export default class extends Map {
	constructor( services, input = {}, container ) {
		super();
		defines( this, { l: { value: container ? SCOPED : SINGLETON }, i: { value: input }, c: { value: container }, ns: { value: {} }, s: { value: services } } ); }
	has() {
		return this.s.has( ...arguments ) && ( ( this.l === SCOPED ) || ( this.s.get( ...arguments ).l !== SCOPED ) ); }
	get( o, ...a ) {
		return super.get( o.n ) ?? ( o.sets ? this.set( o, o.l === this.l ? o.res( this, ...a ) : this.c?.get( ...arguments ) ?? SCOPE.throw( o.n ) ) : o.res( this, ...a ) ); }
	set( o, p ) {
		super.set( o.n, ( p = p.then( v => set( this.ns, o, v ) ) ) );
		return p.catch( e => { this.delete( o.n ); throw e; } ); }
	res( n ) {
		return this.s.get( n ) ?? MISSING.throw( n ); }
	scope( i ) {
		return new this.constructor( this.s, i, this ); }
	async resolve() {
		const a = this.res( ...arguments );
		if( emit[ RESOLVE ] != null ) {
			const t = now(), r = [];
			try {
				emit[ RESOLVE ]?.( a );
				return await this.get( a, r ); }
			finally {
				emit[ SETTLED ]?.( a.n, t, now(), [ ...flat( ...r ) ],  );
			} }
		else
			return this.get( a ); } }
