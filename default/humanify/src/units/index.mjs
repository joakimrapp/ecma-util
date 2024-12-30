import create from './create.mjs';

export const
	bytes = create( 2, 10, 'B,kB,MB,GB,TB,PB,EB,ZB,YB' ),
	grams = create( 10, 3, 'g,kg' ),
	meter = create( 10, 3, 'm,km' );
