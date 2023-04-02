const { RectangleShape } = require('../../sfml');

const Node = require('../node/Node');
const Text = require('../node/Text');

const { Vector2D, Color, Padding } = require('../object');

class InputField extends Node {
    constructor() {
        super();

        // Defaults
        this.size = new Vector2D(150, 20);

        this._focused = false;
        this._elements = {};
        this._elements.background = new RectangleShape(this.size);
        this._elements.text = new Text();
        this._elements.focusCursor = new RectangleShape(new Vector2D(2, this.size.y));

        this.backgroundColor = new Color(200, 200, 200);
        this.textColor = new Color(0, 0, 0);

        this.padding = new Padding(5, 5, 5, 5);

        this._register_events();
    }

    _register_events() {
        this.ev.on('mouse-click', () => {
            this._focused = true;
        });
    }

    render() {
        // Sizing
        this._elements.background.setSize(this.size);
        this._elements.focusCursor.setSize(new Vector2D(
            2,
            this.size.y - this.padding.top - this.padding.bottom
        ));

        // Positioning
        this._elements.background.setPosition(this.getGlobalPosition());
        this._elements.text.position = this.getGlobalPosition().add(
            new Vector2D(this.padding.left, this.padding.top)
        );
        this._elements.focusCursor.setPosition(this._elements.text.position);

        // Coloring
        this._elements.background.setFillColor(this.backgroundColor);
        this._elements.text.color = this.textColor;
        this._elements.focusCursor.setFillColor(this.textColor);

        let retval = [this._elements.background, ...this._elements.text.render()];
        if (this._focused) {
            retval.push(this._elements.focusCursor);
        }

        return retval;
    }
}

module.exports = InputField;