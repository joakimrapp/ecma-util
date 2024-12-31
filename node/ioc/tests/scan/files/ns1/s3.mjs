export class S3 {
	constructor( { ns1: { s1, s2 } } ) { this.value = s1 + s2 + 1; } }

export const $ioc = {
	service: {
		'ns1.s3': S3 } };
