import { isIterable } from '@jrapp/is-type';

export default function*( i ) { for( let a of i ) if( a != null ) if( isIterable( a ) ) yield* a; else yield a; }
