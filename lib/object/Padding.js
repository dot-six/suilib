class Padding {
	// Clock-wise, unlike CSS i think
	constructor(top, right, bottom, left) {
		top = top ?? 0;

		this.top = top;
		this.right = right ?? top;
		this.bottom = bottom ?? top;
		this.left = left ?? right ?? top;
	}
}

module.exports = Padding;
