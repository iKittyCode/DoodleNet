var canvas;
let clearbutton;
let classfier
let div;

function setup() {
	canvas = createCanvas(400, 400)
	clearbutton = createButton('clear')
	clearbutton.mousePressed(clearColor)
	background(255)
	div = createDiv()
	classfier = ml5.imageClassifier('DoodleNet', modelReady);

	function modelReady() {
		console.log("Model ready")
		classfier.classify(canvas, gotResults)
	}
}


function gotResults(error, results) {
	if (error) {
		console.error(error)
		return;
	}
	var text = `${results[0].label} ${floor(results[0].confidence * 100)}%<br>${results[1].label} ${floor(results[1].confidence * 100)}%`

	div.html(text)
	classfier.classify(canvas, gotResults)
}

function draw() {
	if (mouseIsPressed) {
		strokeWeight(16)
		line(mouseX, mouseY, pmouseX, pmouseY)
	}
}

function clearColor() {
	background(255)
}