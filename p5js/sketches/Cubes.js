var size = 0
var randomX = 0
var randomY = 0
var mouseIndex = 0

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255, 255, 255)
	noFill();
	for (i = 0; i < 30; i++) {
		size = random(0, 15) * i;
		randomX = random(-width / 10, width / 10);
		randomY = random(-height / 10, height / 10);
		square(width / 2 + randomX - size / 2, height / 2 + randomY - size / 2, size);
	}
}


function draw() {

}

function mousePressed() {
	mouseIndex++
	size = random(0, 15) * i;
	randomX = random(-width / 10, width / 10);
	randomY = random(-height / 10, height / 10);
	square(width / 2 + randomX - size / 2, height / 2 + randomY - size / 2, size);
}