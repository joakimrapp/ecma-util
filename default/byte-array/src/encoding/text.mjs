const
	encoder = new TextEncoder(),
	decoder = new TextDecoder();

export const
	encode = encoder.encode.bind( encoder ),
	decode = decoder.decode.bind( decoder );
