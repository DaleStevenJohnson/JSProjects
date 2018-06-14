let ant;
let alphabet = makeAlphabet();
let rowHeaders = alphabet.slice();
let grid;
let maxSteps = Math.pow(10,18);
let gridX = 1005;
let gridY = 1005;
let middle = Math.floor((gridX*gridY)/2);
function setup() {
	createCanvas(800, 800);
	grid = new Grid(gridX,gridY);
	grid.create();
	let t = grid.tiles[middle];
	ant = new Ant(t.row, Math.floor(gridX/2), middle);
	
}

function draw() {
	background(100)
	for (let i = 0; i < 10; i++) {
		if (ant.steps < maxSteps) {
			ant.checkSquare();
			textSize(32);
			fill(0);
			text(ant.steps, 10, 30);
			text(maxSteps, 10, 61);
			ant.steps++;
		} else if (ant.steps == maxSteps) {
			console.log(grid);
		}
	}
}

function makeAlphabet() {
	let a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	let b = a.slice();
	let count = 1;
	let index = 0;

	while (a.length < 1000) {

		a.push(b[index] + count);
		index++ 
		if (index == b.length) {
			index = 0;
			count++;
		}
	}
	return a;
}