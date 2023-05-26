const Node = require('../node/Node');
const Text = require('../node/Text');
const Rectangle = require('../node/Rectangle');

const { Vector2D, Color, Padding } = require('../object');

class DropDown extends Node {
	constructor(items=[]) {
		super();

		this.size = new Vector2D(200, 30);
		
		if (!Array.isArray(items)) throw new Error("items is not an array");
		this.items = items;
		this.selectedIndex = 0;
		this.opened = false;

		this.backgroundColor = new Color(200, 200, 200);
		this.textColor = new Color(0, 0, 0);

		this.padding = new Padding(5, 5, 5, 5);

		this._e = {
			background: new Rectangle(this.size),
			selectedLabel: new Text()
		};

		this._register_events();
	}

	_register_events() {
		this.ev.on('mouse-click', () => {
			// Opens up dropdown
			this.opened = !this.opened;
		});
	}

	_alter_items() {
		this._e.items = [];
		for (let i = 0; i < this.items.length; i++) {
			let content = this.items[i];
			let el = new DropDownItem(content);
			el.position = this.position.add(0, this.size.y*(i+1));
			el.size = this.size;
			el.disabled = true;
			this.addChild(el);
			
			this._e.items.push(el);
		}
	}

	_item_selected(itemEl) {
		this.selectedIndex = this._e.items.indexOf(itemEl);
		this.opened = false;
	}

	addItem(item) {
		let retval = this.items.push(item)-1;
		this._alter_items();

		return retval;
	}

	removeItem(index) {
		// Remove from tree
		let _treeIndex = this.children.indexOf(this.items[index]);
		delete this.children[_DOMIndex];

		// Remove from class property
		delete this.items[index];
		this.items = this.items.filter(x => x);
		this._alter_items();
	}

	render() {
		// Positioning
		this._e.background.position = this.position;
		this._e.selectedLabel.position = this.position.add(
			new Vector2D(this.padding.left, this.padding.top)
		);

		// Sizing
		this._e.background.size = this.size;

		// Coloring
		this._e.background.backgroundColor = this.backgroundColor;
		this._e.selectedLabel.color = this.textColor;

		// Properties
		this._e.selectedLabel.content = this.items[this.selectedIndex];

		// Conditionals
		let items = [];
		if (this.opened) {
			for (let item of this._e.items) {
				items = items.concat(...item.render());
			}
		}
		
		return [
			...this._e.background.render(), ...this._e.selectedLabel.render(),
			...items
		];
	}
}

class DropDownItem extends Node {
	constructor(content) {
		super();

		this.size = new Vector2D(200, 30);
		this.content = String(content);
		
		this.backgroundColor = new Color(200, 200, 200);
		this.textColor = new Color(0, 0, 0);

		this.padding = new Padding(5, 5, 5, 5);

		this._e = {
			background: new Rectangle(this.size),
			selectedLabel: new Text()
		};

		this._register_events();
	}

	_register_events() {
		this.ev.on('mouse-click', () => {
			// Opens up dropdown
			this.parent._item_selected(this);
		});
	}

	render() {
		// Positioning
		this._e.background.position = this.position;
		this._e.selectedLabel.position = this.position.add(
			new Vector2D(this.padding.left, this.padding.top)
		);

		// Sizing
		this._e.background.size = this.size;

		// Coloring
		this._e.background.backgroundColor = this.backgroundColor;
		this._e.selectedLabel.color = this.textColor;

		// Properties
		this._e.selectedLabel.content = this.content;
		
		return [...this._e.background.render(), ...this._e.selectedLabel.render()];
	}
}

module.exports = DropDown;
