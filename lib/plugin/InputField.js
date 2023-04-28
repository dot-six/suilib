const { RectangleShape } = require('../../sfml');

const Node = require('../node/Node');
const Text = require('../node/Text');

const { Vector2D, Color, Padding } = require('../object');

const SPECIAL_KEYS_FUNCTION = {
    'Backspace': function (v) {
        return v.substring(0, this._cursorPosition-1) + v.substring(this._cursorPosition--);
    },
    'Space': function (v) {
        return insertString(v, ' ', this._cursorPosition++);
    },
    'Delete': function (v) {
        return v.substring(0, this._cursorPosition) + v.substring(this._cursorPosition + 1);
    },
    'Home': function (v) { this._cursorPosition = 0; return v; },
    'End': function (v) { this._cursorPosition = v.length; return v; }
};

function insertString(s, ch, index) {
    return s.substring(0, index) + ch + s.substring(index);
}

class InputField extends Node {
    constructor() {
        super();

        // Defaults
        this.size = new Vector2D(200, 30);

        this._value = '';
        this._elements = {};
        this._elements.background = new RectangleShape(this.size);
        this._elements.text = new Text();
        this._elements.focusCursor = new RectangleShape(new Vector2D(2, this.size.y));

        this._cursorPosition = 0;

        this.backgroundColor = new Color(200, 200, 200);
        this.textColor = new Color(0, 0, 0);

        this.padding = new Padding(5, 5, 5, 5);

        this._register_events();
    }

    set value(val) {
        this._value = val;
        this.ev.emit('change', this.value);
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
            if (e.code == -1) return;

            let ch = e.codeStr;

            if (ch.length > 1) {
                if (SPECIAL_KEYS_FUNCTION[ch]) {
                    this.value = SPECIAL_KEYS_FUNCTION[ch].call(this, this.value);
                }

                if (ch == "Left") {
                    this._cursorPosition--;
                } else if (ch == "Right") {
                    this._cursorPosition++;
                }
            } else {
                if (!e.shift) {
                    ch = ch.toLowerCase();
                }

                this.value = insertString(this.value, ch, this._cursorPosition);
                this._cursorPosition++;
            }

            console.log(this._cursorPosition, this.value);
        });
    }

    clear() {
        this.value = '';
    }

    setFont(font) {
        this._elements.text.setFont(font);
    }

    render() {
        // Value normalizations
        this._cursorPosition = Math.max(Math.min(this._cursorPosition, this._value.length), 0);

        // Sizing
        this._elements.background.setSize(this.size);
        this._elements.focusCursor.setSize(new Vector2D(
            2,
            this.size.y - this.padding.top - this.padding.bottom
        ));
        this._elements.text.fontSize = this.size.y - this.padding.top - this.padding.bottom;

        // Positioning
        this._elements.background.setPosition(this.getGlobalPosition());
        // TODO: @lib/plugin/InputField: Properly vertical-center the text value
        this._elements.text.position = this.getGlobalPosition().add(
            new Vector2D(this.padding.left, this.padding.top)
        );

        // TODO: @lib/plugin/InputField: sEmptyWidth is having redundant expression evaluation, fix it.
        let sEmptyWidth = this._elements.text._t.findCharacterPos(0).x;
        let sWidth = this._elements.text._t.findCharacterPos(this._cursorPosition).x;
        sWidth -= sEmptyWidth;
        this._elements.focusCursor.setPosition(this._elements.text.position.add(
            sWidth, 0
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
