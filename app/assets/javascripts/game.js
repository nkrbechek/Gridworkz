var a_canvas = document.getElementById("a");
var context = a_canvas.getContext("2d");

//draw
context.fillStyle = "yellow";
context.beginPath();
context.arc(95, 85, 40, 0, 2*Math.PI);
context.closePath();
context.closePath();
context.fill();
context.lineWidth = 2;
context.stroke();
context.fillStyle = "black";

context.font = "30px Garamond";
context.fillText("Hello, World!",15,175);