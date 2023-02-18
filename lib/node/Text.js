const path = require('path');

const { Text: SFText, Font: SFFont } = require('../../sfml');

const Node = require('./Node');
const Vector2D = require('../object/Vector2D');

class Text extends Node {
	constructor(x=0, y=0, content='') {
		super();

		this.position = new Vector2D(x, y);

		this.setFont(__dirname + '/../../extra/font/Inter/Inter-Regular.otf');
		this.content = content;
		this.fontSize = 16;

		this.color = 255;
	}

	// TODO: @lib/node/Text: Add getter for .size
	getSize() {
		let [t] = this.render();

		let bounds = t.getGlobalBounds();
//		return new Vector2D(bounds.width, bounds.height);
		return new Vector2D(bounds.width, this.fontSize);
	}

	setFont(fontFilePath) {
		const font = new SFFont();
		font.loadFromFileSync(path.resolve(fontFilePath));
		this.font = font;
	  }

	render() {
		let t = new SFText(this.content, this.font, this.fontSize);

		t.setFillColor(this.color);

		return [t];
	}
}

module.exports = Text;
