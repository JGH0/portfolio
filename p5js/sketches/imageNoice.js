let img1;

let processing = true;
let currentRow = 0;
let currentCol = 0;

async function setup() {
	img1 = await new Promise(resolve => loadImage('assets/images/Bird_Pixel_art_1.png', resolve));
	createCanvas(img1.width, img1.height);
	background(255, 255, 255)
}


function draw() {

	if (!processing){
		return;
	}


	let imgWidth = img1.width;
	let imgHeight = img1.height;
	if (currentRow < imgHeight) {
		for (let col = 0; col < imgWidth; col++) {
			let c = img1.get(col, currentRow);

			if (c[0] + c[1] + c[2] < random(0, 255) * 3) {
				c[0] = 0;
				c[1] = 0;
				c[2] = 0;
			} else {
				c[0] = 255;
				c[1] = 255;
				c[2] = 255;
			}

			stroke(color(c));
			strokeWeight(2);
			point(col, currentRow);
		}
		currentRow++;
	} else {
		processing = false;
		console.log('finished');
	}
}

function mousePressed() {

}