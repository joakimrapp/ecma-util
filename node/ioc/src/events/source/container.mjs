export const
	RESOLVE				= 0b0000_0000,
	RESOLVING			= 0b0000_0001,
	INJECTING			= 0b0000_0010,
	REJECTED			= 0b0000_0011,
	RESOLVED			= 0b0000_0100,
	SETTLED				= 0b0000_0101,
	DECODED				= 0b0000_0110,
	CONTAINER			= [ RESOLVE, RESOLVING, INJECTING, REJECTED, RESOLVED, SETTLED, DECODED ];
