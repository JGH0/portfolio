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

	createCanvas(img1.width, img1.height);
	background(255, 255, 255)

	for (let col = 0; col < img1.width; col += 1) {
		for (let row = 0; row < img1.height; row += 1) {
			let c = img1.get(col, row);
			stroke(color(c));
			strokeWeight(2);
			if (yesOrNo()) {
				point(col, row);
			}
		}
	}

	for (let col = 0; col < img2.width; col += 1) {
		for (let row = 0; row < img2.height; row += 1) {
			let c = img2.get(col, row);
			stroke(color(c));
			strokeWeight(2);
			if (yesOrNo()) {
				point(col, row);
			}
		}
	}
	console.log('finished');
}

function yesOrNo(){
	if (random(0, 1) < 0.5) {
		return true;
	}else{
		return false;
	}
}

function draw() {

}

function mousePressed() {

}