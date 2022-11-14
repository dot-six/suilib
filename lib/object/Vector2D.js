const {
	Vector2I,
	Vector2F,
	Vector2U,
} = require('../../build/Release/binding.node');

module.exports = class Vector2D {
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}

	static itIs(obj) {
		if (obj.x === undefined) return false;
		if (obj.y === undefined) return false;
		return true;
	}

	asVectorI() {
		return new Vector2I(this.x, this.y);
	}

	asVectorF() {
		return new Vector2F(this.x, this.y);
	}

	asVectorU() {
		return new Vector2U(this.x, this.y);
	}

	add(vx, y) {
		if (Vector2D.itIs(vx)) {
			this.x += vx.x;
			this.y += vx.y;
		} else {
			this.x += vx;
			this.y += y;
		}

		return this;
	}

	sub(vx, y) {
		return this.add(vx.mul(-1), y);
	}

	mul(vx, y) {
		if (Vector2D.itIs(vx)) {
			this.x *= vx.x;
			this.y *= vx.y;
		} else if (arguments.length == 1) {
			this.x *= vx;
			this.y *= vx;
		} else {
			this.x *= vx;
			this.y *= y;
		}

		return this;
	}

	div(vx, y) {
		if (Vector2D.itIs(vx)) {
			vx = new Vector2D(
				1/vx.x,
				1/vx.y
			);
		}

		return this.mul(vx, y);
	}
};
