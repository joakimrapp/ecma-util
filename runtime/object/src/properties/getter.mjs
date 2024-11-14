import { enumerable, configurable } from '../constants.mjs';
import { defineProperty } from '../object.mjs';

export default function getter( o, k, f, e ) { if( e ) e = { enumerable }; return defineProperty( o, k, { get: () => defineProperty( o, k, { value: f.call( o, k ), ...e } ), configurable, ...e } ); }
