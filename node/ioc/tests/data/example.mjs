const rn2d = ( i = 0, ms = ~~( Math.random() * 500 ) ) => new Promise( r => setTimeout( r, ms, ms + i ) );

const rnd = ( i = 0, ms = 300 ) => new Promise( r => setTimeout( r, ms, ms + i ) );


export class X {
	static async inject( { ns1: { name1 }, ns2: { n5 } } ) { return rnd( name1.value + n5 ); }
}
export class Y {
	constructor( { event } ) { this.value = event; }
}

export const
	name1 = async( { ns2: { n2, n3 } } ) => rnd( n2 + n3 ),
	name2 = async() => rnd(),
	name3 = async() => rnd(),
	name4 = async( { ns2: { n1, n2 } } ) => rnd( n1 + n2 ),
	name5 = async( { ns2: { n4, n3 } } ) => rnd( n4 + n3 );

export const
	$ioc = {
		input: [
			'event'
		],
		service: {
			'ns1.name2': X,
			'ns1.name1': Y,
			'ns2.n1': name1,
			'ns2.n2': name2,
			'ns2.n3': name3,
			'ns2.n4': name4,
			'ns2.n5': name5,
		}
	};
