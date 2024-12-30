export const
	NUL		= '\x00', 		// Null														<ctrl-@>
	SOH		= '\x01', 		// Start of Heading								<ctrl-a>
	STX		= '\x02', 		// Start of Text									<ctrl-b>
	ETX		= '\x03', 		// End of Text										<ctrl-c>
	EOT		= '\x04', 		// End of Transmission						<ctrl-d>
	ENQ		= '\x05', 		// Enquiry												<ctrl-e>
	ACK		= '\x06', 		// Acknowledgement								<ctrl-f>
	BEL		= '\x07', 		// Bell														<ctrl-g>
	BS		= '\x08', 		// Backspace											<ctrl-h>
	HT		= '\x09', 		// Horizontal Tab									<ctrl-i>
	LF		= '\x0a', 		// Line Feed											<ctrl-j>
	VT		= '\x0b', 		// Vertical Tab										<ctrl-k>
	FF		= '\x0c', 		// Form Feed											<ctrl-l>
	CR		= '\x0d', 		// Carriage Return								<ctrl-m>
	SO		= '\x0e', 		// Shift Out											<ctrl-n>
	SI		= '\x0f', 		// Shift In												<ctrl-o>
	DLE		= '\x10', 		// Data Link Escape								<ctrl-p>
	DC1		= '\x11', 		// Device Control 1 (often XON)		<ctrl-q>
	DC2		= '\x12', 		// Device Control 2								<ctrl-r>
	DC3		= '\x13', 		// Device Control 3 (often XOFF)	<ctrl-s>
	DC4		= '\x14', 		// Device Control 4								<ctrl-t>
	NAK		= '\x15', 		// Negative Acknowledgement				<ctrl-u>
	SYN		= '\x16', 		// Synchronous Idle								<ctrl-v>
	ETB		= '\x17', 		// End of Transmission Block			<ctrl-w>
	CAN		= '\x18', 		// Cancel													<ctrl-x>
	EM		= '\x19', 		// End of Medium									<ctrl-y>
	SUB		= '\x1a', 		// Substitute											<ctrl-z>
	ESC		= '\x1b', 		// Escape													<ctrl-[>
	FS		= '\x1c', 		// File Separator									<ctrl-\>
	GS		= '\x1d', 		// Group Separator								<ctrl-]>
	RS		= '\x1e', 		// Record Separator								<ctrl-^>
	US		= '\x1f', 		// Unit Separator									<ctrl-_>
	SP		= '\x20', 		// Space
	DEL		= '\x7f'; 		// Delete													<ctrl-?>

export const esc = a => `${ESC}${a}`,
	IND		= esc( 'D' ),		// Index
	NEL		= esc( 'E' ),		// Next Line
	HTS		= esc( 'H' ),		// Tab Set
	RI		= esc( 'M' ),		// Reverse Index
	SS2		= esc( 'N' ),		// Single Shift Select of G2 Character Set
	SS3		= esc( 'O' ),		// Single Shift Select of G3 Character Set
	DCS		= esc( 'P' ),		// Device Control String
	SPA		= esc( 'V' ),		// Start of Guarded Area
	EPA		= esc( 'W' ),		// End of Guarded Area
	SOS		= esc( 'X' ),		// Start of String
	DECID	= esc( 'Z' ),		// Return Terminal ID
	CSI		= esc( '[' ),		// Control Sequence Introducer
	ST		= esc( '\\' ),	// String Terminator
	OSC		= esc( ']' ),		// Operating System Command
	PM		= esc( '^' ),		// Privacy Message
	APC		= esc( '_' );		// Application Program Command

export const csi = a => `${CSI}${a}`, osc = a => `${OSC}${a}`;
