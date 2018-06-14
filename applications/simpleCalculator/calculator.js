class Calculator {
	constructor() {
		this.keys = ["0", ".", "1", "2", "3", "Ent", "4", "5", "6", "7", "8", "9", " + ", "ans", " / ", " * ", " - ", "c"];
		this.buttons = new Array(this.keys.length);
		this.ans= 0;
		this.input = "";
		let x = 20;
		let y = height - 120;
		for (var i = 0; i < this.buttons.length; i++) {
			let value = this.keys[i];	
			let position = createVector(x,y);
			let w = 99;
			let h = 99;
			if (i === 0) {
				w = 198;
			} else if (i === 5 || i === 12) {
				h = 198;
			} else if (i == this.keys.length-1) {
				w = 40
				h = 50
			}
			let dimensions = createVector(w,h);
			let button = new Button(value, position, dimensions);
			this.buttons[i] = button;
			if (i === 1 || i === 5 || i === 8 || i === 12) {
				x = 20;
				y = y - 100
			} else if (i == this.keys.length-2) {
				x = width-70;
				y = 23;
			} else {
				x += w;
			}		
		}
	}

	commandLine() {
		stroke(0);
		strokeWeight(2);
		fill(255, 180);
		rect(20, 80, width -45, 95)
		noStroke();
		fill(0)
		textAlign(LEFT)
		text(this.input, 40, 140)
	}

	answerLine() {
		stroke(0);
		strokeWeight(2);
		fill(255, 180);
		rect(20, 20, width-45, 60)
		noStroke();
		fill(0)
		textAlign(LEFT)
		text(this.ans, 40, 70)
	}

	show() {
		this.commandLine();
		this.answerLine();
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].show();
		}
	}

	parseInput() {
		let numReg = /[0-9]/
		let inputs = this.input.split(" ");
		let ans;
		if (numReg.test(inputs[0])) {
			ans  = parseInt(inputs[0]);
		} else {
			ans = parseInt(this.ans);
		}
		
		
		for (var i = 0; i < inputs.length-1; i++) {
			switch(inputs[i]) {
				case "+":
					ans = ans + parseInt(inputs[i+1]);
				break;
				case "-":
					ans = ans - parseInt(inputs[i+1]);
				break;
				case "*":
					ans = ans * parseInt(inputs[i+1]);
				break;
				case "/":
					ans = ans / parseInt(inputs[i+1]);
				break;
			}
		}
		this.ans = ans.toString();	
		this.buttons[13].returnValue = ans;
	}

	clearInput() {
		this.input = "";
		this.ans = "";
	}
}