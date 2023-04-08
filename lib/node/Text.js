const path = require('path');

const { Text: SFText, Font: SFFont } = require('../../sfml');

const Node = require('./Node');
const Vector2D = require('../object/Vector2D');

class Text extends Node {
	constructor(x=0, y=0, content='') {
		super();

		// Overrides
		this.position = new Vector2D(x, y);

		// Privates
		this._t = undefined;

		// TODO: @lib/node/Text: Add custom font
		this.font = undefined;
		this.setFont(__dirname + '/../../extra/font/Inter/Inter-Regular.otf');
		this.content = content;
		this.fontSize = 16;

		this.color = 255;
		

		this._t = new SFText(this.content, this.font, this.fontSize);
	}

	get size() {
		let [t] = this.render();

		let bounds = t.getGlobalBounds();
//		return new Vector2D(bounds.width, bounds.height);
		return new Vector2D(bounds.width, this.fontSize);
	}

	set size(val) {
		// noop
	}

	setFont(fontFilePath) {
		const font = new SFFont();
		font.loadFromFileSync(path.resolve(fontFilePath));
		this.font = font;
	}

	getStringWidth(string) {
		if (!this.font) throw new Error('Text .font property unset');

		let width = 0;
		for (let i = 0; i < string.length; i++) {
			let glyph = this.font.getGlyph(string.codePointAt(i), this.fontSize, false, 0);
			width += glyph.bounds.width;
		}

		return width;
	}

	render() {
		this._t.setPosition(this.position.asVectorF());
		this._t.setFillColor(this.color);
		this._t.setFont(this.font);
		this._t.setString(this.content);
		this._t.setCharacterSize(this.fontSize);

		return [this._t];
	}
}

module.exports = Text;
