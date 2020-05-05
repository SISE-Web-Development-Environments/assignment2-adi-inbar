var curr_lives = 5;
var MAX_LIVES =5;
// new var defenitions untill here
var context;
var shape = new Object();
var board; // food<2 bonus =1.5, pacman =2 , wall =4 , ghost =5 , pill = 10, time =11
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

var bonus_50_shape = new Object();
var monsters = new Array();
var numBalls_5_point ;
var numBalls_15_point ;
var numBalls_25_point ;
var LOST = false;
var cell=new Array();
var count_interval =0;
var user_name = "p"; 
var loged_in = false;

var no_pill=true;
var no_time=true;
monster_image = new Image();
monster_image.src = "images/pngwing.com.png"; 
bonus50_image = new Image();
bonus50_image.src = "images/shortcake_1f370.png";
moretime_image = new Image();
moretime_image.src = "images/stopwatch_23f1.png";
pill_image = new Image();
pill_image.src = "images/pill_1f48a.png";

localStorage.setItem("users",JSON.stringify({p:{password:"p"}}));

$(document).ready(function() {
	context = canvas.getContext("2d");
	$("#Main").hide();
	$("#login_div").hide();
	$("#ragistration_div").hide();
	$("#alert_ragistration").hide();
	$("#alert_login").hide();
	localStorage.setItem("current", "welcome");
});

