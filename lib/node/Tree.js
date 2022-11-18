const Node = require('./Node');

class Tree {
	constructor() {
		this.root = new Node();
	}

	draw(win) {
		let walk = (node) => {
			let drawables = node.render();

			if (drawables?.length) {
				// Get global position
				let pos = node.getGlobalPosition();

				for (let drawable of drawables) {
					// Change its position
					drawable.position = drawable.position.add(pos);
					// Then draw
					win.draw(drawable);
				}
			}

			for (const child of node.children) {
				walk(child);
			}
		};

		walk(this.root);
	}
}

module.exports = Tree;
