/*
L-System Fractal Generator

https://paulbourke.net/fractals/lsys/

The following characters have a geometric interpretation:

Character        Meaning
   F             Move forward by line length drawing a line
   f             Move forward by line length without drawing a line
   +             Turn left by turning angle
   -             Turn right by turning angle
   |             Reverse direction (ie: turn by 180 degrees)
   [             Push current drawing state onto stack
   ]             Pop current drawing state from the stack
   #             Increment the line width by line width increment
   !             Decrement the line width by line width increment
   @             Draw a dot with line width radius
   {             Open a polygon
   }             Close a polygon and fill it with fill colour
   >             Multiply the line length by the line length scale factor
   <             Divide the line length by the line length scale factor
   &             Swap the meaning of + and -
   (             Decrement turning angle by turning angle increment
   )             Increment turning angle by turning angle increment
*/

let angle = Math.PI * 1.5;
let turningAngle = Math.PI * 0.5;
let lineLength = 5;
let lineWidthIncrement = 1;
let currentLineWidth = 1;
let currentPosition = [0, 0];
let stateStack = [];
let lineLengthScaleFactor = 1.5;
let swapPlusMinusState = false;
let turningAngleIncrement = 0.1;
let polygonVertices = [];
let polygonOpen = false;

let axiom = 'F+F+F+F';
let maxIterations = 4;
const maxCalculations = 50000;
let rules = {
	'F': 'FF+F++F+F'
};

