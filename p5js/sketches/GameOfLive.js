let entities = [];
let entityWidth = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);

	fill(20,150,200)

	// Glider
	entities.push({ x: 0, y: 0 });
	entities.push({ x: entityWidth, y: 0 });
	entities.push({ x: entityWidth * 2, y: 0 });
	entities.push({ x: 0, y: entityWidth });
	entities.push({ x: entityWidth, y: entityWidth * 2 });

	entities.push({ x: entityWidth * 3, y: entityWidth * 4 });
	entities.push({ x: entityWidth * 4, y: entityWidth * 4 });
	entities.push({ x: entityWidth * 5, y: entityWidth * 4 });
}

function draw() {
	background(255);
	drawEntities();
	runLife();
	summonRandomCubes(50, width);
}

function drawEntities() {
	for (let cell of entities) {
		if (cell.x < -width/2 || cell.x > width/2 || cell.y < -height/2 || cell.y > height/2){
			continue;
		}
		square(width / 2 + cell.x, height / 2 + cell.y, entityWidth);
	}
}

function runLife() {
	let next = [];

	let candidates = [];
	for (let cell of entities) {
		if (!isInArray(candidates, cell.x, cell.y)) {
			candidates.push({ x: cell.x, y: cell.y });
		}
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (dx === 0 && dy === 0) continue;
				let nx = cell.x + dx * entityWidth;
				let ny = cell.y + dy * entityWidth;
				if (!isInArray(candidates, nx, ny)) {
					candidates.push({ x: nx, y: ny });
				}
			}
		}
	}

	// Apply rules
	for (let cand of candidates) {
		let neighbors = 0;
		for (let cell of entities) {
			let dx = Math.abs(cand.x - cell.x);
			let dy = Math.abs(cand.y - cell.y);
			if ((dx === entityWidth && dy === 0) ||
				(dx === 0 && dy === entityWidth) ||
				(dx === entityWidth && dy === entityWidth)) {
				neighbors++;
			}
		}
		let isAlive = isInArray(entities, cand.x, cand.y);
		if (isAlive && (neighbors === 2 || neighbors === 3)) {
			next.push({ x: cand.x, y: cand.y });
		}
		if (!isAlive && neighbors === 3) {
			next.push({ x: cand.x, y: cand.y });
		}
	}
	entities = next;
}

function isInArray(arr, x, y) {
	for (let item of arr) {
		if (item.x === x && item.y === y) return true;
	}
	return false;
}

function mousePressed() {
	let newX = Math.round((mouseX - width / 2) / entityWidth) * entityWidth;
	let newY = Math.round((mouseY - height / 2) / entityWidth) * entityWidth;

	let alreadyExists = false;
	for (let cell of entities) {
		if (cell.x === newX && cell.y === newY) {
			alreadyExists = true;
			break;
		}
	}
	if (!alreadyExists) {
		entities.push({ x: newX, y: newY });
	}
}

function summonRandomCubes(amount, area){
	for (let i = 0; i < amount; i++){
		let newX = Math.round((random(-area, area) - width / 2) / entityWidth) * entityWidth;
		let newY = Math.round((random(-area, area) - height / 2) / entityWidth) * entityWidth;
		let alreadyExists = false;
		for (let cell of entities) {
			if (cell.x === newX && cell.y === newY) {
				alreadyExists = true;
				break;
			}
		}
		if (!alreadyExists) {
			entities.push({ x: newX, y: newY });
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}