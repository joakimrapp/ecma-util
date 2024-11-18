import { INPUT, TRANSIENT, SINGLETON, SCOPED } from '../constants.mjs';
import { defines } from '@jrapp/object';
import Module from './module.mjs';
import Service from './service.mjs';

export class Transient extends Service { static { defines( this.prototype, { t: { value: TRANSIENT }, l: { value: 0 } } ); } }
export class Singleton extends Service { static { defines( this.prototype, { t: { value: SINGLETON }, l: { value: 1 } } ); } }
export class Scoped extends Service { static { defines( this.prototype, { t: { value: SCOPED }, l: { value: 2 } } ); } }
export class Input extends Module { static { defines( this.prototype, { t: { value: INPUT }, l: { value: 2 } } ); } }
