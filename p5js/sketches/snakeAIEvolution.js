let grid = [];
let snake = [];
let alive = true;
let snakeDirection = 0;
let AItype = "random";
let gridSize = 20;
let gridColumns = 10;
let gridRows = 10;
let eatenApples = 0;
let _textSize = 16;
let appleAmount = 1;
let gameSpeed = 10;
let buttonAddColoums = null;
let buttonAddRows = null;
let buttonUpgradeAI = null;
let buttonAddMoreApples = null;
let buttonSpeedUpgrade = null;
let SpeedUpgradePrice = 5;
let AddMoreApplesPrice = 1;
let AddColoumsPrice = 1;
let AddRowsPrice = 1;
let UpgradeAIPrice = 1;
let buttonSnifferUP = null;
let buttonSnifferDown = null;
let sniffingDistance = 1;
let buttonEyeUp = null;
let buttonEyeDown = null;
let eyeDistance = 1;
let snifferUpgradePrice = 1;
let eyeUpgradePrice = 1;
let snifferLevel = 1;
let eyeLevel = 1;
let sniffingIncrement = 1;
let eyeIncrement = 2;
let sniffingPriceIncrement = 2;
let eyePriceIncrement = 2;
let moulthOpenDistance = 2;


function setup() {
	buttonAddColoums = createButton("Add coloums");
	buttonAddRows = createButton("Add rows");
	buttonAddMoreApples = createButton("Add more apples");
	buttonSpeedUpgrade = createButton("Increase speed");
	buttonSnifferUP = createButton("SnifferUp");
	buttonSnifferDown = createButton("SnifferDown");
	buttonEyeUp = createButton("EyeUp");
	buttonEyeDown = createButton("EyeDown");
	createCanvas(windowWidth, windowHeight);
	background(255, 255, 255);
	for (let i = 0; i < gridColumns; i++) {
		grid[i] = [];
		for (let j = 0; j < gridRows; j++) {
			grid[i][j] = 0;
		}
	}
	buttonAddColoums.mousePressed(buttonAddColoumsPressed);
	buttonAddRows.mousePressed(buttonAddRowsPressed);
	buttonAddMoreApples.mousePressed(buttonAddMoreApplesPressed);
	buttonSpeedUpgrade.mousePressed(buttonSpeedUpgradePressed);
	buttonSnifferUP.mousePressed(buttonSnifferUPPressed);
	buttonSnifferDown.mousePressed(buttonSnifferDownPressed);
	buttonEyeUp.mousePressed(buttonEyeUpPressed);
	buttonEyeDown.mousePressed(buttonEyeDownPressed);
	frameRate(gameSpeed);
	summonSnake();
	summonApple();
	drawGrid();
}


function buttonSnifferUPPressed(){
	if (sniffingDistance > gridRows) {
		return;
	}
	if (snifferUpgradePrice > eatenApples) {
		return;
	}
	if (!(snifferLevel * sniffingIncrement > sniffingDistance)) {
		eatenApples -= snifferUpgradePrice;
		snifferUpgradePrice += sniffingPriceIncrement;
		snifferLevel ++;
	}

	sniffingDistance += sniffingIncrement;
}
function buttonSnifferDownPressed(){
	if (sniffingDistance < 1) {
		return;
	}
	sniffingDistance -= sniffingIncrement;
}

function buttonSpeedUpgradePressed(){

	if (eatenApples < SpeedUpgradePrice) {
		return;
	}

	eatenApples -= SpeedUpgradePrice;

	gameSpeed += 2;

	frameRate(gameSpeed);

	SpeedUpgradePrice += 5;
}

