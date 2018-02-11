
var config = {
	apiKey: "AIzaSyD_0MubOduGW0MGGtVn2HMeBN0e4vmc2vU",
	authDomain: "fundrace-46c75.firebaseapp.com",
	databaseURL: "https://fundrace-46c75.firebaseio.com",
	projectId: "fundrace-46c75",
	storageBucket: "fundrace-46c75.appspot.com",
	messagingSenderId: "505786262262"
};
firebase.initializeApp(config);

//Get element
const preObject = document.getElementById('users');
const btnLogin = document.getElementById('btn-login');
const getUsername = document.getElementById('login-username');
const getPass = document.getElementById('login-pass');

//Create-References
const dbRefOject = firebase.database().ref().child('users');

//Sync object changes

const messaging = firebase.messaging();
var experiment = "";
var userList = [];
var usernameList = [];
var nameList = [];
var emailList = [];
var userLvl = [];
var userTier = [];
var userExp = [];
var passwordList = [];
var userDonationTotal = [];
var userPoint = [];


messaging.requestPermission()
	.then(function () {
		console.log('Notification permission granted.');
		// TODO(developer): Retrieve an Instance ID token for use with FCM.
		// ...
	})
	.catch(function (err) {
		console.log('Unable to get permission to notify.', err);
	});

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.


function readData(userEmail) {
	firebase.database().ref().child('users').once('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			this.userList.push(childKey);
			// var childData = childSnapshot.val();
			firebase.database().ref('/users/' + childKey).once('value', function (snapshot) {
				var readUsername = snapshot.child('username').val();
				var readName = snapshot.child('name').val();
				var readPass = snapshot.child('password').val();
				var readLvl = snapshot.child('level').val();
				var readEmail = snapshot.child('email').val();
				var readTier = snapshot.child('tier').val();
				var readEXP = snapshot.child('exp').val();
				var readPoint = snapshot.child('point').val();
				var readDonationTotal = snapshot.child('donationTotal').val();
				if (userEmail == readEmail) {
					//alert("Ada Cuuuii");
					document.getElementById("apa").innerHTML = readName;
				}
				// this.usernameList.push(readUsername);
				// this.nameList.push(readName);
				// this.passwordList.push(readPass);
				// this.emailList.push(readEmail);
				// this.userLvl.push(readLvl);
				// this.userTier.push(readTier);
				// this.userExp.push(readEXP);
				// this.userDonationTotal.push(readDonationTotal);
				// this.userPoint.push(readPoint);
			});
		});
	});

}


function writeUserData(userId, userName, pass, name, email) {
	firebase.database().ref('users/' + userId).set({
		username: userName,
		password: pass,
		name: name,
		email: email,
		level: 1,
		exp: 0,
		point: 0,
		tier: "Bronze",
		teamID: "null",
		donationTotal: 0

	});
}

function updateUser(userId) {
	firebase.database().ref('users/' + userId).update({
		EXP: 100
	});
}

// firebase.auth().signInAnonymously().catch(function(error) {
// 	// Handle Errors here.
// 	var errorCode = error.code;
// 	var errorMessage = error.message;
// 	// ...
// 	});


firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		var check = 0;
		console.log("user masuk boss");
		var id = user.uid;
		var userIndex;
		console.log(id);
		readData(user.email);
	} else {
		// No user is signed in.
		console.log("user ga masuk bos");
	}
});



function validate() {

	console.log("Jalan");
	var tempName = document.getElementById('input-name').value;
	var tempUserName = document.getElementById('input-username').value;
	var tempEmail = document.getElementById('input-email').value;
	var tempPass = document.getElementById('input-password').value;
	console.log(tempUserName);
	console.log(tempEmail);
	console.log(tempPass);
	var generateID = "user" + (userList.length + 1);
	if (tempEmail == "" || tempName == "" || tempPass == "" || tempUserName == "") {
		alert("filled the blank");
	}
	else {
		firebase.auth().createUserWithEmailAndPassword(tempEmail, tempPass).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
		});


		writeUserData(generateID, tempUserName, tempPass, tempName, tempEmail);
	}
}


function loginAuth() {
	// 	console.log("ini login Auth");
	// 	console.log("==============:");
	// 	console.log("bnyk user: " + usernameList.length);

	var getUsername = document.getElementById('login-username').value;
	var getPass = document.getElementById('login-pass').value;

	firebase.auth().signInWithEmailAndPassword(getUsername, getPass).catch(function (error) {
		console.log(error.code);
		console.log(error.message);
		alert("login failed, try again");
	});
	alert("asda");
}

