class Tile {
	constructor(pos, colour) {
		this.pos = pos;
		this.colour = colour;
	}

	flipColour() {
		if (this.colour == 255) {
			this.colour = 0;
			return;
		} else if (this.colour == 0) {
			this.colour = 255;
			return;
		}
	}
}