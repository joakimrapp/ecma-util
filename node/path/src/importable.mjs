import { relative, resolve, dirname } from './path.mjs';

export default ( from, to ) => relative( resolve( dirname( from ) ), resolve( to ) ).replace( /^(?!\.)/, './' );
