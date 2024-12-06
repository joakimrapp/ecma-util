export default function*( i, f = this ) { for( let a of i ) yield f( a ); }
