const { RectangleShape } = require('../../sfml');

const Node = require('../node/Node');
const Text = require('../node/Text');

const { Vector2D, Color, Padding } = require('../object');

class InputField extends Node {
    constructor() {
        super();

        // Defaults
        this.size = new Vector2D(150, 20);

        this._value = '';
        this._elements = {};
        this._elements.background = new RectangleShape(this.size);
        this._elements.text = new Text();
        this._elements.focusCursor = new RectangleShape(new Vector2D(2, this.size.y));

        this.backgroundColor = new Color(200, 200, 200);
        this.textColor = new Color(0, 0, 0);

        this.padding = new Padding(5, 5, 5, 5);

        this._register_events();
    }

    set value(val) {
        this._value = val;
    }

    get value() {
        return this._value;
    }

    _register_events() {
        this.ev.on('mouse-click', () => {
            this._elements.focusCursor.enabled = true;

            // Register an interval
            this._elements.blinkingCursorInterval = this.getWindow().setInterval(() => {
                this._elements.focusCursor.enabled = !this._elements.focusCursor.enabled;
            }, 1000);
        });

        this.ev.on('key-up', (e) => {
            if (e.key == -1) return;
            if (e.key > 25) return;

            let ch = e.codeStr;

            if (ch == "Backspace") {
                this.value = this.value.substring(0, this.value.length-1);
            } else {
                this.value += ch;
            }
        });
    }

    render() {
        // Sizing
        this._elements.background.setSize(this.size);
        this._elements.focusCursor.setSize(new Vector2D(
            2,
            this.size.y - this.padding.top - this.padding.bottom
        ));
        this._elements.text.fontSize = this.size.y - this.padding.top - this.padding.bottom;

        // Positioning
        this._elements.background.setPosition(this.getGlobalPosition());
        this._elements.text.position = this.getGlobalPosition().add(
            new Vector2D(this.padding.left, this.padding.top)
        );
        this._elements.focusCursor.setPosition(this._elements.text.position.add(
            this._elements.text.size.x + 2, 0
        ));

        // Coloring
        this._elements.background.setFillColor(this.backgroundColor);
        this._elements.text.color = this.textColor;
        this._elements.focusCursor.setFillColor(this.textColor);

        // Adding text
        this._elements.text.content = this._value;

        let retval = [this._elements.background, ...this._elements.text.render()];

        let mainWindow = this.getWindow();
        if (mainWindow.focus === this && this._elements.focusCursor.enabled) {
            retval.push(this._elements.focusCursor);
        } else if (this._elements.blinkingCursorInterval) {
            mainWindow.clearInterval(this._elements.blinkingCursorInterval);
        }

        return retval;
    }
}

module.exports = InputField;