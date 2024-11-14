export { milliseconds, timespan, Timer, date, time, datetime } from './time.mjs';
export { uint } from './uint.mjs';
import { units } from './units.mjs';

export const
	bytes = units( 2, 10, 'B,kB,MB,GB,TB,PB,EB,ZB,YB' ),
	grams = units( 10, 3, 'g,kg' ),
	meter = units( 10, 3, 'm,km' );
