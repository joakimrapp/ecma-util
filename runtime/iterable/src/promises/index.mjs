import all from '../all.mjs';

export default class extends Array {
	static from( a, f ) { return super.from( a, f ? ( async i => [ await f( await i ) ] ) : ( async i => [ await i ] ) ); }
	map( f ) { return this.map( async p => all( ( await p ).map( f ) ) ); }
	filter( f ) { return this.map( async p => (  ) ); }
	resolve() { return all( this ); }
}
