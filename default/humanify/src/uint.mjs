const uints = 'zero,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen'.split( ',' );

export default i => uints[ i ] ?? `${i}`;
