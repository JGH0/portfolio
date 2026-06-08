var gridSize = 10;
var labyrinth = [];
var waterParticles = [];
var gravity = 0.5;
var damping = 0.98;
var radius = gridSize / 4;
var substeps = 4;
var wallFriction = 0.99;

var cohesionStrength = 0.1;
var cohesionRadius = radius * 4;

var wallGrid = [];
var rows, cols;

function setup() {
	createCanvas(windowWidth, windowHeight);
	rows = ceil(height / gridSize);
	cols = ceil(width / gridSize);

	for (let i = 0; i < rows; i++) {
		wallGrid[i] = [];
		for (let j = 0; j < cols; j++) {
			wallGrid[i][j] = [];
		}
	}

	for (let i = 0; i < width; i += gridSize) {
		for (let j = 0; j < height; j += gridSize) {
			makeLabyrinth(i, j);
		}
	}
}

function makeLabyrinth(i, j) {
	const directions = [
		[i - gridSize, j + gridSize],
		[i + gridSize, j + gridSize],
		[i - gridSize, j - gridSize],
		[i + gridSize, j - gridSize]
	];
	const [x, y] = directions[Math.floor(Math.random() * directions.length)];
	const wall = [i, j, x, y];
	labyrinth.push(wall);

	// Sort directions to make wall detection easier
	let minX = min(i, x);
	let maxX = max(i, x);
	let minY = min(j, y);
	let maxY = max(j, y);
	let startCol = floor(minX / gridSize);
	let endCol = floor(maxX / gridSize);
	let startRow = floor(minY / gridSize);
	let endRow = floor(maxY / gridSize);
	for (let r = startRow; r <= endRow; r++) {
		for (let c = startCol; c <= endCol; c++) {
			if (r >= 0 && r < rows && c >= 0 && c < cols) {
				wallGrid[r][c].push(wall);
			}
		}
	}
}

// ---------- AI generated: point‑to‑segment distance for wall collision ----------
function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
	let ax = px - x1;
	let ay = py - y1;
	let bx = x2 - x1;
	let by = y2 - y1;
	let len2 = bx * bx + by * by;
	if (len2 === 0) {
		let dist = sqrt(ax * ax + ay * ay);
		let nx = ax / (dist + 1e-8);
		let ny = ay / (dist + 1e-8);
		return { dist, nx, ny };
	}
	let t = (ax * bx + ay * by) / len2;
	t = constrain(t, 0, 1);
	let closestX = x1 + t * bx;
	let closestY = y1 + t * by;
	let dx = px - closestX;
	let dy = py - closestY;
	let dist = sqrt(dx * dx + dy * dy);
	let nx = dx / (dist + 1e-8);
	let ny = dy / (dist + 1e-8);
	return { dist, nx, ny };
}

// ---------- AI generated: wall collision resolution (push out, reflect) ----------
function resolveWallCollision(p, stepX, stepY) {
	p.x += stepX;
	p.y += stepY;

	for (let iter = 0; iter < 3; iter++) {
		let cellX = floor(p.x / gridSize);
		let cellY = floor(p.y / gridSize);
		let minDist = Infinity;
		let bestNx = 0, bestNy = 0;

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				let nx = cellX + dx;
				let ny = cellY + dy;
				if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
					for (let w of wallGrid[ny][nx]) {
						let { dist, nx: nX, ny: nY } = pointToSegmentDistance(p.x, p.y, w[0], w[1], w[2], w[3]);
						if (dist < minDist) {
							minDist = dist;
							bestNx = nX;
							bestNy = nY;
						}
					}
				}
			}
		}

		if (minDist < radius) {
			let overlap = radius - minDist;
			p.x += bestNx * overlap;
			p.y += bestNy * overlap;
			let dot = p.vx * bestNx + p.vy * bestNy;
			if (dot < 0) {
				p.vx -= dot * bestNx;
				p.vy -= dot * bestNy;
				p.vx *= wallFriction;
				p.vy *= wallFriction;
			}
		} else {
			break;
		}
	}
}

