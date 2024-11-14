import { Timer } from '@jrapp/humanify';
import writer from '#local/writer';

const
	get_level = () => {
		return 5;
		const log_level = process.env.npm_config_loglevel ?? process.env.LOGGER_LEVEL;
		if( log_level != null ) switch( log_level ) {
			case 'silent': return 0;
			case 'fatal': case 'error': return 1;
			case 'warn': return 2;
			case 'info': return 3;
			case 'timing': case 'notice': return 4;
			case 'verbose': case 'silly': case 'debug': return 5; }
		else if( process.argv.includes( '-q' ) ) return 0;
		else if( process.argv.includes( '--verbose' ) ) return 5;
		else return 4; },
	level = get_level(),
	level_ok = a => a <= level;

export default {
	fail() { if( level_ok( 1 ) ) return writer.write( 'FAIL', ...arguments ); },
	warn() { if( level_ok( 2 ) ) return writer.write( 'WARN', ...arguments ); },
	info() { if( level_ok( 3 ) ) return writer.write( 'INFO', ...arguments ); },
	done() { if( level_ok( 4 ) ) return writer.write( 'DONE', ...arguments ); },
	stat() { if( level_ok( 4 ) ) return writer.update( 'TASK', ...arguments ); },
	prog() { if( level_ok( 4 ) ) return writer.update( 'PROG', ...arguments ); },
	debug() { if( level_ok( 5 ) ) return writer.write( 'DEBUG', ...arguments ); },
	title() { if( level_ok( 5 ) ) return writer.update( 'TITLE', ...arguments ); else return this.info( ...arguments ); },
	async task( s, a, e = s ) {
		await this.stat( s );
		let t = Timer();
		try {
			return await ( a instanceof Function ? a( this ) : a ); }
		finally {
			await this.done( `${e instanceof Function ? e() : e} in ${t()}` ); }
	},
};
