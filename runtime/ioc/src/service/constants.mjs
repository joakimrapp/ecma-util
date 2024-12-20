export const
	NAMESPACE			= 0b00_00,
	RESERVED			= 0b00_01,

	INJECTS				= 0b11_00,
	INVOKE				= 0b01_00,
	BIND					= 0b10_00,
	NEW						= 0b11_00,

	LIFE					= 0b00_11,
	AUTO					= 0b00_00,
	TRANSIENT			= 0b00_01,
	SINGLETON			= 0b00_10,
	SCOPED				= 0b00_11,
	
	INJECT 				= 'inject';
