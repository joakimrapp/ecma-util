import { NAMESPACE } from './constants.mjs';
import service from './type.mjs';

const
	re = /^(?:(.+?)\.)?(\w+)$/;

export const
	getNs = n => n?.match( re ) ?? Array.from( { length: 3 } );
	
export class Ns extends service( NAMESPACE ) {
	getN( k ) {  }
};