function buttonEyeUpPressed(){
	if (eyeDistance > gridColumns) {
		return;
	}
	if (!(eyeLevel * eyeIncrement + 1 >= eyeDistance) && eyeUpgradePrice <= eatenApples) {
		eatenApples -= eyeUpgradePrice;
		eyeUpgradePrice += eyePriceIncrement;
		eyeLevel ++;
	}else if(eyeUpgradePrice > eatenApples){
		return;
	}

	eyeDistance += eyeIncrement;
}
function buttonEyeDownPressed(){
	if (eyeDistance < 1) {
		return;
	}
	eyeDistance -= eyeIncrement;
}

function buttonAddColoumsPressed(){
	if (eatenApples < AddColoumsPrice) {
		return;
	}
	eatenApples -= AddColoumsPrice;
	gridColumns++;
	grid.push([]);
	for (let i = 0; i < gridRows; i++) {
		grid[grid.length - 1][i] = 0;
	}
}
function buttonAddRowsPressed(){
	if (eatenApples < AddRowsPrice) {
		return;
	}
	eatenApples -= AddRowsPrice;
	gridRows++;
	for (let i = 0; i < gridColumns; i++) {
		grid[i].push(0);
	}
}

function buttonAddMoreApplesPressed(){
	if (eatenApples < AddMoreApplesPrice) {
		return;
	}
	eatenApples -= AddMoreApplesPrice;
	if (appleAmount < 5){
		AddMoreApplesPrice += 1;
	}else if (appleAmount < 10){
		AddMoreApplesPrice += 2;
	}else if (appleAmount < 20){
		AddMoreApplesPrice += 3;
	}else if (appleAmount < 50){
		AddMoreApplesPrice += 4;
	}else{
		AddMoreApplesPrice += ceil(AddMoreApplesPrice*0.15);
	}
	summonApple();
	appleAmount++;
}

function summonApple(){
	if (appleAmount >= gridColumns * gridRows - snake.length ) {
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[0].length; j++) {
				if (grid[i][j] == 2) {
					grid[i][j] = 0;
				}
			}
		}
		return;
	}
	let x = grid.length - floor(random(1, grid.length +1));
	let y = grid[0].length - floor(random(1, grid[0].length +1));
	if(grid[x][y] == 2 || grid[x][y] == 1){
		summonApple();//best practice coding right here
		return;
	}
	grid[x][y] = 1;
}



function dontMoveBackwards(lastSnakeX, lastSnakeY, currentSnakeX, currentSnakeY, direction){
	if (direction == 0) {
		return lastSnakeX < currentSnakeX;
	}else if (direction == 1) {
		return lastSnakeY < currentSnakeY;
	}else if (direction == 2) {
		return lastSnakeX > currentSnakeX;
	}else if (direction == 3) {
		return lastSnakeY > currentSnakeY;
	}
}

function restartGame(){

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {

			if (grid[i][j] == 2 || grid[i][j] == 1) {
				grid[i][j] = 0;
			}
		}
	}

	snake = [];

	summonSnake();

	for (let i = 0; i < appleAmount; i++) {
		summonApple();
	}

	alive = true;
}

function runSnake(){
	let x = snake[0][0];
	let y = snake[0][1];
	for (let i = snake.length - 1; i > 0; i--) {
		snake[i][0] = snake[i - 1][0];
		snake[i][1] = snake[i - 1][1];
	}
	snakeAI();
	let lastSnakeX = snake[1][0]
	let lastSnakeY = snake[1][1];
	if (dontMoveBackwards(lastSnakeX, lastSnakeY, x, y, snakeDirection)) {
		snakeDirection = (snakeDirection + 2) % 4;
	}
	if (snakeDirection == 0) {
		snake[0][0] += 1;
	}else if (snakeDirection == 1) {
		snake[0][1] += 1;
	}else if (snakeDirection == 2) {
		snake[0][0] -= 1;
	}else if (snakeDirection == 3) {
		snake[0][1] -= 1;
	}
	if (snake[0][1] >= grid[0].length || snake[0][1] < 0 || snake[0][0] >= grid.length || snake[0][0] < 0) {
		alive = false;
		return;
	}
	if (grid[snake[0][0]][snake[0][1]] == 2) {
		alive = false;
		return;
	}
	if (grid[snake[0][0]][snake[0][1]] == 1) {
		snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1]]);
		summonApple();
		eatenApples++;
	}
	if (
		snake.length >=
		(gridColumns * gridRows) - appleAmount
	){
		restartGame();
		return;
	}
	drawSnakeOnGrid();
}

