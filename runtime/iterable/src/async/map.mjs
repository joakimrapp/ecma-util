import all from '../all.mjs';
import map from '../generate/map.mjs';

export default function( a, f = this ) { return all( map( a, f ) ); }
