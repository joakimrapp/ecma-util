export function s2( s1 ) { return s1 + 1; }

export const $ioc = o => o.singleton( 'ns1.s2', s2 );
