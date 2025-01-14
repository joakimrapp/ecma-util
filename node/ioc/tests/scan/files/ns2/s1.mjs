import { setTimeout as wait } from 'node:timers/promises';

export class S1 {
	static inject( { i1, ns1: { s1, s2, s3 } } ) { return wait( 10, i1 + s1 + s2 + s3.value + 1 ); }
}

export const $ioc = {
	scoped: {
		'ns2.s1': S1
	}
};
