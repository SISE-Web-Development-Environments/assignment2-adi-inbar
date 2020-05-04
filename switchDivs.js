// Settings
let good_settings = true;

/* keys */

let KeyBoardValues = {left: 'ArrowLeft', up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown'};
let KeyboardHelper = {left: 37, up: 38, right: 39, down: 40};


/*change to lolipops */
let fiveColor = "#eff542";
let tenColor = "#42a4f5";
let fifteenColor = "#f542cb";

let ghosts_remain = 1;
let max_monsters = 4;
let min_monsters = 1;

let food_remain = 90;
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
// =============== Settings ===================
function randomSettings() {  
    KeyboardHelper.down = 40;
    KeyboardHelper.right = 39;
    KeyboardHelper.up = 38;
    KeyboardHelper.left = 37;

    KeyBoardValues.down = 'ArrowDown';
    KeyBoardValues.right = 'ArrowRight';
    KeyBoardValues.up = 'ArrowUp';
    KeyBoardValues.left = 'ArrowLeft';

    document.getElementById("leftBotton").value = KeyBoardValues.left;
    document.getElementById("downBotton").value = KeyBoardValues.down;
    document.getElementById("rightBotton").value = KeyBoardValues.right;
    document.getElementById("upBotton").value = KeyBoardValues.up;
    //  food_remain
    food_remain = Math.floor(Math.random() * (max_food - min_food + 1)) + min_food;
    document.getElementById('ballNumberForm').value = food_remain;
    //  Monsters
    ghosts_remain = Math.floor(Math.random() * (max_monsters - min_monsters + 1)) + min_monsters;
    document.getElementById('monstersForm').value = ghosts_remain;
    //  Game Time
    game_time = Math.floor(Math.random() * (max_time - min_time + 1)) + min_time;
    document.getElementById('gameTimeForm').value = game_time;
    //  Colors
    document.getElementById("fiveColorForm").value =
        "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
    document.getElementById("tenColorForm").value =
        "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
    document.getElementById("fifteenColorForm").value =
        "#" + ("00000" + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6);
}
/*define keys */
function showBotton(event , pId) {
	var x = event.key;
	if(pId=="rightBotton"){
        KeyboardHelper.right = event.keyCode;
        KeyBoardValues.right = x;
	}
	else if(pId=="leftBotton"){
        KeyboardHelper.left = event.keyCode;
        KeyBoardValues.left = x;

	}else if(pId=="upBotton"){
        KeyboardHelper.up = event.keyCode;
        KeyBoardValues.up = x;
	}else if(pId=="downBotton"){
        KeyboardHelper.down = event.keyCode;
        KeyBoardValues.down = x;
    }
    /*show in inbox  */
	document.getElementById(pId).value = "" + x;
}
function validateNumBalls(element) {
    if (element.value < min_food) {
        element.value = min_food;
        food_remain = parseInt(min_food);

    } else if (element.value > max_food) {
        element.value = max_food;
        food_remain = parseInt(max_food);
    } else {
        food_remain = parseInt(element.value);
    }
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
    if (keysDown[KeyboardHelper.up]) {
        return 1;
    }
    if (keysDown[KeyboardHelper.down]) {
        return 2;
    }
    if (keysDown[KeyboardHelper.left]) {
        return 3;
    }
    if (keysDown[KeyboardHelper.right]) {
        return 4;
    }
}
function goToGame() {
    document.getElementById('input_score').innerText = "";
    ghosts_remain = parseInt(document.getElementById("monstersForm").value);
    fiveColor = document.getElementById("fiveColorForm").value;
    tenColor = document.getElementById("tenColorForm").value;
    fifteenColor = document.getElementById("fifteenColorForm").value;
    let keysConfirm = document.getElementById("sameKeys");
    context = canvas.getContext("2d");
        if (KeyBoardValues.up === KeyBoardValues.right ||
            KeyBoardValues.up === KeyBoardValues.down ||
            KeyBoardValues.up === KeyBoardValues.left ||
            KeyBoardValues.right === KeyBoardValues.left ||
            KeyBoardValues.right === KeyBoardValues.down ||
            KeyBoardValues.left === KeyBoardValues.down
        ) {
            keysConfirm.style.display = "block";
            good_settings = false;
        } else {
            good_settings = true;
        }
        if (good_settings) {
            gameRunnig = true;
            Start();
            fillSettingBoard();
            switchDivs('Main');
        }
    }
function fillSettingBoard() {
    //user_name_settings.innerText = sessionStorage.getItem("currentUser");
    // document.getElementById('userName').innerText =   document.getElementById('name').innerText;

    document.getElementById('game_time_id').innerText = game_time;
    document.getElementById('lblLives').innerText = curr_lives;
    document.getElementById('balls_number_id').innerText = food_remain; 
     document.getElementById('num_of_monsters_id').innerText =ghosts_remain;
    document.getElementById('left_arrow_id').innerText =KeyBoardValues.left;
    document.getElementById('right_arrow_id').innerText =KeyBoardValues.right;
    document.getElementById('down_arrow_id').innerText =KeyBoardValues.down;
    document.getElementById('up_arrow_id').innerText =KeyBoardValues.up;
   
    //five_points_id.style.color = fiveColor;
    //ten_points_id.style.color = tenColor;
    //fifteen_points_id.style.color = fifteenColor;
}
function gameOver() {
    game_sound.stop();
    game_over = true;
    window.clearInterval(interval);
    // interval_counter = 0;
    //ghosts.length = 0
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
    }
    else {
        game_sound.stop();
        $("#mute_btn").css("background-image","url(mute.png)");
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
    // Get the <span> element that closes the modal
        // var span = document.getElementsByClassName("close")[0];

        $(document).keydown(function (e) {
            var code = e.keyCode || e.which;
            if (code == 27) modal.style.display = "none";
        });

    // When the user clicks on <span> (x), close the modal
        $('.close').click(function(){
            modal.style.display = "none";
        });
        // span.onclick = function () {
        //     modal.style.display = "none";
        // }

    // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
}
    



