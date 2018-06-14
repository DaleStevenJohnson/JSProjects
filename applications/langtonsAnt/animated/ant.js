class Ant {
	constructor(row, column, index) {
		this.steps = 0;
		this.row = row;
		this.column = column;
		this.facing = "north";
		this.gridIndex = index;
	}

	show() {
		ellipse()
	}

	//- if it is on a black square, it flips the color of the square to white, rotates 90 degrees counterclockwise and moves forward one square.
	//- if it is on a white square, it flips the color of the square to black, rotates 90 degrees clockwise and moves forward one square.
	checkSquare() {
		
		for (let i = this.gridIndex - Math.floor(gridX*2); i <  this.gridIndex + Math.floor(gridX*2); i++) {
			grid.tiles[i].show();
		}
			let t = grid.tiles[this.gridIndex];
			if (this.row == t.row && this.column == t.column) {
				
				let cardinals = ["north", "east", "south", "west"];
				let index = cardinals.indexOf(this.facing);
				if (t.colour == 0) {
					index--;
					if (index < 0) {
						index = 3;
					}
				} else if (t.colour == 255) {
					index++;
					if (index > 3) {
						index = 0;
					}
				}
				this.facing = cardinals[index];
				this.gridIndex += this.move();
				t.flipColour();
				return;
			}
			
		//}
	}

    move() {
    	let index = alphabet.indexOf(this.row);
    	let a = gridX
    	switch (this.facing) {
    		case "north": 
    			index-- 
    			this.row = alphabet[index];
    			return -a;
    		break;
    		case "east":
    			this.column++
    			return +1
    		break;
    		case "south": 
    			index++; 
    			this.row = alphabet[index];
    			return a;
    		break;
    		case "west": 
    			this.column--;
    			return -1
    		break;
    	}
    }
}