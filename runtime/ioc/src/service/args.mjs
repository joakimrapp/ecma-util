import { isIterable } from '@jrapp/is-type';
import { define } from '@jrapp/object';
import Arg from './arg.mjs';

const
	all = Promise.all.bind( Promise );

export default class extends Array { static { define( this, 'name', { value: '' } ); }
	static get( s, d ) { return this.from( d, e => isIterable( e ) ? Arg.from( e, i => s.get( i ) ) : s.get( e ) ); }
	static res( s, d, ...a ) { return this.from( d, e => isIterable( e ) ? Arg.res( s, k, ...a ) : s.get( s.has( k ) ? k : replace( k, ...a ), ...a ) ); }
	all() { return all( this.map( i => i.all( ...arguments ) ) ); }
}