function summonSnake(){
	let x = grid.length - floor(random(1, grid.length));
	let y = grid[0].length - floor(random(1, grid[0].length));
	snake.push([x, y]);
	snake.push([x - 1, y]);
	snake.push([x - 2, y]);
	drawSnakeOnGrid();
}

function drawSnakeOnGrid(){
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] == 2) {
				grid[i][j] = 0;
			}
		}
	}

	for (let i = 0; i < snake.length; i++) {

		let x = snake[i][0];
		let y = snake[i][1];

		// prevent crash
		if (
			x < 0 ||
			y < 0 ||
			x >= grid.length ||
			y >= grid[0].length
		){
			alive = false;
			return;
		}

		grid[x][y] = 2;
	}
}

function drawGrid() {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			switch (grid[i][j]) {
				case 1:
					strokeWeight(0)
					fill(255, 0, 0);
					circle(i*gridSize+gridSize/2, j*gridSize+gridSize/2, gridSize-2);
					break;
				case 2:
					if (i == snake[0][0] && j == snake[0][1]) {
						strokeWeight(0)
						fill(0, 233, 0);
						rect(i * gridSize, j * gridSize, gridSize, gridSize);
						fill(100, 255, 100);
						circle(i*gridSize+gridSize/2, j*gridSize+gridSize/2, gridSize-2);
						switch (snakeDirection) {
							case 0://right
								makeEye(i*gridSize+gridSize/4, j*gridSize+gridSize/4);
								makeEye(i*gridSize+gridSize/4, j*gridSize+gridSize/4*3);
								break;
							case 1://down
								makeEye(i*gridSize+gridSize/4, j*gridSize+gridSize/4);
								makeEye(i*gridSize+gridSize/4*3, j*gridSize+gridSize/4);
								break;
							case 2://left
								makeEye(i*gridSize+gridSize/4*3, j*gridSize+gridSize/4);
								makeEye(i*gridSize+gridSize/4*3, j*gridSize+gridSize/4*3);
								break;
							case 3://up
								makeEye(i*gridSize+gridSize/4, j*gridSize+gridSize/4*3);
								makeEye(i*gridSize+gridSize/4*3, j*gridSize+gridSize/4*3);
								break;
							default:
								throw new Error("Invalid snakeDirection: " + snakeDirection);
								break;
						}
						makeMoulth(snakeDirection,i,j);
					}else{
						const snakeIndex = getSnakePartIndex(i, j);
						if (snakeIndex == -1) {
							console.error("Snake part not found: " + i + ", " + j);
						}
						let SnakeGreen = 255-snakeIndex*10;
						let SnakeBlue = 0;
						let SnakeRed = 0;
						if (SnakeGreen < 0) {
							SnakeBlue = abs(SnakeGreen);
						}
						if (SnakeBlue > 255) {
							SnakeRed = SnakeBlue-255;
						}

						strokeWeight(0)
						fill(SnakeRed, SnakeGreen, SnakeBlue);
						rect(i * gridSize, j * gridSize, gridSize, gridSize);
					}
					break;
				default:
					strokeWeight(0.3)
					fill(255, 255, 255);
					rect(i * gridSize, j * gridSize, gridSize, gridSize);
					break;
			}
		}
	}
}

