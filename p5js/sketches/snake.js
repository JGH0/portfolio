let grid = [];
let snake = [];
let alive = true;
let snakeDirection = 0;
let AItype = "random";
let gridSize = 20;
let gridColumns = 10;
let gridRows = 10;
let eatenApples = 0;
let _textSize = 32;
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

function setup() {
	buttonAddColoums = createButton("Add coloums");
	buttonAddRows = createButton("Add rows");
	buttonUpgradeAI = createButton("Upgrade AI");
	buttonAddMoreApples = createButton("Add more apples");
	buttonSpeedUpgrade = createButton("Increase speed");
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
	buttonUpgradeAI.mousePressed(buttonUpgradeAIPressed);
	buttonAddMoreApples.mousePressed(buttonAddMoreApplesPressed);
	buttonSpeedUpgrade.mousePressed(buttonSpeedUpgradePressed);
	frameRate(gameSpeed);
	summonSnake();
	summonApple();
	drawGrid();
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
function buttonUpgradeAIPressed(){

	if (eatenApples < UpgradeAIPrice) {
		return;
	}

	eatenApples -= UpgradeAIPrice;

	switch (AItype) {

		case "random":
			AItype = "wallDetection";
			UpgradeAIPrice = 5;
			break;

		case "wallDetection":
			AItype = "snakeDetection";
			UpgradeAIPrice = 12;
			break;

		case "snakeDetection":
			AItype = "nearApple";
			UpgradeAIPrice = 25;
			break;

		case "nearApple":
			AItype = "appleBias";
			UpgradeAIPrice = 50;
			break;

		case "appleBias":
			AItype = "smart";
			UpgradeAIPrice = 120;
			break;

		case "smart":
			AItype = "survival";
			UpgradeAIPrice = 300;
			break;

		case "survival":
			AItype = "perfect";
			UpgradeAIPrice = 1000;
			break;
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
	if (appleAmount >= gridColumns * gridRows) {
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

		if (AItype == "perfect"){
			rewardPerfectAI();
		}

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
			if (grid[i][j] == 1) {
				fill(255, 0, 0);
			}else if (grid[i][j] == 2) {
				fill(0, 255, 0);
			}else {
				fill(255, 255, 255);
			}
			rect(i * gridSize, j * gridSize, gridSize, gridSize);
		}
	}
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

	text("Apples: " + appleAmount, gridColumns * gridSize + gridSize, _textSize * 2);

	buttonAddMoreApples.html("Add more apples ₴ " + AddMoreApplesPrice);
	buttonAddMoreApples.position(gridColumns * gridSize + gridSize + _textSize*6, _textSize * 1.5);

	text("AI: " + AItype, gridColumns * gridSize + gridSize, _textSize * 3);

	buttonUpgradeAI.html("Upgrade AI ₴ " + UpgradeAIPrice);
	buttonUpgradeAI.position(gridColumns * gridSize + gridSize + _textSize*((4+AItype.length)*0.6), _textSize * 2.5);

	text("Coloums: " + gridColumns, gridColumns * gridSize + gridSize, _textSize * 4);

	buttonAddColoums.html("Add coloums ₴ " + AddColoumsPrice);
	buttonAddColoums.position(gridColumns * gridSize + gridSize + _textSize*6, _textSize * 3.5);

	text("Rows: " + gridRows, gridColumns * gridSize + gridSize, _textSize * 5);

	buttonAddRows.html("Add rows ₴ " + AddRowsPrice);
	buttonAddRows.position(gridColumns * gridSize + gridSize + _textSize*6, _textSize * 4.5);

	text("Speed: " + gameSpeed, gridColumns * gridSize + gridSize, _textSize * 6);

	buttonSpeedUpgrade.html("Increase speed ₴ " + SpeedUpgradePrice);
	buttonSpeedUpgrade.position(gridColumns * gridSize + gridSize + _textSize*6, _textSize * 5.5);
}

function mousePressed() {

}

function snakeAI(){

	switch (AItype) {

		case "random":
			snakeAIrandom();
			break;

		case "wallDetection":
			snakeAIwallDetection();
			break;

		case "snakeDetection":
			snakeAIsnakeDetection();
			break;

		case "nearApple":
			snakeAInearApple();
			break;

		case "appleBias":
			snakeAIappleBias();
			break;

		case "smart":
			snakeAIsmart();
			break;

		case "survival":
			snakeAIsurvival();
			break;

		case "perfect":
			snakeAIperfect();
			break;
	}
}

function getAppleVisionDistance(){

	if (appleAmount < 5){
		return 2;
	}else if (appleAmount < 15){
		return 3;
	}else if (appleAmount < 30){
		return 5;
	}else if (appleAmount < 60){
		return 8;
	}

	return 12;
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

// got this inspiration by an LLM AI
function getHamiltonianDirection(){

	let x = snake[0][0];
	let y = snake[0][1];

	// snake-like scan pattern

	if (y % 2 == 0){

		// move right
		if (x < gridColumns - 1){
			return 0;
		}

		// move down
		if (y < gridRows - 1){
			return 1;
		}

	}else{

		// move left
		if (x > 0){
			return 2;
		}

		// move down
		if (y < gridRows - 1){
			return 1;
		}
	}

	// top fallback
	return 3;
}

function snakeAIrandom() {
	snakeDirection = floor(random(0, 4));
}

function snakeAIwallDetection(){

	let tries = 0;

	while (tries < 20){

		let direction = floor(random(0, 4));

		if (isDirectionSafe(direction)){
			snakeDirection = direction;
			return;
		}

		tries++;
	}
}

function snakeAInearApple(){

	let visionDistance = getAppleVisionDistance();

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {

			if (grid[i][j] != 1){
				continue;
			}

			let distance =
				abs(snake[0][0] - i) +
				abs(snake[0][1] - j);

			if (distance <= visionDistance){

				let possibleDirections = [];

				if (i > snake[0][0]){
					possibleDirections.push(0);
				}

				if (j > snake[0][1]){
					possibleDirections.push(1);
				}

				if (i < snake[0][0]){
					possibleDirections.push(2);
				}

				if (j < snake[0][1]){
					possibleDirections.push(3);
				}

				for (let k = 0; k < possibleDirections.length; k++) {

					if (isDirectionSafe(possibleDirections[k])){

						// 70% chance to follow apple
						if (random() < 0.7){
							snakeDirection = possibleDirections[k];
							return;
						}
					}
				}
			}
		}
	}

	snakeAIwallDetection();
}

function snakeAIappleBias(){

	let apple = getClosestApple();

	if (apple == null){
		snakeAIwallDetection();
		return;
	}

	let preferredDirections = [];

	if (apple[0] > snake[0][0]){
		preferredDirections.push(0);
	}

	if (apple[1] > snake[0][1]){
		preferredDirections.push(1);
	}

	if (apple[0] < snake[0][0]){
		preferredDirections.push(2);
	}

	if (apple[1] < snake[0][1]){
		preferredDirections.push(3);
	}

	if (
		preferredDirections.length > 0 &&
		random() < 0.65
	){

		let direction =
			preferredDirections[
				floor(random(preferredDirections.length))
			];

		if (isDirectionSafe(direction)){
			snakeDirection = direction;
			return;
		}
	}

	snakeAIwallDetection();
}

function snakeAIsnakeDetection(){

	let safeDirections = [];

	for (let i = 0; i < 4; i++) {

		if (isDirectionSafe(i)){
			safeDirections.push(i);
		}
	}

	if (safeDirections.length <= 0){
		return;
	}

	snakeDirection =
		safeDirections[
			floor(random(0, safeDirections.length))
		];
}

function snakeAIsmart(){

	let apple = getClosestApple();

	if (apple == null){
		snakeAIsnakeDetection();
		return;
	}

	let bestDirection = snakeDirection;
	let bestScore = -999999;

	for (let i = 0; i < 4; i++) {

		if (!isDirectionSafe(i)){
			continue;
		}

		let vec = directionToVector(i);

		let newX = snake[0][0] + vec[0];
		let newY = snake[0][1] + vec[1];

		let distance =
			abs(newX - apple[0]) +
			abs(newY - apple[1]);

		let freeNeighbors =
			countFreeNeighbors(newX, newY);

		let score =
			(-distance * 3) +
			(freeNeighbors * 8);

		if (score > bestScore){

			bestScore = score;
			bestDirection = i;
		}
	}

	snakeDirection = bestDirection;
}

function snakeAIsurvival(){

	let bestDirection = snakeDirection;
	let bestScore = -999999;

	let apple = getClosestApple();

	for (let i = 0; i < 4; i++) {

		if (!isDirectionSafe(i)){
			continue;
		}

		let vec = directionToVector(i);

		let newX = snake[0][0] + vec[0];
		let newY = snake[0][1] + vec[1];

		let freeNeighbors =
			countFreeNeighbors(newX, newY);

		let score = freeNeighbors * 20;

		if (apple != null){

			let distance =
				abs(newX - apple[0]) +
				abs(newY - apple[1]);

			score -= distance;
		}

		if (freeNeighbors <= 1){
			score -= 100;
		}

		score += random(-3, 3);

		if (score > bestScore){

			bestScore = score;
			bestDirection = i;
		}
	}

	snakeDirection = bestDirection;
}

// instpired by an LLM AI
function snakeAIperfect(){

	let apple = getClosestApple();

	// try smart movement first
	if (apple != null){

		let bestDirection = -1;
		let bestDistance = Infinity;

		for (let i = 0; i < 4; i++) {

			if (!isDirectionSafe(i)){
				continue;
			}

			let vec = directionToVector(i);

			let newX = snake[0][0] + vec[0];
			let newY = snake[0][1] + vec[1];

			let distance =
				abs(newX - apple[0]) +
				abs(newY - apple[1]);

			let freeNeighbors =
				countFreeNeighbors(newX, newY);

			// avoid traps
			if (
				freeNeighbors <= 1 &&
				snake.length < (gridColumns * gridRows) - 5
			){
				continue;
			}

			if (distance < bestDistance){
				bestDistance = distance;
				bestDirection = i;
			}
		}

		if (bestDirection != -1){
			snakeDirection = bestDirection;
			return;
		}
	}

	// fallback to Hamiltonian path
	let direction = getHamiltonianDirection();

	if (isDirectionSafe(direction)){
		snakeDirection = direction;
		return;
	}

	// fallback survival
	snakeAIsurvival();
}

function rewardPerfectAI(){

	let reward =
		floor(
			(gridColumns * gridRows) * 0.75
		);

	eatenApples += reward;
}