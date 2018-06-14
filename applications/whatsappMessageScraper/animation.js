function setup() {
	createCanvas(800,600);
	frameRate(10);
	background(255, 200);
	let c = b[0].word;
	for(let i = 1; i < b.length; i++) {
		c += " " + b[i].word;
	}
	
	textSize(20);
	text(c,0,0,width,height);

}

function draw() {
	
}

function displayWords(arr) {
		let x = 10;
		let y = 10;

	for (let i = 0; i < arr.length; i++) {
		//textSize(b[i].frequency/4);
		textSize(30);
		text(b[i].word,x,y, x + 30, y + 30);
		x+=30;//b[i].frequency/4;
		if (x > width - 30) {//width-b[i].frequency/4) {
			x = 10;
			y+=30
		}
	}
	
}