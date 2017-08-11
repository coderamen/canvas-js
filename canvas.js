var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// adding colors for rec
// c.fillStyle = 'rgba(255,0,0,.5)';
// c.fillRect(x, y, width, height)
// c.fillRect(100, 100, 100, 100)
// c.fillStyle = 'rgba(0,255,0,.5)';
// c.fillRect(400, 100, 100, 100)
// c.fillStyle = 'rgba(0,0,255,.5)';
// c.fillRect(300, 300, 100, 100)
// console.log(canvas);

// line
// c.beginPath();
// c.moveTo(x,y)
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "blue";
// c.stroke();

// c.beginPath();
// arc / circle
// c.arc(300, 300, 30, Math.PI*2 startAngle: Float,
// 	drawCounterClockWise: Bool(false));
// c.arc(300, 300, 30, Math.PI*2, false);
// c.strokeStyle = 'red';
// c.stroke();

// for (var i = 0; i < 100; i++) {
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
//  	c.beginPath();
// 	c.arc(x, y, 30, Math.PI * 2, false);
// 	c.strokeStyle = 'red';
// 	c.stroke();
// };

// Animation tutorial

// arc / circle
// c.arc(200, 200, 30, Math.PI*2 startAngle: Float,
// 	drawCounterClockWise: Bool(false));


//TODO: adding interactivity

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
	'#1ABC9C',
	'#2ECC71',
	'#3498DB',
	'#9B59B6',
	'#34495E',
];

//FIXME: call our window and add event listener
window.addEventListener( 'mousemove', function (event) {
	// event will produce an object
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener( 'resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})


//TODO: function to create a circle
function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = minRadius;
	this.color  = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();			
	}

	//TODO: function to update and repeat circles in different location
	this.update = function() {
		if (this.x + this.radius > innerWidth || 
			this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + radius > innerHeight || 
			this.y - radius < 0) {
			this.dy = -this.dy;
		} 
		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
			&& mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius ) {
			this.radius -= 1;
		}
		this.draw();
	}
}

var circleArray = [];

function init() {
	circleArray = [];

	for (var i = 0; i < 800; i++) {
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5); // velocity means speed of animation of object
		var dy = (Math.random() - 0.5); // velocity means speed of animation of object
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate); 
	c.clearRect(0,0, innerWidth, innerHeight
		);
		 
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();