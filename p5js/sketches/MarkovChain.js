let trainingText = "";
let wordList = [];
let wordListPlain = [];
let startWord = "";
let finalText = "";
let cleanedText = "";
let wordToIndex = {};

async function setup() {
	trainingText = await loadStrings('assets/text/cpdv_text_only.txt');
	createCanvas(windowWidth, windowHeight);
	background(255, 255, 230);

	trainingText = splitText(trainingText);

	wordToIndex = {};
	wordList = [];
	wordListPlain = [];

	for (let i = 0; i < trainingText.length; i++) {
		let word = trainingText[i];
		let nextWord = trainingText[i + 1];

		if (wordToIndex[word] === undefined) {
			wordToIndex[word] = wordList.length;
			wordList.push([word, []]);
			wordListPlain.push(word);
		}

		if (nextWord !== undefined) {
			let idx = wordToIndex[word];
			wordList[idx][1].push(nextWord);
		}
	}

	startWord = wordList[round(random(0, wordList.length - 1))][0];
	finalText = startWord;

	for (let i = 0; i < 100; i++) {
		startWord = generateNextWord(startWord);
		if (startWord === '.' || startWord === ',' || startWord === ';' || startWord === ':' || startWord === '!' || startWord === '?') {
			finalText += startWord;
		} else {
			finalText += " " + startWord;
		}
	}

	textSize(windowHeight / 18);
	console.log(finalText);
	text(finalText, 10, 10, windowWidth-20, windowHeight-20);
}

function splitText(text) {
	cleanedText = "";
	for (let i = 0; i < text.length; i++) {
		cleanedText += " " + text[i];
	}
	cleanedText = cleanedText
		.replaceAll(".", " . ")
		.replaceAll("!", " ! ")
		.replaceAll("?", " ? ")
		.replaceAll(",", " , ")
		.replaceAll(";", " ; ")
		.replaceAll(":", " : ")
		.replaceAll('"', ' " ')
		.replaceAll("'", " ' ")
		.replaceAll("`", " ` ")
		.replaceAll("´", " ´ ")
		.replaceAll("   ", " ")
		.replaceAll("  ", " ")
		.split(" ");
	return cleanedText;
}

function generateNextWord(currentWord) {
	let currentWordIndex = getWordIndex(currentWord);
	// If no possible next words, return "."
	if (wordList[currentWordIndex][1].length === 0) {
		return '.';
	}
	let nextWordIndex = floor(random(0, wordList[currentWordIndex][1].length));
	let nextWord = wordList[currentWordIndex][1][nextWordIndex];
	return nextWord !== undefined ? nextWord : '.';
}

function getWordIndex(word) {
	return wordToIndex[word];
}

function draw() {

}

function mousePressed() {
}