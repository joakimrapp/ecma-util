import { VALUE } from '@jrapp/object';
import { MATCH } from '#symbols';

export default function*( re, s ) {
	for( ; s != null ; s = re[ MATCH ]( s )?.[ 0 ] )
		yield s;
}
