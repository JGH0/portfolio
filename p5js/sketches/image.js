let img1, img2;
let processing = false;
let pass = 1;
let currentRow = 0;
let isDrawing = false;
let currentDirection = 1;
let rows = 1;
let cols = 3;

async function setup() {
	try {
		img1 = await new Promise(resolve => loadImage('assets/images/dear.png', resolve));
		console.log('img1 loaded');
	} catch (err) {
		console.error('Failed to load dear.png', err);
	}

	try {
		img2 = await new Promise(resolve => loadImage('assets/images/elphantJap.jpg', resolve));
		console.log('img2 loaded');
	} catch (err) {
		console.error('Failed to load elphantJap.jpg', err);
	}

	// Only proceed if both images loaded
	if (!img1 || !img2) return;

	createCanvas(img1.width, img1.height);
	background(255, 255, 255);
}

function draw() {
	if (!isDrawing) {
		currentDirection = floor(random(1, 7));
		isDrawing = true;
		rows = floor(random(1, 3));
		cols = floor(random(3, 5));
	}
	switch (currentDirection) {
		case 5:
			drawImages(floor(random(1, 5)));
			break;
		case 6:
			// corner to corner
				if (random() < 0.5) {
					drawImages(rows);
				}else {
					drawImages(cols);
				}
			break;
		default:
			drawImages(currentDirection);
	}
}

function shouldDraw() {
	return random() < 0.5;
}

function drawPixelDot(img, col, row) {
	if (shouldDraw() === false) {
		return;
	}
	let c = img.get(col, row);
	fill(red(c), green(c), blue(c));
	noStroke();
	let offsetX = random(-0.4, 0.4);
	let offsetY = random(-0.4, 0.4);
	circle(col + offsetX, row + offsetY, 0.8);
}

function drawDirection(w, h, img, direction) {
	// direction = 1: top to bottom (rows)
	// direction = 2: bottom to top (rows)
	// direction = 3: left to right (columns)
	// direction = 4: right to left (columns)

	if (direction === 1) {
		if (currentRow < h) {
			for (let col = 0; col < w; col++) {
				drawPixelDot(img, col, currentRow);
			}
			currentRow++;
		} else {
			switchPass();
			currentRow = 0;
		}
	}
	else if (direction === 2) {
		if (currentRow < h) {
			let row = h - 1 - currentRow;
			for (let col = 0; col < w; col++) {
				drawPixelDot(img, col, row);
			}
			currentRow++;
		} else {
			switchPass();
			currentRow = 0;
		}
	}
	else if (direction === 3) {
		if (currentRow < w) {
			let col = currentRow;
			for (let row = 0; row < h; row++) {
				drawPixelDot(img, col, row);
			}
			currentRow++;
		} else {
			switchPass();
			currentRow = 0;
		}
	}
	else if (direction === 4) {
		if (currentRow < w) {
			let col = w - 1 - currentRow;
			for (let row = 0; row < h; row++) {
				drawPixelDot(img, col, row);
			}
			currentRow++;
		} else {
			switchPass();
			currentRow = 0;
		}
	}
}

function drawImages(direction) {

	let img;
	if (pass === 1) {
		img = img1;
	}
	else if (pass === 2) {
		img = img2;
	}
	else throw new Error('Invalid pass');

	drawDirection(img.width, img.height, img, direction);
}

function switchPass(){
	//big brain activated with this one
	pass = 3 - pass;
	isDrawing = false;
}

function mousePressed() {

}