export async function s1() { return 1; }

export const $ioc = {
	namespace: 'ns1',
	singleton: {
		s1 } };
