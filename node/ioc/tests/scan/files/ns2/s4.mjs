import { setTimeout as wait } from 'node:timers/promises';

export const s4 = ( { ns1: { s3 }, ns2: { s1 } } ) => wait( 10, s3.value + s1 );

export const $ioc = {
	namespace: 'ns2',
	service: {
		s4
	}
};
