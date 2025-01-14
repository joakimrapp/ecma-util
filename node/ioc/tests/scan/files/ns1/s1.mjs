import { setTimeout as wait } from 'node:timers/promises';

export async function s1() { return wait( 10, 1 ); }

export const $ioc = {
	namespace: 'ns1',
	singleton: {
		s1 } };
