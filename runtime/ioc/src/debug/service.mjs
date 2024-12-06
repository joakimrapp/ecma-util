import { TRANSIENT, SINGLETON, SCOPED, INPUT, BIND, NEW, INJECT } from '../constants.mjs';

export default ( t, l ) => {
	switch( l ) {
		case TRANSIENT:	l = 'transient'; break;
		case SINGLETON:	l = 'singleton'; break;
		case SCOPED:		l = 'scoped'; break;
		default:				l = 'service'; }
	switch( t ) {
		case BIND:			return `${l}.${INJECT}`;
		case INPUT:			return `${l}.input`;
		case NEW:				return l.replace( /^\w/, c => c.toUpperCase() );
		default:				return l; } };
