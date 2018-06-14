class Grid {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.cellW = width/this.cols;
		this.cellH = height/this.rows;
		this.tiles = [];
	}

	create() {
		let x = 0;
		let y = 0; 
		for (let i = 0; i < this.rows; i++) {
			let currentRow = alphabet[i];
			for (let j = 0; j < this.cols; j++) {
				let currentColumn = j;
				let pos = createVector(x,y);
				let size = createVector(this.cellW,this.cellH);
				this.tiles.push(new Tile(pos, size, currentRow, currentColumn, 255));
				x += this.cellW
			}
			x = 0;
			y += this.cellH;
		}
	}

	show() {
		for (let t of this.tiles) {
			t.show();
		}
	}


}

class Tile {
	constructor(pos, size, row, column, colour) {
		this.pos = pos;
		this.size = size;
		this.row = row;
		this.column = column;
		this.colour = colour;
	}

	show() {
		fill(this.colour)
		//strokeWeight(5);
		//stroke(0);
		noStroke();
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
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