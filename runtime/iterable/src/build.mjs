import { defined, flat, map, unique } from './generate/index.mjs';
import { all } from './async/index.mjs';

class Build extends Array {
	add() { return ( this.push( ...arguments ), this ); }
	defined( a ) { return this.add( defined.bind( a ) ); }
	flat() { return this.add( flat ); }
	unique() { return this.add( unique ); }
	map( a ) { return this.add( map.bind( a ) ); }
	all() { return all( this.exe( ...arguments ) ); }
	exe() { return this.reduce( ( i, f ) => f( i ), ...arguments ); }
	array() { return Array.from( this.exe( ...arguments ) ); } }

export default () => new Build();
