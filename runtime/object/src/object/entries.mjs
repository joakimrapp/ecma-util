import { entries } from '../object.mjs';

export default a => a?.entries?.() ?? entries( a );
