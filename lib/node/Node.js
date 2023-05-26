const EventEmitter = require('events');
const crypto = require('crypto');

const Vector2D = require('../object/Vector2D');
const Region = require('../object/Region');

module.exports = class Node {
	constructor() {
		// TODO: @lib/node/Node: Generate Node.id by incrementing, way performant.
		this.id = crypto.randomBytes(10).toString('hex');

		// TODO: @lib/node/Node: Add .cursor property
		this.position = new Vector2D();
		this.size = new Vector2D();
		this.anchor = new Vector2D();
	
		this.parent = null;
		this.children = [];
		this.disabled = false;

		this.ev = new EventEmitter();
	}

	/* Must-have methods */
	getGlobalPosition() {
		let pos = this.position.add(0, 0);
		let parent = this.parent;

		while (parent) {
			pos = pos.add(parent.position);
			parent = parent.parent;
		}

		return pos;
	}

	getRegion() {
		let pos = this.getGlobalPosition();
		let start = new Vector2D(pos);
		let end = new Vector2D(pos.add(this.size));

		let region = new Region(start, end);
		return region;
	}

	getWindow() {
		let node = this;
		while (node.parent) {
			node = node.parent;
		}

		return node.parentWindow;
	}

	addChild(child, index=-1) {
		child.parent = this;

		if (index < 0) {
			return this.children.push(child) - 1;
		} else {
			this.children.splice(index, 0, child);
			return index;
		}
	}

	duplicate() {
		let n = new Vector2D();
		n.id = this.id;
		n.position = this.position.duplicate();
		n.size = this.size.duplicate();
		n.parent = this.parent;

		n.children = this.children.map(c => {
			let a = c.duplicate();
			a.parent = n;
			return a;
		});

		n.ev = new EventEmitter();
		let events = this.ev.eventNames();
		for (const event of events) {
			for (const listener of this.ev.rawListeners(event)) {
				n.ev.on(event, listener);
			}
		}

		return b;
	}

	compare(rhand) {
		if (rhand.id !== this.id) return false;
		if (rhand.position.neq(this.position)) return false;
		if (rhand.size.neq(this.size)) return false;

		// ignore parent
		// ignore children

		return true;
	}

	render() {
		return undefined;
	}
};
