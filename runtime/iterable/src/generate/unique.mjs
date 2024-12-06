export default function*( i ) { const s = new Set; for( let a of i ) if( !s.has( a ) ) yield ( s.add( a ), a ); }
