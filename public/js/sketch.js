// global variables

	var socket;
	var canvas;

<<<<<<< HEAD
var slider;

var c, r, g, b;
=======
	var c, r, g, b, sliderVal;
	var sliderPos = 26;
>>>>>>> master

// setup for page start
function setup() {
	canvas = createCanvas(windowWidth - 15, windowHeight - 15);
	// pixelDensity(1);

<<<<<<< HEAD
	canvas.position(0, 0);
	canvas.style("z-index", "-1");
	canvas.parent("contentDiv");
=======
	//canvas positioned on content div
		canvas.position(0,0);
		canvas.style("z-index", "-1");
		canvas.parent("contentDiv");

	// socket connection
	socket = io();

	// var getImg = get();
	// console.log(getImg);
>>>>>>> master

	// set color to black on load
	c = color(0);
	r = 0; g = 0; b = 0;

	//Creates slider, and position
	slider = createSlider(1, 50, 10);
	slider.position(1000, 260);

	// load the dummy image to the page
<<<<<<< HEAD
	img = loadImage("./images/canvasTest.png");
=======
		// img = loadImage("./images/canvasTest.png");
>>>>>>> master

	// download button
	var button = $("#btn-download");
	button.on("click", function (e) {
		e.preventDefault();
		download();
	});

<<<<<<< HEAD
=======
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

>>>>>>> d2eae0aee99dbe820fd5e79aba156f7bfca5379f
	// check current url and switch to that room if exists
<<<<<<< HEAD
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
=======
		var currentUrl = $(location).attr('href');
	var currentRoomName = currentUrl.replace("https://whiteboardstudio.herokuapp.com/", "");
		if(currentRoomName === ""){
			switchRoom("default");
		}
		else{
			switchRoom(currentRoomName);
		}
<<<<<<< HEAD
		// console.log("currentRoomName: ",currentRoomName);
=======
		console.log("currentRoomName: ",currentRoomName);

	
>>>>>>> master
>>>>>>> d2eae0aee99dbe820fd5e79aba156f7bfca5379f

	// socket connection for "mouse"
	socket.on("mouse", newDrawing);

<<<<<<< HEAD
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


<<<<<<< HEAD
	function switchRoom(room) {
		socket.emit('switchRoom', room);
		// console.log("room: ",room);
=======
=======
>>>>>>> master

	function switchRoom(room) {
		socket.emit('switchRoom', room);
		console.log("room: ", room);
>>>>>>> d2eae0aee99dbe820fd5e79aba156f7bfca5379f
	}

<<<<<<< HEAD
	var red = select("#cred")
	red.mousePressed(function () {

		c = color(255, 0, 0);
		r = 255; g = 0; b = 0;
	});
=======
	// color buttons
		var red = select("#cred")
		red.mousePressed(function () {		
			c = color(255,0,0);
			r = 255; g = 0; b = 0;
		});
>>>>>>> master

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

<<<<<<< HEAD
	//setup for page end
=======
//end of setup for page
>>>>>>> master
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
<<<<<<< HEAD
function newDrawing(data) {
	noStroke();
	var mouseColor = color(data.r, data.g, data.b);
	fill(mouseColor);
	stroke(mouseColor);
	strokeWeight(50);
	line(data.px, data.py, data.x, data.y);

}
=======
	function newDrawing(data){

		socket.on("color", function(data){
				c = color(data.r, data.g,data.b);
			});
		
			fill(c);
			stroke(c);
			strokeWeight(data.s);
			line(data.px, data.py, data.x, data.y);
	}
>>>>>>> master

//mouse dragged triggers socket emit
function mouseDragged() {
	// console.log(mouseX, mouseY);

	var data = {
		px: pmouseX,
		py: pmouseY,
		x: mouseX,
		y: mouseY,
		s: sliderPos,
	}

<<<<<<< HEAD
	if (mouseX < windowWidth && mouseX > 0 && mouseY < windowHeight && mouseY > 0) {
=======
	if (mouseX < windowWidth && mouseX > 0 && mouseY < windowHeight && mouseY > 0){
>>>>>>> master
		socket.emit("mouse", data);
	}
}

// mouse pressed triggers socket emit
function mousePressed() {

	var data = {
		px: pmouseX,
		py: pmouseY,
		x: mouseX,
		y: mouseY,
		s: sliderPos,
	}
	var colorData = {
		r: r,
		g: g,
		b: b,
	}
	
	socket.emit('color',colorData);
	socket.emit("mouse", data);

<<<<<<< HEAD
	// console.log(mouseX, mouseY);
=======
	console.log(mouseX, mouseY);
<<<<<<< HEAD
	//Removed mousePressed events because each time line is drawn it still had a blob attach from start of line
=======
	// noStroke();
	// fill(c);
	// ellipse(mouseX, mouseY, 10, 10)
>>>>>>> master
>>>>>>> d2eae0aee99dbe820fd5e79aba156f7bfca5379f
}

// drawing section constantly redraws to canvas
function draw() {

	if (mouseIsPressed) {
		line(mouseX, mouseY, pmouseX, pmouseY);
		stroke(c);
<<<<<<< HEAD
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
=======
		strokeWeight(sliderPos);
		line(pmouseX, pmouseY, mouseX, mouseY);
	}
} 

// button pressed to change colors/slider values
function keyPressed() {
	// console.log("keypress func")
	// console.log(keyCode);

	if (keyCode == 49) {
		// console.log("Red") // 3 = red
		c = color(255, 0, 0);
		r = 255; g = 0; b = 0;

	} else if (keyCode == 50) {

		// console.log("Green") // 4 = green
		c = color(14, 126, 18);
		r = 14; g = 126; b = 18;


	} else if (keyCode == 51) {

		// console.log("Blue") // 5 = blue
		c = color(0, 0, 255);
		r = 0; g = 0; b = 255;


	} else if (keyCode == 52) {
		// console.log("key/black"); //1 = black
		c = color(0, 0, 0);
		r = 0; g = 0; b = 0;

	} else if (keyCode == 53) {
		// console.log("white"); // 2 = white
		c = color(255, 255, 255);
		r = 255; g = 255; b = 255;

	} else if (keyCode == 54) {

		// console.log("Cyan"); // 7 = cyan
		c = color(0, 255, 255);
		r = 0; g = 255; b = 255;

	} else if (keyCode == 55) {

		// console.log("Magenta"); // 8 = magenta
		c = color(255, 0, 255);
		r = 255; g = 0; b = 255;

	} else if (keyCode == 56) {

		// console.log("Yellow"); // 6 = yellow
		c = color(255, 255, 0);
		r = 255; g = 255; b = 0;

	} else if (keyCode == 57) {
		// console.log("Purple"); // 9 = purple
		c = color(128, 0, 128);
		r = 128; g = 0; b = 128;

	} else if (keyCode == 48) {
		// console.log("Orange"); // 0 = orange
		c = color(255, 165, 0);
		r = 255; g = 165; b = 0;

	} else if (keyCode == 38 || keyCode == 39) {
		// console.log("up");
		if (sliderPos !== 51) {
			// console.log("sliderPos: ", sliderPos);
			sliderPos += 5;
		}

	} else if (keyCode == 37 || keyCode == 40) {
		// console.log("down");
		if (sliderPos !== 1) {
			// console.log("sliderPos: ", sliderPos);
			sliderPos -= 5;
		}
	}
}
>>>>>>> master
