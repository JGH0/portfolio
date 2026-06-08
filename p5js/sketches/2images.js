let img1, img2;
let processing = false;
let pass = 1;
let currentRow = 0;

async function setup() {
	try {
		img1 = await new Promise(resolve => loadImage('assets/images/dear.png', resolve));
		img2 = await new Promise(resolve => loadImage('assets/images/elphantJap.jpg', resolve));
	} catch (err) {
		console.error('Image load failed', err);
		return;
	}

	createCanvas(img1.width, img1.height);
	background(255, 255, 255);
	processing = true;
}

function draw() {
	if (!processing) return;

	if (pass === 1) {
		// Draw one row of img1 squares
		if (currentRow < img1.height) {
			for (let col = 0; col < img1.width; col++) {
				if (col % 2 === 0) {
					let c = img1.get(col, currentRow);
					stroke(color(c));
					strokeWeight(1);
					square(col - 1, currentRow - 1, 1);
				}
			}
			currentRow++;
		} else {
			// Finished all rows of img1, move to pass 2
			pass = 2;
			currentRow = 0;
		}
	} 
	else if (pass === 2) {
		// Draw one row of img2 squares
		if (currentRow < img2.height) {
			for (let col = 0; col < img2.width; col++) {
				if (col % 2 === 1) {
					let c = img2.get(col, currentRow);
					stroke(color(c));
					strokeWeight(1);
					square(col - 1, currentRow - 1, 0.5);
				}
			}
			currentRow++;
		} else {
			processing = false;
			console.log('done');
		}
	}
}

function mousePressed() {

}