window.onload = function() {
	var numbers = [
		'zero','one','two','three','four','five',
		'six','seven','eight','nine','ten','eleven',
		'twelve','thirteen','fourteen','fifteen',
		'sixteen','seventeen','eighteen','nineteen',
	]

	var pre = ['twenty','thirty','fourty','fifty'];
	for(var i=0;i<pre.length;i++) {
		numbers.push(pre[i]);
		for(var j=1;j<10;j++){
			numbers.push(pre[i] + '-' + numbers[j]);
		}
	}

	function clockMessage() {
		var date = new Date();
		var hour = date.getHours() % 12;
		var minute = date.getMinutes();
		var message = '<span>' + numbers[hour] + '</span><br/>' + numbers[minute];
		return message;
	}

	var clock = document.getElementById('clock');
	clock.innerHTML = clockMessage();
	setInterval(function() {
		clock.innerHTML = clockMessage();
	},1000);

	function Ball(x,y) {
		var xvel = .005 - Math.random() * .01;
		var yvel = .005 - Math.random() * .01;
		this.getX = function() { return x; }
		this.getY = function() { return y; }
		this.update = function(p1,p2) {
			x += xvel;
			y += yvel;
			if(y <= 0) { yvel = Math.abs(yvel); }
			if(y >= 1) { yvel = -1 * Math.abs(yvel); }

			if(x <= 0) { x = 0.5; xvel = .005 - Math.random() * .01; p2.score++; }
			if(x >= 1) { x = 0.5; xvel = .005 - Math.random() * .01; p1.score++; }

			if(x < 0.5) {
				if(p1.getY() - p1.getH() / 2 < y &&
				   y < p1.getY() + p1.getH() / 2 &&
				   p1.getX() - p1.getW() / 2 < x &&
				   x < p1.getX() + p1.getW() / 2) {
					xvel = .005 - Math.random() * .01;
				}
			}
			else {
				if(p2.getY() - p2.getH() / 2 < y &&
				   y < p2.getY() + p2.getH() / 2 &&
				   p2.getX() - p2.getW() / 2 < x &&
				   x < p2.getX() + p2.getW() / 2) {
					xvel = .005 - Math.random() * .01;
				}
			}
		}
		this.render = function(canvas,context) {
			var X = x * canvas.width;
			var Y = y * canvas.height;
			context.fillStyle = '#ececec';
			context.fillRect(X-5,Y-5,10,10);
		}
	}

	function Player(side) {
		var x = (side === 'left') ? 0.1 : 0.9;
		var y = 0.5;
		var w = 0.05;
		var h = 0.3;
		this.score = 0;
		this.getX = function() { return x; }
		this.getY = function() { return y; }
		this.getW = function() { return w; }
		this.getH = function() { return h; }
		this.update = function(ball) {
			if(ball.getY() > y) { y += .01; }
			else if(ball.getY() < y) { y -= .01; }
		}
		this.render = function(canvas,context) {
			var X = x * canvas.width;
			var Y = y * canvas.height;
			var W = w * canvas.width;
			var H = h * canvas.height;
			context.fillStyle = '#ececec';
			context.fillRect(X-W/2,Y-H/2,W,H);

			context.fillText(this.score,canvas.width * ((side === 'left') ? 0.25 : 0.75),canvas.height*0.25);
		}
	}

	var canvas = document.getElementById('pong');
	var context = canvas.getContext('2d');
	var ball = new Ball(0.5,0.5);
	var p1 = new Player('left');
	var p2 = new Player('right');
	
	setInterval(function() {
		context.fillStyle = '#000';
		context.fillRect(0,0,canvas.width,canvas.height);
		ball.update(p1,p2);
		p1.update(ball);
		p2.update(ball);
		ball.render(canvas,context);
		p1.render(canvas,context);
		p2.render(canvas,context);
	});
}
