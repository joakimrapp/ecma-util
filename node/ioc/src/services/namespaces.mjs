import { COLLISION } from '#errors';
import { Ns, getNs } from '#service';

export default class extends Map { #s = new Set();
	constructor() { super( [ [ new Ns ] ] ); }
	get( nsN, sN ) { return super.get( nsN ) ?? ( this.#s.has( nsN ) ? COLLISION.throw( nsN, sN ) : this.add( getNs( nsN ), sN ) ); }
	set( o ) { return ( super.set( o.n, o ), o ); }
	add( [ n, ns, k ], sN ) { return ( this.set( new Ns( [ n, this.get( ns, sN ), k ] ) ) ); }
	service( sN ) {
		const [ n, ns, k ] = this.has( sN ) ? COLLISION.throw( sN ) : ( this.#s.add( sN ), getNs( sN ) );
		return [ n, this.get( ns, sN ), k ]; } }
