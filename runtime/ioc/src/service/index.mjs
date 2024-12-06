import { assign, define } from '@jrapp/object';
import Arg from './arg.mjs';
import Service from './service.mjs';

const
	get = ( t, l ) => get[ t | l ] ??= Service.t( t ).l( l ).set( t, l );

export default ( n, f, d, t, l ) => define( assign( get( t, l ).from( d, e => Arg.get( e ) ), { n } ), 'f', { value: f } );
