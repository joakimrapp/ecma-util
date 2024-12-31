export class S3 {
	constructor( { ns1: { s1, s2 } } ) { this.value = s1 + s2 + 1; } }

export function s2( { ns1: { s1 } } ) { return s1 + 1; }

export const $ioc = {
	service: {
		'ns1.s3': S3,
		'ns1.s2': s2 } };
