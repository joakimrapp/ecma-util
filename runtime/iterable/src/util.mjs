import { isFn, isIterable, isDefined, isRegExp } from '@jrapp/is-type';
import { define, configurable } from '@jrapp/object';

function isNew( a ) { return this.size !== this.add( a ).size; }

export const
	{	iterator,
		asyncIterator } = Symbol,
	setIterator = ( o, v ) => define( o, iterator, { configurable, value: v[ iterator ].bind( v ) } ),
	setAsyncIterator = ( o, v ) => define( o, asyncIterator, { configurable, value: v[ asyncIterator ].bind( v ) } ),
	IsNew = () => isNew.bind( new Set ),
	Next = a => { if( isFn( a ) ) return a; else if( isRegExp( a ) ) return i => i?.match?.( a )?.[ 0 ]; };