//* L-System presets array **AI generated**
const presets = [
	{ name: 'Crystal', axiom: 'F+F+F+F', rules: { 'F': 'FF+F++F+F' }, angle: 90 },
	{ name: 'Koch Curve', axiom: 'F+F+F+F', rules: { 'F': 'F+F-F-FF+F+F-F' }, angle: 90 },
	{ name: 'Von Koch Snowflake', axiom: 'F++F++F', rules: { 'F': 'F-F++F-F' }, angle: 60 },
	{ name: 'Hilbert', axiom: 'X', rules: { 'X': '-YF+XFX+FY-', 'Y': '+XF-YFY-FX+' }, angle: 90 },
	{ name: 'Dragon Curve', axiom: 'FX', rules: { 'X': 'X+YF+', 'Y': '-FX-Y' }, angle: 90 },
	{ name: 'Levy Curve', axiom: 'F', rules: { 'F': '-F++F-' }, angle: 45 },
	{ name: 'Sierpinski Arrowhead', axiom: 'YF', rules: { 'X': 'YF+XF+Y', 'Y': 'XF-YF-X' }, angle: 60 },
	{ name: 'Peano Curve', axiom: 'X', rules: { 'X': 'XFYFX+F+YFXFY-F-XFYFX', 'Y': 'YFXFY-F-XFYFX+F+YFXFY' }, angle: 90 },
	{ name: 'Plant', axiom: 'X', rules: { 'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF' }, angle: 25 },
	{ name: 'Triangle', axiom: 'F+F+F', rules: { 'F': 'F-F+F' }, angle: 120 },
	{ name: 'Quadratic Gosper', axiom: '-YF', rules: { 'X': 'XFX-YF-YF+FX+FX-YF-YFFX+YF+FXFXYF-FX+YF+FXFX+YF-FXYF-YF-FX+FX+YFYF-', 'Y': '+FXFX-YF-YF+FX+FXYF+FX-YFYF-FX-YF+FXYFYF-FX-YFFX+FX+YF-YF-FX+FX+YFY' }, angle: 90 },
	{ name: 'Square Sierpinski', axiom: 'F+XF+F+XF', rules: { 'X': 'XF-F+F-XF+F+XF-F+F-X' }, angle: 90 },
	{ name: 'Quadratic Snowflake', axiom: 'F', rules: { 'F': 'F-F+F+F-F' }, angle: 90 },
	{ name: 'Quadratic Koch Island', axiom: 'F+F+F+F', rules: { 'F': 'F+F-F-FFF+F+F-F' }, angle: 90 },
	{ name: 'Board', axiom: 'F+F+F+F', rules: { 'F': 'FF+F+F+F+FF' }, angle: 90 },
	{ name: 'Sierpinski Arrowhead 2', axiom: 'YF', rules: { 'X': 'YF+XF+Y', 'Y': 'XF-YF-X' }, angle: 60 },
	{ name: 'Cross 1', axiom: 'F+F+F+F', rules: { 'F': 'F+FF++F+F' }, angle: 90 },
	{ name: 'Cross 2', axiom: 'F+F+F+F', rules: { 'F': 'F+F-F+F+F' }, angle: 90 },
	{ name: 'Pentaplexity', axiom: 'F++F++F++F++F', rules: { 'F': 'F++F++F|F-F++F' }, angle: 36 },
	{ name: 'Tiles', axiom: 'F+F+F+F', rules: { 'F': 'FF+F-F+F+FF' }, angle: 90 },
	{ name: 'Rings', axiom: 'F+F+F+F', rules: { 'F': 'FF+F+F+F+F+F-F' }, angle: 90 },
	{ name: 'Hexagonal Gosper', axiom: 'XF', rules: { 'X': 'X+YF++YF-FX--FXFX-YF+', 'Y': '-FX+YFYF++YF+FX--FX-Y' }, angle: 60 },
	{ name: 'Classic Sierpinski Curve', axiom: 'F--XF--F--XF', rules: { 'X': 'XF+F+XF--F--XF+F+X' }, angle: 45 },
	{ name: 'Krishna Anklets', axiom: '-X--X', rules: { 'X': 'XFX--XFX' }, angle: 45 },
	{ name: 'Mango Leaf', axiom: 'Y---Y', rules: { 'X': '{F-F}{F-F}--[--X]{F-F}{F-F}--{F-F}{F-F}--', 'Y': 'f-F+X+F-fY' }, angle: 60 },
	{ name: 'Snake Kolam', axiom: 'F+XF+F+XF', rules: { 'X': 'X{F-F-F}+XF+F+X{F-F-F}+X' }, angle: 90 },
	{ name: 'Leaf', axiom: 'a', rules: { 'F': '>F<', 'a': 'F[+x]Fb', 'b': 'F[-y]Fa', 'x': 'a', 'y': 'b' }, angle: 45 },
	{ name: 'Bush 1', axiom: 'Y', rules: { 'X': 'X[-FFF][+FFF]FX', 'Y': 'YFX[+Y][-Y]' }, angle: 25.7 },
	{ name: 'Bush 2', axiom: 'F', rules: { 'F': 'FF+[+F-F-F]-[-F+F+F]' }, angle: 22.5 },
	{ name: 'Bush 3', axiom: 'F', rules: { 'F': 'F[+FF][-FF]F[-F][+F]F' }, angle: 35 },
	{ name: 'Bush 4 (Saupe)', axiom: 'VZFFF', rules: { 'V': '[+++W][---W]YV', 'W': '+X[-W]Z', 'X': '-W[+X]Z', 'Y': 'YZ', 'Z': '[-FFF][+FFF]F' }, angle: 20 },
	{ name: 'Bush 5', axiom: 'FX', rules: { 'X': '>[-FX]+FX' }, angle: 40 },
	{ name: 'Sticks', axiom: 'X', rules: { 'F': 'FF', 'X': 'F[+X]F[-X]+X' }, angle: 20 },
	{ name: 'Algae 1', axiom: 'aF', rules: { 'a': 'FFFFFv[+++h][---q]fb', 'b': 'FFFFFv[+++h][---q]fc', 'c': 'FFFFFv[+++fa]fd', 'd': 'FFFFFv[+++h][---q]fe', 'e': 'FFFFFv[+++h][---q]fg', 'g': 'FFFFFv[---fa]fa', 'h': 'ifFF', 'i': 'fFFF[--m]j', 'j': 'fFFF[--n]k', 'k': 'fFFF[--o]l', 'l': 'fFFF[--p]', 'm': 'fFn', 'n': 'fFo', 'o': 'fFp', 'p': 'fF', 'q': 'rfF', 'r': 'fFFF[++m]s', 's': 'fFFF[++n]t', 't': 'fFFF[++o]u', 'u': 'fFFF[++p]', 'v': 'Fv' }, angle: 12 },
	{ name: 'Algae 2', axiom: 'aF', rules: { 'a': 'FFFFFy[++++n][----t]fb', 'b': '+FFFFFy[++++n][----t]fc', 'c': 'FFFFFy[++++n][----t]fd', 'd': '-FFFFFy[++++n][----t]fe', 'e': 'FFFFFy[++++n][----t]fg', 'g': 'FFFFFy[+++fa]fh', 'h': 'FFFFFy[++++n][----t]fi', 'i': '+FFFFFy[++++n][----t]fj', 'j': 'FFFFFy[++++n][----t]fk', 'k': '-FFFFFy[++++n][----t]fl', 'l': 'FFFFFy[++++n][----t]fm', 'm': 'FFFFFy[---fa]fa', 'n': 'ofFFF', 'o': 'fFFFp', 'p': 'fFFF[-s]q', 'q': 'fFFF[-s]r', 'r': 'fFFF[-s]', 's': 'fFfF', 't': 'ufFFF', 'u': 'fFFFv', 'v': 'fFFF[+s]w', 'w': 'fFFF[+s]x', 'x': 'fFFF[+s]', 'y': 'Fy' }, angle: 12 },
	{ name: 'Weed', axiom: 'F', rules: { 'F': 'FF-[XY]+[XY]', 'X': '+FY', 'Y': '-FX' }, angle: 22.5 },
	{ name: 'Kolam', axiom: 'D--D', rules: { 'A': 'F++FFFF--F--FFFF++F++FFFF--F', 'B': 'F--FFFF++F++FFFF--F--FFFF++F', 'C': 'BFA--BFA', 'D': 'CFC--CFC' }, angle: 45 }
];

