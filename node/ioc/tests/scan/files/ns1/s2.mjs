import { setTimeout as wait } from 'node:timers/promises';

export function s2( s1 ) { return wait( 10, s1 + 1 ); }

export const $ioc = o => o.singleton( 'ns1.s2', s2 );
