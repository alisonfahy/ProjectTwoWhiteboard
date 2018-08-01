var socket;

var canvas;

var slider;

var c, r, g, b;

// setup for page start
function setup() {
	canvas = createCanvas(windowWidth - 15, windowHeight - 15);

	canvas.position(0, 0);
	canvas.style("z-index", "-1");
	canvas.parent("contentDiv");

	// set color to black on load
	c = color(0);
	r = 0; g = 0; b = 0;

	//Creates slider, and position
	slider = createSlider(1, 50, 10);
	slider.position(1000, 260);

	// load the dummy image to the page
	img = loadImage("./images/canvasTest.png");

	// download button
	var button = $("#btn-download");
	button.on("click", function (e) {
		e.preventDefault();
		download();
	});

	// canvas.parent('sketch-holder');


	// socket io connection ideas
	// use ip address
	// socket = io.connect("yourIpAddress:yourPort");
	//use localhost and port
	// socket = io.connect("localhost:8080");s
	// //use hostname
	// var socket = io.connect(window.location.hostname);
	// // calling .connect() should use the server it's hosted on
	// var socket = io.connect();
	socket = io();

	// check current url and switch to that room if exists
	var currentUrl = $(location).attr('href');
	var currentRoomName = currentUrl.replace("http://localhost:8080/", "");
	if (currentRoomName === "") {
		switchRoom("default");
	}
	else {
		switchRoom(currentRoomName);
	}
	console.log("currentRoomName: ", currentRoomName);


	// board search get request for dummy form
	// $.get("/api/" + boardSearch, function (data) {
	// 	if(data){
	// 	// log the data to our console
	// 	console.log(data);
	// 	console.log(data.routeName);
	// 	switchRoom(data.routeName);
	// 	}
	// 	else{
	// 		switchRoom("default");
	// 	}
	// });

	//board search get request for dummy form
	// $("#boardButton").on("click", function(){
	// 	var boardSearch = $("#boardSearch").val().trim();
	// 	$.get("/api/" + boardSearch, function (data) {
	// 		// log the data to our console
	// 		console.log(data);
	// 		console.log(data.routeName);
	// 		switchRoom(data.routeName);
	// 	});
	// });

	// socket connection for "mouse"
	socket.on("mouse", newDrawing);

	// post request for the dummy form
	$("#test").on("click", function (e) {
		e.preventDefault();
		console.log("test");
		var newBoard = {
			name: $("#name").val().trim(),
			description: $("#description").val().trim(),
			route: $("#route").val().trim(),
		};

		$.post("/api/posts", newBoard)
			// on success, run this callback
			.then(function (data) {
				// log the data we found
				console.log(data);
				// tell the user we're adding a character with an alert window
				alert("new whiteboard");
			});

		// empty each input box by replacing the value with an empty string
		$("#route").val("");
		$("#description").val("");
		$("#route").val("");

	});



	function switchRoom(room) {
		socket.emit('switchRoom', room);
		console.log("room: ", room);
	}

	var red = select("#cred")
	red.mousePressed(function () {

		c = color(255, 0, 0);
		r = 255; g = 0; b = 0;
	});

	var green = select("#cgreen")
	green.mousePressed(function () {
		c = color(14, 126, 18);
		r = 14; g = 126; b = 18;
	});

	var blue = select("#cblue")
	blue.mousePressed(function () {
		c = color(0, 0, 255);
		r = 0; g = 0; b = 255;
	});

	var black = select("#cblack")
	black.mousePressed(function () {
		c = color(0, 0, 0);
		r = 0; g = 0; b = 0;
	});
	var white = select("#cwhite")
	white.mousePressed(function () {
		c = color(255, 255, 255);
		r = 255; g = 255; b = 255;
	});

	//setup for page end
}

// resize canvas on window resize
function windowResized() {
	resizeCanvas(windowWidth - 15, windowHeight - 15);
}

//download function
function download() {
	saveCanvas(canvas, "canvas.png");
}

// new drawing function triggers by socket mouse data received
function newDrawing(data) {
	noStroke();
	var mouseColor = color(data.r, data.g, data.b);
	fill(mouseColor);
	stroke(mouseColor);
	strokeWeight(50);
	line(data.px, data.py, data.x, data.y);

}

//mouse dragged triggers socket emit
function mouseDragged() {
	// console.log(mouseX, mouseY);

	var data = {
		r: r,
		g: g,
		b: b,
		px: pmouseX,
		py: pmouseY,
		x: mouseX,
		y: mouseY
	}

	if (mouseX < windowWidth && mouseX > 0 && mouseY < windowHeight && mouseY > 0) {
		socket.emit("mouse", data);
	}
	// noStroke();
	// fill(c);
	// ellipse(mouseX, mouseY, 10, 10)
}

// mouse pressed triggers socket emit
function mousePressed() {

	var data = {
		r: r,
		g: g,
		b: b,
		px: pmouseX,
		py: pmouseY,
		x: mouseX,
		y: mouseY
	}

	socket.emit("mouse", data);

	console.log(mouseX, mouseY);
	//Removed mousePressed events because each time line is drawn it still had a blob attach from start of line
}

// drawing section constantly redraws to canvas
function draw() {
	// background(bg, windowWidth, windowHeight);

	if (mouseIsPressed) {
		line(mouseX, mouseY, pmouseX, pmouseY);
		stroke(c);
		strokeWeight(slider.value());
	}

	image(img, 0, 0);
}

//////Saving image via AJAX to serverside////////
var canvas = document.getElementById('sketch-holder');
var dataURL = canvas.toDataURL();

$.ajax({
    type: "POST",
    url: "http://localhost:8080/board:id",
    data: { 
        imgBase64: dataURL
    }
});