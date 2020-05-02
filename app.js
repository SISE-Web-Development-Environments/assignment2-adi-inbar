let curr_lives = 5;
const MAX_LIVES =5;
// new var defenitions untill here
var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

localStorage.setItem("users",JSON.stringify({p:{password:"P"}}));



$(document).ready(function() {
	context = canvas.getContext("2d");
<<<<<<< HEAD
	$("#Main").hide();
	$("#login_div").hide();
	$("#ragistration_div").hide();
	$("#alert_ragistration").hide();
	$("#alert_login").hide();
	localStorage.setItem("current", "welcome");
});

/*updte fun and change to Start*/
// function start() {
// 	board = new Array();
// 	score = 0;
// 	pac_color = "yellow";
// 	var cnt = 100;
// 	var food_remain = 50;
// 	var pacman_remain = 1;
// 	start_time = new Date();
// 	for (var i = 0; i < 10; i++) {
// 		board[i] = new Array();
// 		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
// 		for (var j = 0; j < 10; j++) {
// 			if (
// 				(i == 3 && j == 3) ||
// 				(i == 3 && j == 4) ||
// 				(i == 3 && j == 5) ||
// 				(i == 6 && j == 1) ||
// 				(i == 6 && j == 2)
// 			) {
// 				board[i][j] = 4;
// 			} else {
// 				var randomNum = Math.random();
// 				if (randomNum <= (1.0 * food_remain) / cnt) {
// 					food_remain--;
// 					board[i][j] = 1;
// 				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
// 					shape.i = i;
// 					shape.j = j;
// 					pacman_remain--;
// 					board[i][j] = 2;
// 				} else {
// 					board[i][j] = 0;
// 				}
// 				cnt--;
// 			}
// 		}
// 	}
// 	while (food_remain > 0) {
// 		var emptyCell = findRandomEmptyCell(board);
// 		board[emptyCell[0]][emptyCell[1]] = 1;
// 		food_remain--;
// 	}
// 	keysDown = {};
// 	addEventListener(
// 		"keydown",
// 		function(e) {
// 			keysDown[e.keyCode] = true;
// 		},
// 		false
// 	);
// 	addEventListener(
// 		"keyup",
// 		function(e) {
// 			keysDown[e.keyCode] = false;
// 		},
// 		false
// 	);
// 	interval = setInterval(UpdatePosition, 250);
// }
=======
	open();
});

function open(){
	$("#alert_login").hide();
	$("#login_div").hide();
	$("#game_div").hide();
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}
>>>>>>> d1bd1adccdf1411991a35af87cc556bd6426ba0e

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.innerText = score;
	lblTime.innerText = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
	// changes here
	if (game_over) {
		let img = document.getElementById("gameOver");
		context.drawImage(img, 30, 50, 500, 350);
	}
}
// CHANGES HERE
function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}

	
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }

	console.log('inside interval');

	// GAME OVER
	if (time_elapsed >= game_time) {
		window.clearInterval(interval);
        if (score >= 5) {
			pac_color = "green";
			 openModal('winner');
        } else { //you are better 
			pac_color = "red";
			openModal('low_score');
		}
		game_over = true;
        Draw();
		gameOver();	
	}
	// ELSE IF- LIVES OVER
	else if( curr_lives == 0){
		window.clearInterval(interval);
		pac_color = "red";
		openModal('looser');
		game_over = true;
        Draw();
		gameOver();
	}
	 else {
        Draw();
    }
	// if (score == 50) {
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// } else {
	// 	Draw();
	// }
}
<<<<<<< HEAD
// adi::
=======

//<!--for ragistration and login-->
function onSubmitFunc() {
	var validation_holder;
	console.log("asd");
	var username = $("#cname").val();
	var userPassword = $("#password").val();
	var usersObj = JSON.parse(localStorage.getItem("users"));
	if(usersObj[username]==undefined){
		usersObj[username] = {password:userPassword};
		localStorage.setItem("users",JSON.stringify(usersObj));
		$("#ragistration_div").hide()
		$("#login_div").show();
	}
	else{
		showAlert_ragistration();	
	}	
	return false;

}; // jQuery End

function onLoginFunc(){

	var loginName = $("#cnameLog").val();
	var loginPass = $("#passwordLog").val();
	var users = JSON.parse(localStorage.getItem("users"));
	if(users[loginName]==undefined){
		console.log("no user")
		showAlert_login();
		return false;
	}
	if(users[loginName].password!=loginPass){
		console.log("no")
		showAlert_login();
		return false;
	}
	$("#login_div").hide();
	$("#game_div").show();
	$("#game_div").children().show();
	
}

function showAlert_ragistration(){
	$("#alert_ragistration").show(1000);
}

function showAlert_login(){
	$("#alert_login").show(1000);

}







>>>>>>> d1bd1adccdf1411991a35af87cc556bd6426ba0e
