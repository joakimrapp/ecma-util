export const
	SCANNING			= 0b0001_0000,
	IMPORTING			= 0b0001_0001,
	REGISTERING		= 0b0001_0010,
	BUILDING			= 0b0001_0011,
	INCLUDING			= 0b0001_0100,
	EXPORTED			= 0b0001_0101,
	REGISTRY			= [ SCANNING, IMPORTING, REGISTERING, BUILDING, INCLUDING, EXPORTED ];