function makeEye(x,y){
	if (countFreeNeighbors(snake[0][0], snake[0][1]) == 0) {
		//make dead eyes
		fill(0, 0, 0);
		strokeWeight(2);
		line(x-gridSize/16, y-gridSize/16, x+gridSize/16, y+gridSize/16);
		line(x-gridSize/16, y+gridSize/16, x+gridSize/16, y-gridSize/16);
		return;
	}
	fill(255, 255, 255);
	circle(x, y, gridSize/4);
	fill(25, 255, 25);
	circle(x, y, gridSize/8);
	fill(0, 0, 0);
	circle(x, y, gridSize/16);
}
function makeMoulth(direction,i,j){
	let x, y, w, h;
	fill(0, 0, 0);
	if (moulthOpenDistance >= getClosestAppleDistanceToSnake()) {
		switch (direction) {
			case 0://right
				x = gridSize*i+gridSize/16*11;
				y = gridSize*j+gridSize/2;
				w = gridSize/8*5;
				h = gridSize/4*3;
				break;
			case 1://down
				x = gridSize*i+gridSize/2;
				y = gridSize*j+gridSize/16*11;
				w = gridSize/4*3;
				h = gridSize/8*5;
				break;
			case 2://left
				x = gridSize*i+gridSize/16*5;
				y = gridSize*j+gridSize/2;
				w = gridSize/8*5;
				h = gridSize/4*3;
				break;
			case 3://up
				x = gridSize*i+gridSize/2;
				y = gridSize*j+gridSize/16*5;
				w = gridSize/4*3;
				h = gridSize/8*5;
				break;
			default:
				throw new Error("Invalid direction SnakeDirection: " + snakeDirection);
				break;

		}
		ellipse(x, y, w, h)
	}else{
		switch (direction) {
			case 0://right
				x = gridSize*i+gridSize/16*13;
				y = gridSize*j+gridSize/2;
				w = gridSize/16;
				h = gridSize/4*3;
				break;
			case 1://down
				x = gridSize*i+gridSize/2;
				y = gridSize*j+gridSize/16*13;
				w = gridSize/4*3;
				h = gridSize/16;
				break;
			case 2://left
				x = gridSize*i+gridSize/16;
				y = gridSize*j+gridSize/2;
				w = gridSize/16;
				h = gridSize/4*3;
				break;
			case 3://up
				x = gridSize*i+gridSize/2;
				y = gridSize*j+gridSize/16;
				w = gridSize/4*3;
				h = gridSize/16;
				break;
			default:
				throw new Error("Invalid direction SnakeDirection: " + snakeDirection);
				break;
		}
		ellipse(x, y, w, h)
	}
}

function getSnakePartIndex(x, y){
	for (let i = 0; i < snake.length; i++) {
		if (snake[i][0] == x && snake[i][1] == y) {
			return i;
		}
	}
	return -1;
}

function draw() {

	if (alive == false){
		restartGame();
	}

	background(255);

	runSnake();
	drawGrid();

	fill(0, 0, 0);
	textSize(_textSize);

	text("₴ " + eatenApples, gridColumns * gridSize + gridSize + _textSize*3, _textSize * 1);
	text("More apples: " + appleAmount, gridColumns * gridSize + gridSize, _textSize * 2);

	buttonAddMoreApples.html("Add more apples ₴ " + AddMoreApplesPrice);
	buttonAddMoreApples.position(gridColumns * gridSize + gridSize + _textSize*7, _textSize * 1.1);

	text("AI Upgrades ", gridColumns * gridSize + gridSize, _textSize * 3);
	text("Better Eyes: " + eyeLevel, gridColumns * gridSize + gridSize, _textSize * 4);

	buttonEyeUp.html("Upgrade Eyes ₴ " + eyeUpgradePrice);
	buttonEyeUp.position(gridColumns * gridSize + gridSize + _textSize*7, _textSize * 3.1);
	buttonEyeDown.html("Downgrade Eyes");
	buttonEyeDown.position(gridColumns * gridSize + gridSize + _textSize*13, _textSize * 3.1);

	text("Better Sniffer: " + snifferLevel, gridColumns * gridSize + gridSize, _textSize * 5);

	buttonSnifferUP.mousePressed(buttonSnifferUPPressed);
	buttonSnifferUP.html("Upgrade Sniffer ₴ " + snifferUpgradePrice);
	buttonSnifferUP.position(gridColumns * gridSize + gridSize + _textSize*8, _textSize * 4.1);
	buttonSnifferDown.html("Downgrade Sniffer");
	buttonSnifferDown.position(gridColumns * gridSize + gridSize + _textSize*14, _textSize * 4.1);
}
function mousePressed() {
}

