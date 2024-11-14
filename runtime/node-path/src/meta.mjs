import { fromUrl } from './url.mjs';
import { resolve, dirname } from './path.mjs';

export default ( { url }, ...a ) => resolve( dirname( fromUrl( url ) ), ...a );