let presetIndex = 16;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(255, 255, 255);
	noFill();
	stroke(0, 0, 0);
	strokeWeight(currentLineWidth);
	
	// Load the selected preset
	if (presetIndex >= 0 && presetIndex < presets.length) {
		const preset = presets[presetIndex];
		axiom = preset.axiom;
		rules = {};
		for (let key in preset.rules) {
			rules[key] = preset.rules[key];
		}
		turningAngle = preset.angle * Math.PI / 180;
		console.log('Loaded preset:', preset.name);
	} else {
		console.log('Invalid preset index:', presetIndex, 'using default');
		const preset = presets[0];
		axiom = preset.axiom;
		rules = {};
		for (let key in preset.rules) {
			rules[key] = preset.rules[key];
		}
		turningAngle = preset.angle * Math.PI / 180;
	}
	
	// Generate the fractal string
	let tempAxiom = axiom;
	for (let i = 0; i < maxIterations; i++) {
		if (tempAxiom.length > maxCalculations) {
			console.log('Reached max calculations, stopping at iteration', i);
			break;
		}
		let newAxiom = '';
		for (let char of tempAxiom) {
			if (rules[char]) {
				newAxiom += rules[char];
			} else {
				newAxiom += char;
			}
		}
		tempAxiom = newAxiom;
	}
	
	axiom = tempAxiom;
	
	// Calculate bounding box to fit fractal in frame
	let bounds = calculateBounds(axiom);
	let fractalWidth = bounds.maxX - bounds.minX;
	let fractalHeight = bounds.maxY - bounds.minY;
	
	// Calculate scale factor to fit in canvas with padding
	let padding = 50;
	let scaleX = (width - padding * 2) / fractalWidth;
	let scaleY = (height - padding * 2) / fractalHeight;
	let scaleFactor = Math.min(scaleX, scaleY);
	
	// Calculate translation to center the fractal
	let centerX = (bounds.minX + bounds.maxX) / 2;
	let centerY = (bounds.minY + bounds.maxY) / 2;
	let translateX = width / 2 - centerX * scaleFactor;
	let translateY = height / 2 - centerY * scaleFactor;
	
	// Apply transformation
	translate(translateX, translateY);
	scale(scaleFactor, scaleFactor);
	
	// Reset position to origin
	currentPosition = [0, 0];
	
	generateFractal();
}


// * real ugly but working AI-generated function to calculate bounds
function calculateBounds(axiomString) {
	let minX = 0, maxX = 0, minY = 0, maxY = 0;
	let x = 0, y = 0;
	let angle = Math.PI * 1.5;
	let localTurningAngle = turningAngle;
	let localLineLength = lineLength;
	let localStateStack = [];
	let localSwapPlusMinus = false;
	let localLineLengthScaleFactor = lineLengthScaleFactor;
	
	for (let i = 0; i < axiomString.length; i++) {
		let c = axiomString.charAt(i);
		
		switch (c) {
			case "F":
				x += Math.cos(angle) * localLineLength;
				y += Math.sin(angle) * localLineLength;
				minX = Math.min(minX, x);
				maxX = Math.max(maxX, x);
				minY = Math.min(minY, y);
				maxY = Math.max(maxY, y);
				break;
			case "f":
				x += Math.cos(angle) * localLineLength;
				y += Math.sin(angle) * localLineLength;
				minX = Math.min(minX, x);
				maxX = Math.max(maxX, x);
				minY = Math.min(minY, y);
				maxY = Math.max(maxY, y);
				break;
			case "+":
				if (localSwapPlusMinus) {
					angle -= localTurningAngle;
				} else {
					angle += localTurningAngle;
				}
				break;
			case "-":
				if (localSwapPlusMinus) {
					angle += localTurningAngle;
				} else {
					angle -= localTurningAngle;
				}
				break;
			case "|":
				angle += Math.PI;
				break;
			case "[":
				localStateStack.push({
					x: x,
					y: y,
					angle: angle,
					lineLength: localLineLength,
					swapPlusMinus: localSwapPlusMinus
				});
				break;
			case "]":
				if (localStateStack.length > 0) {
					let state = localStateStack.pop();
					x = state.x;
					y = state.y;
					angle = state.angle;
					localLineLength = state.lineLength;
					localSwapPlusMinus = state.swapPlusMinus;
				}
				break;
			case ">":
				localLineLength *= localLineLengthScaleFactor;
				break;
			case "<":
				localLineLength /= localLineLengthScaleFactor;
				break;
			case "&":
				localSwapPlusMinus = !localSwapPlusMinus;
				break;
		}
	}
	
	return { minX, maxX, minY, maxY };
}

