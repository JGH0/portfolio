function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(random(100, 200), 0, random(100, 200));

	for (let i = 0; i <= width * sqrt(2); i += 10) {
		stroke(random(255), random(255), random(255))
		strokeWeight(width / 70)
		noFill()
		circle(width / 2 + random(0, 30), height / 2 + random(0, 30), i)

		const strokeValue = i % 20 ? 100 : 0;
		stroke(strokeValue)
	}

	for (let i = 0; i < 50; i++) {
		stroke(random(255), random(255), random(255))
		let x = random(0, width)
		let y = random(0, height)
		line(width / 2, height / 2, x, y)
	}
}

function mousePressed() {
	for (let i = 0; i < 50; i++) {
		stroke(random(255), random(255), random(255))
		let x = random(0, width)
		let y = random(0, height)
		line(mouseX, mouseY, x, y)
	}
}