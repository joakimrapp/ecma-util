import { access } from 'node:fs/promises';
import { constants } from 'node:fs/promises';

const
	{ F_OK } = constants;

export default async p => { try { await access( p, F_OK ); return true; } catch { return false; } };
