import { definesProto } from '@jrapp/object';
import { GROUPS } from '#constants';
import { MATCH } from '#symbols';
import iterable from '@jrapp/iterable';
import matches from './matches.mjs';
import reduce from '../functions/reduce.mjs';
import replace from './replace.mjs';
import replacer from '../functions/replacer.mjs';

export default definesProto( class extends RegExp {
	groups() {
		return this[ MATCH ]( ...arguments )?.[ GROUPS ]; }
	match( s, i ) {
		return i != null ? this[ MATCH ]( s )?.[ i ] : this[ MATCH ]( s ); }
	reduce() {
		return iterable( reduce( this, ...arguments ) ); }
	replacer() {
		return replacer( this, ...arguments ); }
}, { matches, replace } );
