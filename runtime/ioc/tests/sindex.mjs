import { X as A, Y as B, name5 as C, name4 as D, name1 as E, name2 as F, name3 as G } from './data/example.mjs';

import ioc from '@jrapp/ioc/import';
export default ioc( [
	[ 0 ],
	[ 0, 0, 'ns1' ],
	[ 0, 0, 'ns2' ],
	[ 3, 0, 'event' ],
	[ 15, 1, 'name1', [ [ 0 ] ], B ],
	[ 6, 2, 'n2', [], F ],
	[ 6, 2, 'n3', [], G ],
	[ 6, 2, 'n1', [ [ 2, 3 ] ], E ],
	[ 6, 2, 'n4', [ [ 4, 2 ] ], D ],
	[ 6, 2, 'n5', [ [ 5, 3 ] ], C ],
	[ 11, 1, 'name2', [ [ 1, 6 ] ], A ]
] );