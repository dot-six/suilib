const { VertexArray: SFVertexArray } = require('../../build/Release/binding.node');

const Node = require('./Node');
const Vector2D = require('../object/Vector2D');

class Tree {
	constructor() {
		this.root = new Node();
	}

	walk(cb) {
		let walk = (node) => {
			let cont = cb(node) ?? true;
			if (!cont) return cont;

			for (const child of node.children) {
				walk(child);
			}
		};

		return walk(this.root);
	}

	draw(win) {
		win.clear(-1);

		let walkCb = (node) => {
			let drawables = node.render();

			if (drawables?.length) {
				// Get global position
				let pos = node.getGlobalPosition();

				for (let drawable of drawables) {
					// Change its position
					if (drawable instanceof SFVertexArray) {
						// TODO: @lib/node/Tree: Adjust VertexArray position for render
					} else {
						let posd = drawable.getPosition();
						let posdFinal = new Vector2D(posd.x, posd.y).add(pos);
						drawable.setPosition(posdFinal.asVectorF());
					}

					// Then draw
					win.draw(drawable);
				}
			}
		};

		this.walk(walkCb);

		win.display();
	}
}

module.exports = Tree;
