import { fromUrl } from './url.mjs';
import { resolve, dirname as dir } from './path.mjs';

export default ( { url, dirname }, ...a ) => resolve( dirname ?? dir( fromUrl( url ) ), ...a );
