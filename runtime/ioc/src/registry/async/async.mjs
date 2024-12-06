import { entries, from } from '@jrapp/object';
import { emit } from '../../events.mjs';
import Services from '../services.mjs';

export const
	all = Promise.all.bind( Promise );

class Mocked extends Services {
	mock() {
		return this.set( ...arguments ); }
}
class Scan extends Services {
	
}

export default class extends Services { #o;
	static async import() {
		return new this( from( await all( entries( ...arguments )
			.map( ( [ n, a ] ) => all( a.map( ( [ t, l, d, r, p, k, ...b ] ) => import( p )
				.then( ( { [ k ]: f } ) => [ b, [ n, t, l, f, [ p, k ], d, r ] ] ) ) ).then( i => [ n, i ] ) ) ) ) ); }
	static async scan() {

	}
	constructor( o = {} ) {
		super( o ); this.#o = o; }
	set() {
		COMMAND.throw( 'set' ); }
	export() {
		return from( entries( this.#o ).map( ( [ n, a ] ) => [ n, a.map( ( [ b, [ , t, l, , [ p, k ], d, r ] ] ) => [ n, t, l, d, r, p, k, ...b ] ) ] ) ); }
	mock() {
		return new Mocked( from( entries( this.#o ) ) ).mock( ...arguments ); }
}