function snakeAI(){
	direction = floor(random(0, 4));
	count = 0;
	while (!isDirectionSafe(direction)) {
		count++;
		if (count > 20) {
			snakeDirection =0;
			return;
		}
		direction = floor(random(0, 4));
		if (sniffingDistance >= getClosestAppleDistanceToSnake()) {
			console.log("sniffing apple");
			direction = pathSnakeToPoint(getClosestApple()[0], getClosestApple()[1]);

		}
		if (isAppleInView(snakeDirection, eyeDistance)) {
			console.log("apple in view");
			direction = snakeDirection;
		}
	}
	snakeDirection = direction;
}

function directionToVector(direction){

	switch(direction){
		case 0:
			return [1, 0];

		case 1:
			return [0, 1];

		case 2:
			return [-1, 0];

		case 3:
			return [0, -1];
	}
}

function pathSnakeToPoint(x,y){
	let vec = [x - snake[0][0], y - snake[0][1]];

	if (vec[0] > 0){
		return 0;
	}else if (vec[0] < 0){
		return 2;
	}else if (vec[1] > 0){
		return 1;
	}else if (vec[1] < 0){
		return 3;
	}
}

function isDirectionSafe(direction){

	let vec = directionToVector(direction);

	let newX = snake[0][0] + vec[0];
	let newY = snake[0][1] + vec[1];

	if (
		newX < 0 ||
		newY < 0 ||
		newX >= grid.length ||
		newY >= grid[0].length
	){
		return false;
	}

	if (grid[newX][newY] == 2){
		return false;
	}

	return true;
}

function getClosestApple(){

	let bestApple = null;
	let bestDistance = Infinity;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {

			if (grid[i][j] == 1){

				let distance =
					abs(snake[0][0] - i) +
					abs(snake[0][1] - j);

				if (distance < bestDistance){
					bestDistance = distance;
					bestApple = [i, j];
				}
			}
		}
	}

	return bestApple;
}

function getClosestAppleDistanceToPoint(x, y){
	let apple = getClosestApple();
	if (apple == null){
		return Infinity;
	}
	return abs(x - apple[0]) + abs(y - apple[1]);
}

function getClosestAppleDistanceToSnake(){
	return getClosestAppleDistanceToPoint(snake[0][0], snake[0][1]);
}

function isAppleInView(snakeDirection, viewDistance){

	let vec = directionToVector(snakeDirection);

	for (let i = 0; i < viewDistance; i++) {
		if (i >= grid.length || i >= grid[0].length|| snake[0][0]+(vec[0] *i) >= grid.length || snake[0][0]+(vec[0] *i) < 0 || snake[0][1]+(vec[1] *i) >= grid[0].length || snake[0][1]+(vec[1] *i) < 0){
			return false;
		}

		if (grid[snake[0][0] + (vec[0] * i)][snake[0][1] + (vec[1] * i)] == 1){
			return true;
		}
	}

	return false;
}

function countFreeNeighbors(x, y){

	let count = 0;

	let dirs = [
		[1,0],
		[0,1],
		[-1,0],
		[0,-1]
	];

	for (let i = 0; i < dirs.length; i++) {

		let nx = x + dirs[i][0];
		let ny = y + dirs[i][1];

		if (
			nx >= 0 &&
			ny >= 0 &&
			nx < grid.length &&
			ny < grid[0].length &&
			grid[nx][ny] != 2
		){
			count++;
		}
	}

	return count;
}