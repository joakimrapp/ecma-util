import esm from './esm.mjs';
import { NODE_VERSION } from './constants.mjs';


export default {
	...esm,
	platform: 'node',
	target: [ `node${NODE_VERSION}` ] };
