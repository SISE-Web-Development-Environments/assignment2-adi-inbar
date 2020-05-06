//<!--for ragistration and login-->

var user_in_system = JSON.parse(localStorage.getItem("users"));
if(user_in_system == undefined){
	localStorage.setItem("users",JSON.stringify({p:{password:"p"}}));
}


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
