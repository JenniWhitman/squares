class Color {

	constructor() {
		this.r = getRandomInt(0, 255);
		this.g = getRandomInt(0, 255);
		this.b = getRandomInt(0, 255);
		this.bw = blackOrWhite(this.r, this.g, this.b);
		this.backgroundColor = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
		this.color = "rgb(" + this.bw + "," + this.bw + "," + this.bw + ")";
	}
}

/* Function to randomize numbers a little better */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Function to determine whether a color needs black or white text */
function blackOrWhite(r, g, b) {
	var val = 0;
	if ((r * 0.299 + g * 0.587 + b * 0.114) < 186) {
		var val = 255
	}
	return val;
}

/* This function randomizes the colors by instantiating a new Color
   object */
function randomize(elem) {
	let c = new Color();
	elem.style.color = c.color;
	elem.style.backgroundColor = c.backgroundColor;
	for (var i = 0; i < elem.childNodes.length; i++) {
		if (elem.childNodes[i].className == "content") {
			var child = elem.childNodes[i].getElementsByTagName('p')[0];
			child.innerHTML = c.backgroundColor;
			break;
		}
	}
}

/* Roll takes an list of elements and makes colors for them all */
function roll(elements) {
	for (var i = 0, length = elements.length; i < length; i++) {
		randomize(elements[i]);
	}
}

/* This function rerolls all box colors, but not the rest */
function reroll(elements) {
	roll(document.getElementsByClassName("box"));
}


function makeGrid(numOfSquares) {
	document.getElementById("grid-container").innerHTML = "";
	for (var x = 0; x < numOfSquares; x++) {
		var row_div = document.createElement('div');
		row_div.setAttribute('class', 'grid-container');
		for (var y = 0; y < numOfSquares; y++) {
			var square = document.createElement('div');
			square.setAttribute('class', 'square');
			var content = document.createElement('div');
			content.setAttribute('class', 'content');
			square.appendChild(content);
			row_div.appendChild(square);
		}
		document.getElementById("grid-container").appendChild(row_div);
	}
}

function changeGrid() {
	makeGrid(document.getElementById("num-squares").value);
	fSquare = function() {
		changeColor(this);
	};
	addEventListenerByClass('square', 'click', fSquare);
}

function addEventListenerByClass(className, event, f) {
	var list = document.getElementsByClassName(className);
	for (var i = 0, len = list.length; i < len; i++) {
		list[i].addEventListener(event, f, false);
	}
}

function getColor(elem) {
	var error = document.getElementById("error");
	color = elem.style.backgroundColor;
	if (typeof color !== 'undefined') {
		error.style.display = 'none';
	} else {
		error.style.display = 'block';
		error.innerHTML = "The color is not being selected properly, please refresh to continue.";
	}
}

function changeColor(elem) {
	var error = document.getElementById("error");
	if (typeof color !== 'undefined') {
		error.style.display = 'none';
		elem.style.backgroundColor = color;
	} else {
		error.style.display = 'block';
		error.innerHTML = "Please select a colored square in order to change the color of grid squares.";
	}
}

function start() {
	changeGrid();
	roll(document.getElementsByClassName("box"));
	// roll(document.getElementsByClassName("btn"));
	var fBox = function() {
		getColor(this);
	};
	addEventListenerByClass('box', 'click', fBox);
	addEventListenerByClass('square', 'click', fSquare);
}