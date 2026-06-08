let img1, img2;

async function setup() {
	try {
		img1 = await new Promise(resolve => loadImage('assets/images/dear.png', resolve));
		img2 = await new Promise(resolve => loadImage('assets/images/elphantJap.jpg', resolve));
	} catch (err) {
		console.error('Image load failed', err);
		return;
	}

	createCanvas(img1.width, img1.height);
	background(255, 255, 255)

	//image(img1, 0, 0);

	for (let col = 0; col < img1.width; col += 1) {
		for (let row = 0; row < img1.height; row += 1) {
			let c = img1.get(col, row);
			if (col % 2 == 0) {
				stroke(color(c));
				strokeWeight(1);
				square(col-1, row-1, 1);
			}
		}
	}
	console.log('img2 loaded');
	for (let col = 0; col < img2.width; col += 1) {
		for (let row = 0; row < img2.height; row += 1) {
			let c = img2.get(col, row);
			if (col % 2 == 1) {
				stroke(color(c));
				strokeWeight(1);
				square(col-1, row-1, 0.5);
			}
		}
	}
	console.log('done');
}


function draw() {

}

function mousePressed() {

}