const { RenderWindow, VideoMode } = require('../sfml');

const Vector2D = require('./object/Vector2D');
const Tree = require('./node/Tree');

class Window {
	constructor(width=500, height=500) {
		this.size = new Vector2D(width, height);
		this.position = new Vector2D();

		this._title = 'New Window';

		this.win = new RenderWindow(
			new VideoMode(this.size.x, this.size.y),
			this.title
		);

		this.tree = new Tree();
	}

	get title() { return this._title; }
	set title(val) {
		this._title = val;
		this.win.setTitle(this.title);
	}

	// TODO: @lib/Window: set size(val) consider adding eventlistener to Vector2D

	mainLoop() {
		if (!this.win.isOpen()) return false;

		let e;
		while ((e = this.win.pollEvent())) {
			switch (e.type) {
			case 'Closed':
				this.win.close();
				return false;
			}
		}

		this.tree.draw(this.win);

		return true;
	}

	mainLoopWhile(cond=true) {
		while (cond && this.mainLoop()) {}
	}

	addChild(node) {
		this.tree.root.addChild(node);
	}
}

module.exports = Window;
