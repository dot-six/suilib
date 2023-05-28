const Node = require('../node/Node');
const Text = require('../node/Text');
const Rectangle = require('../node/Rectangle');

const { Vector2D, Color, Padding } = require('../object');

class Modal extends Node {
	constructor(size) {
		super();
		
		if (!Vector2D.itIs(size)) throw new Error('size must be Vector2D');

		this.size = size;

		this._e = {};
		this._e.unfocusbackground = new Rectangle(new Vector2D(0, 0));
		this._e.background = new Rectangle(new Vector2D(0, 0));

		this.unfocusBackgroundColor = new Color(0, 0, 0, 50);
		this.backgroundColor = new Color(255, 255, 255);
		
		this._opened = false;
		this.disabled = true;
	}

	get opened() {
		return this._opened;
	}

	set opened(val) {
		this._opened = val;
		this.disabled = !val;
	}

	render() {
		if (!this._opened) return [];

		this._e.unfocusbackground.size = this.getWindow().size;
		this._e.unfocusbackground.backgroundColor = this.unfocusBackgroundColor;
		this._e.unfocusbackground.position = this.position.mul(-1);
		
		this._e.background.size = this.size;
		this._e.background.backgroundColor = this.backgroundColor;

		return [
			...this._e.unfocusbackground.render(), ...this._e.background.render()
		];
	}
}

module.exports = Modal;
