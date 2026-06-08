const circleMaxSize = 30;
const circleMinSize = 5;
let maxcircleAmount = 2;
const circleCords = [];
let maxTries = 100;
let area = [];
let moveToNextSpotVariable= [];
let x, y, diameter, circleCordsConst, isCircleCollided, tries, insideTry = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	maxcircleAmount = maxTries = floor(width);
	console.log(maxTries);
	console.log(maxcircleAmount);
	background(255, 255, 255);
	//randomSeed(99);

	generateCircleAlgorithm(0, width, 0, height , maxcircleAmount, maxTries);

}

/**
 * Checks if two circles are colliding.
 * @param {number} x - The x coordinate of the first circle.
 * @param {number} y - The y coordinate of the first circle.
 * @param {number} diameter - The diameter of the first circle.
 * @param {Array<number>} circle - The coordinates and diameter of the second circle.
 * @returns {boolean} True if the circles are colliding, false otherwise.
 */
function circleCollision(x, y, diameter, circle) {
	if (dist(x, y, circle[0], circle[1]) <= (diameter + circle[2]) * 0.5) {
		return true;
	}
	return false;
}

function moveToNextSpot(x, y, diameter, circle) {
	if (circleCollision(x, y, diameter, circle)) {
		if (x < circle[0]) {
			x = circle[0] - ((diameter + circle[2]));
		} else if (x > circle[0]) {
			x = circle[0] + ((diameter + circle[2]));
		}
		if (y < circle[1]) {
			y = circle[1] - ((diameter + circle[2]));
		} else if (y > circle[1]) {
			y = circle[1] + ((diameter + circle[2]));
		}
	}
	return [x, y];
}


/**
 * Generates circles within a given region.
 * The generated circles are stored in the global circleCords array.
 * This function will stop generating circles if it cannot find a non-colliding spot within maxTries attempts.
 * @param {number} minWidth - The minimum width of the region.
 * @param {number} maxWidth - The maximum width of the region.
 * @param {number} minHeight - The minimum height of the region.
 * @param {number} maxHeight - The maximum height of the region.
 * @param {number} maxcircleAmount - The maximum number of circles to generate.
 * @param {number} maxTries - The maximum number of attempts to find a non-colliding spot.
*/
function generateCircleAlgorithm(minWidth,maxWidth,minHeight,maxHeight, maxcircleAmount, maxTries) {
	for (let i = 0; i < maxcircleAmount; i++) {
		x = random(minWidth, maxWidth);
		y = random(minHeight, maxHeight);
		diameter = random(circleMinSize, circleMaxSize);

		if (!circleCords.length) {
			circleCords.push([x, y, diameter]);
		}

		circleCordsConst = circleCords.length;
		isCircleCollided = 0;
		insideTry = 0;
		//check for collision
		for (let j = 0; j < circleCordsConst; j++) {
			moveToNextSpotVariable = moveToNextSpot(x, y, diameter, circleCords[j]);
			if (moveToNextSpotVariable[0] !== x || moveToNextSpotVariable[1] !== y) {
				j = 0;
				insideTry++;
				if (insideTry > 1) {
					isCircleCollided = 1;
					break;
				}
			}
			x = moveToNextSpotVariable[0];
			y = moveToNextSpotVariable[1];
			if (circleCollision(x, y, diameter, circleCords[j])) {
				isCircleCollided = 1;
				break;
			}
		}
		if (!isCircleCollided) {
			circleCords.push([x, y, diameter]);
		} else {
			if (tries > maxTries) {
				break;
			}
			tries++;
			i--;
		}
	}

	//draw
	for (let i = 0; i < circleCords.length; i++) {
		stroke(0);
		strokeWeight(1);
		noFill();
		fill(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
		circle(circleCords[i][0], circleCords[i][1], circleCords[i][2]);
	}
}

function draw() {

}

function mousePressed() {
	for (let i = 0; i < circleCords.length; i++) {
		if (circleCollision(mouseX, mouseY, 1, circleCords[i])) {
			area = circleCords.splice(i, 1)[0];
			background(255, 255, 255);
			tries = 0;
			maxTries = 1000;
			generateCircleAlgorithm(area[0] - area[2], area[0] + area[2], area[1] - area[2], area[1] + area[2], maxcircleAmount / (width / area[2]), maxTries / (width / area[2]));
		}
	}
}
