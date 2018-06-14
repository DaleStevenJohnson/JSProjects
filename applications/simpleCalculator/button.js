class Button {
	constructor (value, position, size) {
		this.value = value;
		this.pos = position;
		this.size = size;
		this.textSize = 50;
		if (this.value == "ans") {
			this.returnValue = 0;
		}
	}

	show() {
		fill(200);
		stroke(255)
		strokeWeight(2)
		rect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		noStroke()
		fill(255)
		textAlign(CENTER)
		textSize(this.textSize)
		text(this.value, this.pos.x+(this.size.x/2), this.pos.y+(this.size.y/2)+15) //, this.pos.x+this.size.x, this.pos.y+this.size.y)
	}

	clicked() {
		if (this.value == "ans") {
			return false;
		} else if (this.value == "Ent") {
			calculator.parseInput();
			return false;
		} else if (this.value == "c") {
			calculator.clearInput();
			return false;
		} else {
			return true;
		}
		
	}
}