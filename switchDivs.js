	// Settings
	let settings_confirm = true;

	/* keys */

	let KeyBoardCurr = {left: 'ArrowLeft', up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown'};
	let KeyboardSet = {left: 37, up: 38, right: 39, down: 40};


	/*change to lolipops */
	let fiveColor = "#eff542";
	let fifteenColor = "#42a4f5";
	let twentyColor = "#f542cb";

	let numOfGhosts = 1;
	let max_monsters = 4;
	let min_monsters = 1;

    /*was chainges*/
	let numOfBalls = 50;
	let max_food = 90;
	let min_food = 50;

	let game_time = 60;
	// change to 60 
	let min_time = 5;
	let max_time = 300;
	// run game
	var game_over = false;
	var gameRunnig = false;
	var game_sound;
	var sound_on = false;
	var loss_sound;
	var muteAudio_on = false;


	function switchDivs(newDiv) {
  
	    var item = localStorage.getItem("current");
	    if (newDiv != item) {
		let toRemove = document.getElementById(item);
		let toAdd = document.getElementById(newDiv);
		if(newDiv == "welcome"){
		    toAdd.style.display = "flex";
		}else {
		    toAdd.style.display = "block";
		}
		toRemove.style.display = "none";
		/*check  */
		if(item == "ourGame"){
		    gameOver();
		}
		localStorage.setItem("current", newDiv);
	    }
	}
	// Settings 
	function randomSettings() {  
	    KeyBoardCurr.down = 'ArrowDown';
	    KeyBoardCurr.right = 'ArrowRight';
	    KeyBoardCurr.up = 'ArrowUp';
		KeyBoardCurr.left = 'ArrowLeft';
		
		KeyboardSet.down = 40;
	    KeyboardSet.right = 39;
	    KeyboardSet.up = 38;
	    KeyboardSet.left = 37;

	   document.getElementById("leftBotton").value = KeyBoardCurr.left;
	   document.getElementById("rightBotton").value = KeyBoardCurr.right;
	   document.getElementById("upBotton").value = KeyBoardCurr.up;
	   document.getElementById("downBotton").value = KeyBoardCurr.down;

	//  Colors
	document.getElementById("fiveColor_set").value =
	"#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
	document.getElementById("fifteenColor_set").value =
	"#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
	document.getElementById("twentyColor_set").value =
	"#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);

	 //  Game Time
	 game_time = Math.floor(Math.random() * (max_time - min_time + 1)) + min_time;
	 document.getElementById('gameTime_set').value = game_time;

	    // num  balls 
	    numOfBalls = Math.floor(Math.random() * (max_food - min_food + 1)) + min_food;
		document.getElementById('ballNumber_set').value = numOfBalls;
		
	    //num  monsters
	    numOfGhosts = Math.floor(Math.random() * (max_monsters - min_monsters + 1)) + min_monsters;
	    document.getElementById('monsters_set').value = numOfGhosts;
	}
	
	function validateNumBalls(element) {
	    if (element.value < min_food) {
		element.value = min_food;
		numOfBalls = parseInt(min_food);

	    } else if (element.value > max_food) {
		element.value = max_food;
		numOfBalls = parseInt(max_food);
	    } else {
		numOfBalls = parseInt(element.value);
	    }
	}
	/*define keys */
	function showBotton(event , pId) {
        if (event.keyCode == 9) {
            return;
        }
        var x = event.key;
		if(pId=="rightBotton"){
		KeyboardSet.right = event.keyCode;
		KeyBoardCurr.right = x;
		}
		else if(pId=="leftBotton"){
		KeyboardSet.left = event.keyCode;
		KeyBoardCurr.left = x;

		}else if(pId=="upBotton"){
		KeyboardSet.up = event.keyCode;
		KeyBoardCurr.up = x;
		}else if(pId=="downBotton"){
		KeyboardSet.down = event.keyCode;
		KeyBoardCurr.down = x;
        }
        
	    /*show in inbox  */
		document.getElementById(pId).value  = x;
	}

	function validateGameTime(element) {
	    if (element.value < min_time) {
		element.value = parseInt(min_time);
	    } else {
		game_time = parseInt(element.value);
	    }

	}

	/*exist-change in app */
	function GetKeyPressed() {
	    if (keysDown[KeyboardSet.up]) {
		return 1;
	    }
	    if (keysDown[KeyboardSet.down]) {
		return 2;
	    }
	    if (keysDown[KeyboardSet.left]) {
		return 3;
	    }
	    if (keysDown[KeyboardSet.right]) {
		return 4;
	    }
	}
	function gameStart() {
	    document.getElementById('input_score').innerText = "";
		numOfGhosts = parseInt(document.getElementById("monsters_set").value);
		numOfBalls = document.getElementById("ballNumber_set").value;
	    fiveColor = document.getElementById("fiveColor_set").value;
	    fifteenColor = document.getElementById("fifteenColor_set").value;
	    twentyColor = document.getElementById("twentyColor_set").value;

	    context = canvas.getContext("2d");
		if (!keyValidation()) {
			openModal('sameKeys');
		    settings_confirm = false;
		} else {
		    settings_confirm = true;
		}
	    	if (settings_confirm) {
		        gameRunnig = true;
				fillSettingsOnBoard();
                Start();
		        switchDivs('Main');
	    	}
		}
		function keyValidation(){
			if(KeyBoardCurr.up === KeyBoardCurr.right ||
				KeyBoardCurr.up === KeyBoardCurr.down ||
				KeyBoardCurr.up === KeyBoardCurr.left ||
				KeyBoardCurr.right === KeyBoardCurr.left ||
				KeyBoardCurr.right === KeyBoardCurr.down ||
				KeyBoardCurr.left === KeyBoardCurr.down){
					return false;
				}
				return true;
		}

	function fillSettingsOnBoard() {
        if( game_over == false){
            window.clearInterval(interval);
        }
		curr_lives = MAX_LIVES;
		document.getElementById('showSettings5points').innerText= "5 points";
		document.getElementById('showSettings5points').style.color= fiveColor_set.value;
		document.getElementById('showSettings15points').innerText= "15 points";
		document.getElementById('showSettings15points').style.color= fifteenColor_set.value;
		document.getElementById('showSettings25points').innerText= "25 points";
		document.getElementById('showSettings25points').style.color= twentyColor_set.value;
	 
	    document.getElementById('left_arrow_id').innerText =KeyBoardCurr.left;
	    document.getElementById('right_arrow_id').innerText =KeyBoardCurr.right;
	    document.getElementById('down_arrow_id').innerText =KeyBoardCurr.down;
		document.getElementById('up_arrow_id').innerText =KeyBoardCurr.up;

		document.getElementById('game_time_id').innerText = game_time;
	    document.getElementById('lblLives').innerText = curr_lives;
	    document.getElementById('balls_number_id').innerText = numOfBalls; 
	    document.getElementById('num_of_monsters_id').innerText =numOfGhosts;


        //inbar add
        if( user_name != null){
            document.getElementById('lbUserName').innerText = user_name;
        }
	}
	function gameOver() {
	    game_sound.stop();
	    game_over = true;
	    window.clearInterval(interval);
	}

	function sound(src) {
	    this.sound = document.createElement("audio");
	    this.sound.src = src;
	    this.sound.setAttribute("preload","auto");
	    this.sound.setAttribute("controls", "none");
	    this.sound.style.display = "none";
	    document.body.appendChild(this.sound);
	    this.play = function(){
	      this.sound.play();
	      sound_on = true;
	    }
	    this.stop = function(){
	      this.sound.pause();
	      sound_on = false;
	    }
	}
	function muteAudio() {    
	    if (sound_on == false) {
			game_sound.play();
			$("#mute_btn").css("background-image","url(unmute.png)");
			muteAudio_on = false;
	    }
	    else {
			game_sound.stop();
			$("#mute_btn").css("background-image","url(mute.png)");
			muteAudio_on = true;
		}
	    
	}

	function openModal( model_name){
		// Get the modal
		var modal = document.getElementById(model_name);

		if( model_name == "about"){
		// Get the button that opens the modal
		    var btn = document.getElementById("about-btn");
		    // When the user clicks the button, open the modal
		    btn.onclick = function () {
			modal.style.display = "block";
		    }
		}
		else if( model_name == "low_score"){
		    $('#input_score').append("<strong>You are better than " + score.toString() + " points!</strong>");
		    modal.style.display = "block";
		}
		else{
		    modal.style.display = "block";
		}
	    
		$(document).keydown(function (e) {
		    var code = e.keyCode || e.which;
		    if (code == 27) modal.style.display = "none";
		});

	    // When the user clicks on <span> (x), close the modal
		$('.close').click(function(){
		    modal.style.display = "none";
		});
	
	    // When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
		    if (event.target == modal) {
			modal.style.display = "none";
		    }
		}
	}




