import { emit, INCLUDING } from '../debug/events.mjs';
import IoC from './index.mjs';
import Container from './container.mjs';

export default class extends Map {
	add( o ) {
		return ( emit[ INCLUDING ]?.( o ), this.set( o.n, o ), o ); }
	container() {
		return new IoC( this, new Container( ...arguments ) ); }
}