// ---------- AI generated: sticky particle‑particle collision ----------
function handleParticleCollision(p1, p2) {
	let dx = p2.x - p1.x;
	let dy = p2.y - p1.y;
	let dist = sqrt(dx * dx + dy * dy);
	let minDist = radius * 2;
	if (dist < minDist) {
		let overlap = minDist - dist;
		let nx = dx / dist;
		let ny = dy / dist;
		// Separate
		p1.x -= nx * overlap * 0.5;
		p1.y -= ny * overlap * 0.5;
		p2.x += nx * overlap * 0.5;
		p2.y += ny * overlap * 0.5;
		// Velocity exchange (low restitution for stickiness)
		let vrelx = p2.vx - p1.vx;
		let vrely = p2.vy - p1.vy;
		let dot = vrelx * nx + vrely * ny;
		if (dot < 0) {
			let e = 0.2;
			let imp = (1 + e) * dot / 2;
			p1.vx += imp * nx;
			p1.vy += imp * ny;
			p2.vx -= imp * nx;
			p2.vy -= imp * ny;
		}
	}
}

// ---------- AI generated: cohesion (attraction between nearby particles) ----------
function applyCohesion(p, particleGrid, cellX, cellY) {
	let fx = 0, fy = 0;
	for (let dx = -1; dx <= 1; dx++) {
		for (let dy = -1; dy <= 1; dy++) {
			let nx = cellX + dx;
			let ny = cellY + dy;
			if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
				for (let other of particleGrid[ny][nx]) {
					if (other === p) continue;
					let ddx = other.x - p.x;
					let ddy = other.y - p.y;
					let dist = sqrt(ddx * ddx + ddy * ddy);
					if (dist > 0 && dist < cohesionRadius) {
						let strength = cohesionStrength * (1 - dist / cohesionRadius);
						fx += ddx * strength;
						fy += ddy * strength;
					}
				}
			}
		}
	}
	p.vx += fx;
	p.vy += fy;
}

function draw() {
	background(255);

	for (let w of labyrinth) {
		stroke(0);
		strokeWeight(1);
		line(w[0], w[1], w[2], w[3]);
	}

	if (mouseIsPressed) {
		waterParticles.push({
			x: mouseX,
			y: mouseY,
			vx: random(-1, 1),
			vy: random(-1, 1)
		});
	}

	// ---------- AI generated: build particle grid for cohesion & collisions ----------
	let particleGrid = [];
	for (let i = 0; i < rows; i++) {
		particleGrid[i] = [];
		for (let j = 0; j < cols; j++) {
			particleGrid[i][j] = [];
		}
	}
	for (let p of waterParticles) {
		let cellX = floor(p.x / gridSize);
		let cellY = floor(p.y / gridSize);
		if (cellX >= 0 && cellX < cols && cellY >= 0 && cellY < rows) {
			particleGrid[cellY][cellX].push(p);
		}
	}

	for (let p of waterParticles) {
		let cellX = floor(p.x / gridSize);
		let cellY = floor(p.y / gridSize);
		applyCohesion(p, particleGrid, cellX, cellY);
	}

	for (let p of waterParticles) {
		p.vy += gravity;
		p.vx *= damping;
		p.vy *= damping;
	}

	for (let p of waterParticles) {
		let stepX = p.vx / substeps;
		let stepY = p.vy / substeps;
		for (let s = 0; s < substeps; s++) {
			resolveWallCollision(p, stepX, stepY);
		}
		p.x = constrain(p.x, radius, width - radius);
		p.y = constrain(p.y, radius, height - radius);
		if (p.x <= radius || p.x >= width - radius) p.vx *= -0.9;
		if (p.y <= radius || p.y >= height - radius) p.vy *= -0.9;
	}

	for (let i = waterParticles.length - 1; i >= 0; i--) {
		let p = waterParticles[i];
		if (p.y + radius >= height) {
			waterParticles.splice(i, 1);
		}
	}

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			particleGrid[i][j] = [];
		}
	}
	for (let p of waterParticles) {
		let cellX = floor(p.x / gridSize);
		let cellY = floor(p.y / gridSize);
		if (cellX >= 0 && cellX < cols && cellY >= 0 && cellY < rows) {
			particleGrid[cellY][cellX].push(p);
		}
	}

	let handled = new Array(waterParticles.length).fill(false);
	for (let i = 0; i < waterParticles.length; i++) {
		if (handled[i]) continue;
		let p1 = waterParticles[i];
		let cellX = floor(p1.x / gridSize);
		let cellY = floor(p1.y / gridSize);
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				let nx = cellX + dx;
				let ny = cellY + dy;
				if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
					for (let p2 of particleGrid[ny][nx]) {
						if (p2 === p1) continue;
						let j = waterParticles.indexOf(p2);
						if (j <= i) continue;
						handleParticleCollision(p1, p2);
					}
				}
			}
		}
		handled[i] = true;
	}

	fill(0, 0, 255);
	noStroke();
	for (let p of waterParticles) {
		ellipse(p.x, p.y, radius * 2, radius * 2);
	}
}