let img1, img2;
let mode = [0,0,0]; // rgb each coloum says if 1 look for bigger if -1 look for smaller if 0 ignore in decition
let imageList = [ "assets/images/Arch-linux-pixelated.png", "assets/images/pixel-pepe.gif", "assets/images/Bird_Pixel_art_1.png"];
let loadedImages = [];
let doubleContinue = false;

let processing = false;
let currentRow = 0;
let currentCol = 0;

async function setup() {
	makeRandomMode();
	console.log(mode);
	for (i = 0; i < imageList.length; i++) {
		try {
			loadedImages[i] = await new Promise(resolve => loadImage(imageList[i], resolve));
			console.log(imageList[i] + " loaded");
		} catch (err) {
			console.error('Failed to load ' + imageList[i], err);
		}
	}
	if (loadedImages.length == 0) {
		throw new Error('No images loaded');
		return;
	}

	createCanvas(loadedImages[0].width, loadedImages[0].height);
	background(255, 255, 255);
	strokeWeight(2);

	processing = true;
	currentRow = 0;
	currentCol = 0;
}

function draw() {
	if (!processing) return;

	// Process one row per frame
	let imgWidth = loadedImages[0].width;
	let imgHeight = loadedImages[0].height;

	if (currentRow < imgHeight) {
		for (let col = 0; col < imgWidth; col++) {
			// Check if pixel eixsts
			let pixelValid = true;
			for (let i = 0; i < loadedImages.length; i++) {
				if (loadedImages[i].get(col, currentRow) == null || loadedImages[i].get(col, currentRow) == undefined) {
					pixelValid = false;
					break;
				}
			}
			if (!pixelValid) {
				continue;
			}

			stroke(color(checkWhatPixelToTake(col, currentRow)));
			point(col, currentRow);
		}
		currentRow++;
	} else {
		processing = false;
		console.log('finished');
	}
}

function makeRandomMode() {
	mode = [round(random(-1, 1)), round(random(-1, 1)), round(random(-1, 1))];
	if (abs(mode[0]) + abs(mode[1]) + abs(mode[2]) === 0) {
		mode = [1, 1, 1];
	}
}

function checkWhatPixelToTake(col, row) {
	let sumImage = [];
	for (let i = 0; i < loadedImages.length; i++) {
		sumImage[i] = 0;
	}
	for (let i = 0; i <= 2; i++) {
		if (mode[i] == 1) {
			for (let j = 0; j < loadedImages.length; j++) {
				sumImage[j] += loadedImages[j].get(col, row)[i];
			}
		} else if (mode[i] == -1) {
			for (let j = 0; j < loadedImages.length; j++) {
				sumImage[j] += (255 - loadedImages[j].get(col, row)[i]);
			}
		}
	}
	let bestSum = 0;
	let bestSumIndex = -1;
	for (let i = 0; i < sumImage.length; i++) {
		if (sumImage[i] >= bestSum) {
			bestSum = sumImage[i];
			bestSumIndex = i;
		}
	}
	if (bestSumIndex == -1) {
		console.error('best pixel not found');
		return loadedImages[0].get(col, row);
	}
	return loadedImages[bestSumIndex].get(col, row);
}

function mousePressed() {

}