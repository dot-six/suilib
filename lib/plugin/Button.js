const {
	Text: SFText, Font: SFFont,

	RectangleShape: SFRectangleShape
} = require('../../sfml');

const { Node, Text } = { Node: require('../node/Node'), Text: require('../node/Text') };
const { Vector2D, Color, Padding, Region } = require('../object');

class Button extends Node {
	constructor(x=0, y=0, content='New Button') {
		super();

		this._text = new Text(0, 0, content);

		this.backgroundColor = new Color(0, 0, 0);
		this.textColor = new Color(255, 255, 255);

		this.padding = new Padding(0);
	}

	getRegion() {
		let pos = this.getGlobalPosition();
		let tsize = this._text.getSize().add(pos);

		let reg = new Region(pos, tsize);
		return reg.addPadding(this.padding);
	}

	// TODO: @lib/node/Button: Add getter and setter for .size property
	getSize() {
		let reg = this.getRegion();

		return reg.end.sub(reg.start);
	}

	render() {
		let rect = new SFRectangleShape(this.getSize());
		rect.setFillColor(this.backgroundColor);

		let pos = this.getGlobalPosition();
		this._text.position.x = pos.x + this.padding.left;
		this._text.position.y = pos.y + this.padding.top;
		this._text.color = this.textColor;

		return [rect, ...this._text.render()];
	}
}

module.exports = Button;
