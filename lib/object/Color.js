const { Color: SFColor } = require('../../sfml');

class Color extends SFColor {
	constructor(r, g, b, a) {
		super(r, g, b, a);
	}
}

module.exports = Color;
