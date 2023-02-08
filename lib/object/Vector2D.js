const {
	Vector2I,
	Vector2F,
	Vector2U,
} = require('../../build/Release/binding.node');

class Vector2D {
	constructor(x=0, y=0) {
		if (Vector2D.itIs(x)) {
			y = x.y;
			x = x.x;
		}

		this.x = x;
		this.y = y;
	}

	static itIs(obj) {
		if (obj.x === undefined) return false;
		if (obj.y === undefined) return false;
		return true;
	}

	/* Getter and Setters */
	get mag() {
		// Magnitude of a vector
		return Math.sqrt(this.x**2 + this.y**2);
	}

	/* Converter */
	asVectorI() {
		return new Vector2I(this.x, this.y);
	}

	asVectorF() {
		return new Vector2F(this.x, this.y);
	}

	asVectorU() {
		return new Vector2U(this.x, this.y);
	}

	duplicate() {
		return new Vector2D(this);
	}

	/* Mathematical operations */
	add(vx, y) {
		let dup = this.duplicate();

		if (Vector2D.itIs(vx)) {
			dup.x += vx.x;
			dup.y += vx.y;
		} else {
			dup.x += vx;
			dup.y += y;
		}

		return dup;
	}

	sub(vx, y) {
		return this.add(vx.mul(-1), y);
	}

	mul(vx, y) {
		let dup = this.duplicate();

		if (Vector2D.itIs(vx)) {
			dup.x *= vx.x;
			dup.y *= vx.y;
		} else if (arguments.length == 1) {
			dup.x *= vx;
			dup.y *= vx;
		} else {
			dup.x *= vx;
			dup.y *= y;
		}

		return dup;
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

	distance(v2) {
		let vx = Math.abs(this.x - v2.x);
		let vy = Math.abs(this.y - v2.y);

		return Math.sqrt(vx**2 + vy**2);
	}

	normalize() {
		let dup = this.duplicate();

		let mag = dup.mag;
		dup.x /= mag;
		dup.y /= mag;

		return dup;
	}

	/* Comparators */
	eq(vx, y) {
		if (Vector2D.itIs(vx)) {
			y = vx.y;
			vx = vx.x;
		}

		return this.x === vx && this.y === y;
	}

	neq(vx, y) {
		return !this.eq(vx, y);
	}
}

module.exports = Vector2D;
