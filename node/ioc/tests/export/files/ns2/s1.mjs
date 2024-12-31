export class S1 {
	static async inject( { i1, ns1: { s1, s2, s3 } }, ioc ) { return ( await ioc.resolve( 'ns2.s5' ) ) + i1 + s1 + s2 + s3.value; }
}

export function s5() { return 1; }

export const $ioc = {
	scoped: {
		'ns2.s1': S1,
		'ns2.s5': s5
	}
};