function generateFractal() {
	for (let i = 0; i < axiom.length; i++) {
		let c = axiom.charAt(i);
		switch (c) {
			case "F":
				moveForwardDraw();
				break;
			case "f":
				moveForwardNoDraw();
				break;
			case "+":
				turnLeft();
				break;
			case "-":
				turnRight();
				break;
			case "|":
				reverseDirection();
				break;
			case "[":
				pushState(i);
				break;
			case "]":
				popState(i);
				break;
			case "#":
				incrementLineWidth();
				break;
			case "!":
				decrementLineWidth();
				break;
			case "@":
				drawDot();
				break;
			case "{":
				openPolygon();
				break;
			case "}":
				closePolygon();
				break;
			case ">":
				multiplyLineLength();
				break;
			case "<":
				divideLineLength();
				break;
			case "&":
				swapPlusMinus();
				break;
			case ")":
				incrementTurningAngle();
				break;
			case "(":
				decrementTurningAngle();
				break;
			default:
				console.warn("Unknown character: " + c);
				break;
		}
	}
}

// F: Move forward by line length drawing a line
function moveForwardDraw() {
	let x = currentPosition[0] + cos(angle) * lineLength;
	let y = currentPosition[1] + sin(angle) * lineLength;
	if (polygonOpen) {
		polygonVertices.push([x, y]);
	} else {
		line(currentPosition[0], currentPosition[1], x, y);
	}
	currentPosition = [x, y];
}

// f: Move forward by line length without drawing a line
function moveForwardNoDraw() {
	let x = currentPosition[0] + cos(angle) * lineLength;
	let y = currentPosition[1] + sin(angle) * lineLength;
	currentPosition = [x, y];
}

// +: Turn left by turning angle
function turnLeft() {
	if (swapPlusMinusState) {
		angle -= turningAngle;
		return
	}
	angle += turningAngle;
}

// -: Turn right by turning angle
function turnRight() {
	if (swapPlusMinusState) {
		angle += turningAngle;
		return
	}
	angle -= turningAngle;
}

// |: Reverse direction (turn by 180 degrees)
function reverseDirection() {
	angle += Math.PI;
}

// [: Push current drawing state onto stack
function pushState(i) {
	stateStack.push([i, currentPosition[0], currentPosition[1], angle, currentLineWidth]);
}

// ]: Pop current drawing state from the stack
function popState(i) {
	let stackIndex = stateStack.length - 1;
	currentPosition = [stateStack[stackIndex][1], stateStack[stackIndex][2]];
	angle = stateStack[stackIndex][3];
	currentLineWidth = stateStack[stackIndex][4];
	strokeWeight(currentLineWidth);
}

// #: Increment the line width by line width increment
function incrementLineWidth() {
	currentLineWidth += lineWidthIncrement;
	strokeWeight(currentLineWidth);
}

// !: Decrement the line width by line width increment
function decrementLineWidth() {
	currentLineWidth -= lineWidthIncrement;
	strokeWeight(currentLineWidth);
}

// @: Draw a dot with line width radius
function drawDot() {
	let x = currentPosition[0];
	let y = currentPosition[1];
	strokeWeight(currentLineWidth);
	point(x, y);
}

// {: Open a polygon
function openPolygon() {
	polygonVertices = [[currentPosition[0], currentPosition[1]]];
	polygonOpen = true;
}

// }: Close a polygon and fill it with fill colour
function closePolygon() {
	if (polygonOpen && polygonVertices.length > 2) {
		fill(100, 150, 255); // Default fill colour
		beginShape();
		for (let v of polygonVertices) {
			vertex(v[0], v[1]);
		}
		endShape(CLOSE);
		noFill(); // Reset to no fill
	}
	polygonVertices = [];
	polygonOpen = false;
}

// >: Multiply the line length by the line length scale factor
function multiplyLineLength() {
	lineLength *= lineLengthScaleFactor;
}

// <: Divide the line length by the line length scale factor
function divideLineLength() {
	lineLength /= lineLengthScaleFactor;
}

// &: Swap the meaning of + and -
function swapPlusMinus() {
	swapPlusMinusState = !swapPlusMinusState;
}

// ): Increment turning angle by turning angle increment
function incrementTurningAngle() {
	turningAngle += turningAngleIncrement;
}

// (: Decrement turning angle by turning angle increment
function decrementTurningAngle() {
	turningAngle -= turningAngleIncrement;
}

function draw() {

}

function mousePressed() {

}