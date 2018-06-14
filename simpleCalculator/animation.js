let calculator;

function setup() {
	createCanvas(440, 700);
	calculator = new Calculator();
}

function mousePressed() {
	for (var i = 0; i<calculator.buttons.length; i++) {
		let button = calculator.buttons[i];
		if(mouseX > button.pos.x && mouseX < button.pos.x + button.size.x && mouseY > button.pos.y && mouseY < button.pos.y + button.size.y) {
			let bool = button.clicked();
			if (bool) {
				calculator.input += button.value;
				break;
			} else if (!bool) {
				if(button.returnValue) {
					calculator.input += button.returnValue;
					break;
				} else if (button.value == "Ent") {
					calculator.input = "";
				}
				
			}
			
		} 
	}
}

function draw() {
 	background(255);
 	calculator.show();

}