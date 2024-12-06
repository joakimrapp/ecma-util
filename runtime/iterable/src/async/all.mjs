import { isFn } from '@jrapp/is-type';
import map from '../generate/map.mjs';

const
	all = Promise.all.bind( Promise );

export default function( a, f = this ) { return all( isFn( f ) ? map( a, f ) : a ); }
