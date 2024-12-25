import { isIterable } from '@jrapp/is-type';
import { define } from '@jrapp/object';
import { all } from '@jrapp/iterable';
import Arg from './arg.mjs';

const
	re = /w+$/;

export default class extends Array { static { define( this, 'name', { value: '' } ); }
	static get( s, d ) { return this.from( d, e => isIterable( e ) ? Arg.from( e, i => s.get( i ) ) : s.get( e ) ); }
	static res( s, d, ...a ) { return this.from( d, e => isIterable( e ) ? Arg.res( s, e, ...a ) : s.get( s.has( e ) ? e : a[ 0 ].replace( re, e ), ...a ) ); }
	all() { return all( this.map( i => i.all( ...arguments ) ) ); } }
