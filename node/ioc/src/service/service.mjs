import { emit, RESOLVING, INJECTING, REJECTED, RESOLVED } from '#events';
import { defines, enumerable } from '@jrapp/object';

const
	now = Date.now.bind( Date ),
	{ log } = console;

export default class {
	static from() { return new this( ...arguments ); }
	constructor( [ n, ns, k ] = [], d, i ) {
		defines( this, { n: { value: n, enumerable }, ns: { value: ns }, k: { value: k }, d: { value: d }, i: { value: i } } ); }
	get type() {
		return this.constructor.name; }
	get( container, context ) {
		return container.get( this, context ); }
	async res( container, context ) {
		if( context == null )
			return this.i( ...await this.d.get( container, context, this ) );
		else {
			emit[ RESOLVING ]?.( this );
			const
				times = [ now() ],
				args = await this.d.get( container, ( context[ context.length ] = [ this, times ] ), this );
			try {
				emit[ INJECTING ]?.( this );
				times[ 1 ] = now();
				return await this.i( ...args ); }
			catch( e ) {
				times[ 2 ] = now();
				emit[ REJECTED ]?.( this, e );
				throw e; }
			finally {
				times[ 3 ] = now();
				if( times[ 2 ] == null )
					emit[ RESOLVED ]?.( this, times[ 3 ] - times[ 1 ] ); }
		} }
}
