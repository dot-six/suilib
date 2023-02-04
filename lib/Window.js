const { RenderWindow, VideoMode } = require('../sfml');

const Vector2D = require('./object/Vector2D');
const Tree = require('./node/Tree');
const WindowStyle = require('./object/WindowStyle');

class Window {
	constructor(width=500, height=500, style=WindowStyle.Default) {
		// General
		this.size = new Vector2D(width, height);
		this.position = new Vector2D();

		// Privates
		this._title = 'New Window';
		this._lastDelta = Date.now();

		// Events
		this.eventState = {};
		this.focus = null;
		this._intervals = [];
		this.delta = 0;

		// Components
		this.tree = new Tree();
		this.win = new RenderWindow(
			new VideoMode(this.size.x, this.size.y),
			this.title,
			style
		);
	}

	get title() { return this._title; }
	set title(val) {
		this._title = val;
		this.win.setTitle(this.title);
	}

	// TODO: @lib/Window: set size(val) consider adding eventlistener to Vector2D

	click(x, y, button, buttonStr) {
		// TODO: @lib/Window: omit buttonStr, use button only
		let delta = Date.now() - this.eventState['MouseButtonPressed'];

		// Walk the tree
		let point = new Vector2D(x, y);
		let focus = null;
		// TODO: @lib/node/Tree: Add walkRegion(reg, callback) to effectively walk within specific region
		this.tree.walk((node) => {
			let reg = node.getRegion();
			if (reg.contains(point)) {
				// Try to get the most specific region ever
				focus = node;
			}

			return true;
		});

		// Fire the event
		// TODO: @lib/Window: Let node have .getEventListener method to customize their own eventListener
		if (focus && focus.ev && typeof focus.ev.emit == 'function') {
			focus.ev.emit('mouse-click');
		}

		this.focus = focus;

		delete this.eventState['MouseButtonPressed'];
		return this.focus;
	}

	close() {
		this.win.close();
	}

	requestFocus() {
		this.win.requestFocus();
	}

	setFramerateLimit(fps) {
		this.win.setFramerateLimit(fps);
	}

	setPosition(pos) {
		this.win.setPosition(pos.asVectorI());
	}

	setInterval(func, intervalMs) {
		return this._intervals.push({func, intervalMs}) - 1;
	}

	mainLoop() {
		if (!this.win.isOpen()) return false;

		let e;
		while ((e = this.win.pollEvent())) {
			switch (e.type) {
			case 'Closed':
				this.win.close();
				return false;
			case 'MouseButtonPressed':
				this.eventState[e.type] = Date.now();
				break;
			case 'MouseButtonReleased':
				if (this.eventState['MouseButtonPressed']) {
					let {x, y, button, buttonStr} = e.mouseButton;
					this.click(x, y, button, buttonStr);
				}
				break;
			}
		}

		// Run each intervals
		// WARN: Will this make race condition by having two Date.now calls?
		this.delta = Date.now() - this._lastDelta;
		this._lastDelta = Date.now();

		for (const interval of this._intervals) {
			if (interval === undefined) continue;
			if (!(interval.func && interval.intervalMs)) continue;

			interval.timer -= this.delta;

			if (interval.timer <= 0) {
				// Calculate missing calls
				let missingCalls = Math.floor(this.delta / interval.intervalMs) + 1;

				// Call missing calls
				for (let ix = 0; ix < missingCalls; ix++) {
					interval.func();
				}

				// Reset timer
				interval.timer = interval.intervalMs;
			}
		}

		// Draw tree
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