function Start() {
	game_over = false;
    if( game_sound == null){
        game_sound = new sound("music.mp3");
    }
    game_sound.stop();
    muteAudio();
	game_sound.play();
	loss_sound = new sound("music/Ghost.mp3");
    /*changes untill here */

	var food_remain=50;
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	creat_cell_for_monsters();
	//food partition
	numBalls_5_point = Math.floor(food_remain/0.6) ;
    numBalls_15_point = Math.floor(food_remain/0.3) ;
    numBalls_25_point = Math.floor(food_remain/0.1) ;
	var pacman_remain = 1;
	start_time = new Date();
	shape.direction = 4;
	var monster_index = 0;
	
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

			}
			else if(monster_index<ghosts_remain && (i==0 && j==0 || i==0 && j==9 || i==9 && j==0 || i==9 && j==9)){
				board[i][j]=5;
				monsters[monster_index]=new Object();
				monsters[monster_index].i_index=i;
				monsters[monster_index].j_index=j;
				monsters[monster_index].candy = 0;
				monster_index++;
			}
			else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = randomCandyChoise();
				} 
				else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} 
				else{
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = randomCandyChoise();
		food_remain--;
	}
	//create  the bonos item
	creat_bonus_shape();

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
			}
			keysDown[e.keyCode] = false;
		},
		false
	);
	if( game_over == false){
        interval = setInterval(UpdatePosition, 100);
	}

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.innerText = score;
	lblTime.innerText = time_elapsed;
	lblLives.innerText = curr_lives;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			//pacman
			if (board[i][j] == 2) {

				//up
				if(shape.direction==1){
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.lineWidth = 1;
					context.strokeStyle = '#003300';
					context.stroke();
					context.fill();
					context.beginPath();
					context.arc(center.x -15, center.y -5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

				//dawn
				if(shape.direction==2){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.lineWidth = 1;
					context.strokeStyle = '#003300';
					context.stroke();
					context.fill();
					context.beginPath();
					context.arc(center.x -15, center.y -5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

				//left
				if(shape.direction==3){
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.lineWidth = 1;
					context.strokeStyle = '#003300';
					context.stroke();
					context.fill();
					context.beginPath();
					context.arc(center.x -5, center.y -15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}

				//to the right
				if(shape.direction==4){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.lineWidth = 1;
					context.strokeStyle = '#003300';
					context.stroke();
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
					
				}
			} 
			//food
			else if (board[i][j] == 1.05) {
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2* Math.PI); // circle
				context.fillStyle = fiveColor; //color
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = '#003300';
				context.stroke();
				 
			}
			else if(board[i][j] == 1.65){
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = tenColor; //color
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = '#003300';
				context.stroke();
			}
			else if(board[i][j] == 1.95){
				context.beginPath();
				context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
				context.fillStyle = fifteenColor; //color
				context.fill();
				context.lineWidth = 1;
				context.strokeStyle = '#003300';
				context.stroke();
			}
			else if(board[i][j]==1.5){
				context.drawImage(bonus50_image,center.x-15, center.y-15,40,40);
			}
			//wall
			else if (board[i][j] == 4) {
				//context.drawImage(wall,center.x-15, center.y-15,50,60);
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			//draw monster
			else if(board[i][j]==5){
				context.drawImage(monster_image,center.x-15, center.y-15,50,50);
			}
			//pill
			else if(board[i][j]==10){
				context.drawImage(pill_image,center.x-15, center.y-15,50,50);
			}
			//more time
			else if(board[i][j]==11){
				context.drawImage(moretime_image,center.x-15, center.y-15,50,50);
			}

			if (game_over) {
				let img = document.getElementById("gameOver");
				context.drawImage(img, 30, 50, 500, 350);
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	count_interval++;
	
	//direction
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
			shape.direction = 1;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			shape.direction = 2;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			shape.direction = 3;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			shape.direction = 4;
		}
	}

	//score
	if (board[shape.i][shape.j] == 1.05) {
		score= score + 5;
	}
	else if(board[shape.i][shape.j] == 1.65){
		score= score + 15
	}
	else if(board[shape.i][shape.j] == 1.95){
		score= score + 25;
	}
	else if(board[shape.i][shape.j] == 1.5){
		score= score + 50;
	}

	else if(board[shape.i][shape.j] == 5){
		LOST=true;
	}


	if(count_interval % 5 == 0){
		move_monster();
	}
	if(count_interval % 15 == 0){
		move_bonus_50();
	}

	if(LOST)
    {
		if(!muteAudio_on){
			game_sound.stop();
			loss_sound.play();
			game_sound.play();
		}
		reset_game();
	}

	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;

	// if (time_elapsed <= 10 && no_time) {
	// 	cell_for_time = findRandomEmptyCell(board);
	// 	board[cell_for_time[0]][cell_for_time[1]]=11;
	// 	no_time = false;
	// 	game_time = game_time+10;
	// }
	// if(curr_lives==2 && no_pill){
	// 	cell_for_pill = findRandomEmptyCell(board);
	// 	board[cell_for_pill[0]][cell_for_pill[1]]=10;
	// 	no_pill = false;
	// 	curr_lives++;
	// }

	// GAME OVER
	// time over 
	if (time_elapsed >= game_time) {
		alert('time 0');

		window.clearInterval(interval);
        if (score >= 100) {
			pac_color = "green";
			 openModal('winner');
        } else { //you are better 
			pac_color = "red";
			openModal('low_score');
		}
		game_over = true;
        Draw();
		gameOver();	
		return;
	}
	// ELSE IF- LIVES OVER
	else if( curr_lives == 0){
		alert('live 0');
		window.clearInterval(interval);
		pac_color = "red";
		openModal('looser');
		game_over = true;
        Draw();
		gameOver();
		return;
	}
	else {
        Draw();
	}
	
	//Draw();

}

// 
// adi::

//<!--for ragistration and login-->
function onSubmitFunc() {

	var username = $("#cname").val();
	var userPassword = $("#password").val();
	var fullName = $("#fname").val();
	var usersObj = JSON.parse(localStorage.getItem("users"));

	if (userPassword.length < 6 || !(userPassword.match(/\d+/g)) || !(userPassword.match(/[a-z]/i))){
        alert("Password Length should be 6 characters and should include numbers and letters!")
	}
	else if ((fullName.length < 1) || (fullName.match(/\d+/g))){
        alert("First name length should be larger then 1, without numbers!");
    }
	else if(usersObj[username]==undefined){
		usersObj[username] = {password:userPassword};
		localStorage.setItem("users",JSON.stringify(usersObj));
		switchDivs("login_div");
		user_name = username;
	}
	return false;
}; // jQuery End


function onLoginFunc(){

	var loginName = $("#cnameLog").val();
	var loginPass = $("#passwordLog").val();
	var users = JSON.parse(localStorage.getItem("users"));
	if(users[loginName]==undefined){
		console.log("no user")
		alert("There is no user with this name");	
	}
	else if(users[loginName].password!=loginPass){
		console.log("no")
		alert("The password is incorrect");
	}
	else{
		loged_in = true;
		switchDivs('settings');
	}
	return false;
};


//game

function creat_cell_for_monsters(){
	for(var i =0 ; i < 4 ; i++){
		cell[i]=new Object();
	}
	cell[0].i=0;
	cell[0].j=0;
	cell[1].i=0;
	cell[1].j=9;
	cell[2].i=9;
	cell[2].j=9;
	cell[3].i=9;
	cell[3].j=0;
}

function randomCandyChoise ()
{
    while (true){
    var randomNum = Math.random();
    if (randomNum<=0.6 && numBalls_5_point>0 )
    {
        return 1.05;
    }
    if (randomNum>0.6 && randomNum<=0.9 && numBalls_15_point>0 )
    {
            return 1.65;
    }
    if (randomNum>0.9 &&  numBalls_25_point>0)
    {
        return 1.95 ;
    }
    if (numBalls_5_point==0 && numBalls_15_point==0 && numBalls_25_point==0)
    {
        return 0 ;
    }
    }
}

function move_monster(){
	var m_i;
	var m_j;
	
	for(var i=0; i < ghosts_remain ; i++){
		var up = 1000;
		var down = 1000;
		var left = 1000;
		var right = 1000;

		m_i = monsters[i].i_index;
		m_j = monsters[i].j_index;
		board[m_i][m_j]=monsters[i].candy;
	
		// left.
		if(m_i > 0 && board[m_i-1][m_j] < 3){
			left = (Math.abs(m_i - 1 - shape.i) + Math.abs(m_j - shape.j));
		}
		//right
		if(m_i < 9 && board[m_i+1][m_j] < 3){
			right = (Math.abs(m_i + 1 - shape.i) + Math.abs(m_j - shape.j));
		}
		//up
		if(m_j > 0 && board[m_i][m_j-1] < 3){
			up = (Math.abs(m_i - shape.i) + Math.abs(m_j - 1 - shape.j));
		}
		//down
		if(m_j < 9 && board[m_i][m_j+1] < 3){
			down = (Math.abs(m_i - shape.i) + Math.abs(m_j + 1 - shape.j));
		}

		var min = Math.min(up, down, right, left);

		if (min != 1000) {
			
			//up
			if (min == up) {
				monsters[i].j_index = m_j-1;
				monsters[i].candy = board[m_i][m_j-1];
			}
			//right
			else if (min == right) {
				monsters[i].i_index=m_i+1;
				monsters[i].candy = board[m_i+1][m_j];
			}
			//left
			else  if (min == left) {
				monsters[i].i_index=m_i-1;
				monsters[i].candy = board[m_i-1][m_j];
			}
			//down
			else if (min == down) {
				monsters[i].j_index = m_j+1;
				monsters[i].candy = board[m_i][m_j+1];
			}
			if(min==0){
				LOST=true;
			}

			board[monsters[i].i_index][monsters[i].j_index]=5;
		}
	}
}

function move_bonus_50(){

	var i = Math.floor((Math.random() * 9) + 1);
	var j = Math.floor((Math.random() * 9) + 1);
    while(board[i][j]>=2)
    {  
	    i = Math.floor((Math.random() * 9) + 1);
        j = Math.floor((Math.random() *9) + 1);
	}
	board[bonus_50_shape.i][bonus_50_shape.j]=bonus_50_shape.candy;
	bonus_50_shape.i = i;
	bonus_50_shape.j = j;
	bonus_50_shape.candy = board[i][j];
	board[i][j]=1.5;
}

function creat_bonus_shape(){
	bonus_50_shape.candy = board[1][1];
	bonus_50_shape.i = 1;
	bonus_50_shape.j = 1;
	board[1][1] = 1.5;

}

function reset_game() {
	for(var i = 0 ; i < ghosts_remain ; i++){
		board[monsters[i].i_index][monsters[i].j_index]=monsters[i].candy;
		monsters[i].candy = board[cell[i].i][cell[i].j];
		monsters[i].i_index = cell[i].i;
		monsters[i].j_index = cell[i].j;
		board[cell[i].i][cell[i].j]=5;
	}
	LOST = false;
	score = score -10;
	curr_lives--;
	set_packman_start_position();
}

function set_packman_start_position(){
	var cell_for_pacman = findRandomEmptyCell(board);
	shape.i = cell_for_pacman[0];
	shape.j = cell_for_pacman[1];
	shape.direction = 4;
}



