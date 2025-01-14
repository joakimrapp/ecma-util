export { isIterable } from '@jrapp/is';
export { default as Iterable } from './iterator.mjs';
export { default as all } from './all.mjs';
export { default as array } from './array.mjs';
import { default as Iterable } from './iterator.mjs';
export default Iterable.from.bind( Iterable );
