



export class X {
	static inject( { ns1: { name2 } } ) {}
}
export class Y {
	constructor( { ns1: { name3 } } ) {}
}

export const
	$targets = 'buildTarget1',
	$services = {
		'ns1.name1': X,
		'ns1.name2': Y
	};



/* @__PURE__ */
