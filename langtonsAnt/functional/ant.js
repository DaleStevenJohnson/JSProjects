class Ant {
	constructor() {
		this.pos = { x:0, y:0};
		this.facing = "north";
		this.steps = 0;
		this.tileArchive = [];
		this.visitedTiles = [];
	}
	//- if it is on a black square, it flips the color of the square to white, rotates 90 degrees counterclockwise and moves forward one square.
	//- if it is on a white square, it flips the color of the square to black, rotates 90 degrees clockwise and moves forward one square.
	checkSquare() {
		let tile;
		let visited = false;
		for (let t of this.visitedTiles) {
			if (t.pos.x == this.pos.x && t.pos.y == this.pos.y) {
				t.flipColour();
				if(t.colour == 255) {
					this.visitedTiles.splice(this.visitedTiles.indexOf(t), 1)
				}
				visited = true;
				tile = t;
				break;
			}
		}
		if(!visited && this.tileArchive.length > 0) {
			console.log("Searching Archives...");
			for (let t of this.tileArchive) {
				if (t.pos.x == this.pos.x && t.pos.y == this.pos.y) {
					t.flipColour();
					if(t.colour == 255) {
						this.tileArchive.splice(this.tileArchive.indexOf(t), 1)
					} else if (t.colour == 0) {
						let temp = this.tileArchive.splice(this.tileArchive.indexOf(t), 1);
						this.visitedTiles.push(temp[0]);
						this.archiveTiles();
					}
					visited = true;
					tile = t;
					break;
				}
			}
		}
		if (!visited) {
			let b = Object.assign({}, this.pos);
			let t = new Tile(b, 255);
			t.flipColour();
			this.visitedTiles.push(t);
			this.archiveTiles();
			tile = t;
		}
		let cardinals = ["north", "east", "south", "west"];
		let index = cardinals.indexOf(this.facing);
		if (tile.colour == 0) {
			index--;
			if (index < 0) {
				index = 3;
			}
		} else if (tile.colour == 255) {
			index++;
			if (index > 3) {
				index = 0;
			}
		}
		this.facing = cardinals[index];
		this.move();
		
	}

    move() {
    	switch (this.facing) {
    		case "north": 
    			this.pos.y--
    		break;
    		case "east":
    			this.pos.x++
    		break;
    		case "south": 
    			this.pos.y++    			
    		break;
    		case "west": 
    			this.pos.x--
    		break;
    	}
    }

    archiveTiles() {
	    if (this.visitedTiles.length > 1000) {
			let c = this.visitedTiles.splice(0,1);
			this.tileArchive.push(c[0]);
		}
	}
}