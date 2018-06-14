let target = Math.pow(10,18);
let ant = new Ant();

function start() {
	while (ant.steps < target) {
		ant.checkSquare();
		ant.steps++
		if (ant.steps % 1000000000 == 0) {
			console.log(ant);
		}
	}
}

function test() {
	ant.checkSquare();
	ant.steps++
}

function qa(num) {
	for (let i = 0; i < num; i ++) {
		test();
	}
}

function count(num) { 
	let startTime = Date.now(); 
	let c = 0; 
	for(let i = 0; i < num; i++) { 
		c++; 
	} 
	let timeTaken = (Date.now() - startTime)/1000;
	//console.log("Time taken: " + timeTaken); 
	return timeTaken;
}

function systemTest(num) {
	let results = [];
	for (let i = 0; i < num; i++) {
		let a = count(i);
		results.push(a);
	}
	return results;
}