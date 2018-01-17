
var config = {
	apiKey: "AIzaSyD_0MubOduGW0MGGtVn2HMeBN0e4vmc2vU",
	authDomain: "fundrace-46c75.firebaseapp.com",
	databaseURL: "https://fundrace-46c75.firebaseio.com",
	projectId: "fundrace-46c75",
	storageBucket: "fundrace-46c75.appspot.com",
	messagingSenderId: "505786262262"
};
firebase.initializeApp(config);

firebase.auth().signInAnonymously().catch(function(error) {
	// Handle Errors here.
	var errorCode = error.code;
	var errorMessage = error.message;
	// ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  // User is signed in.
	  var isAnonymous = user.isAnonymous;
	  var uid = user.uid;
	  // ...
	} else {
	  // User is signed out.
	  // ...
	}
	// ...
  });
 // console.log(uid);

//Get element
const preObject = document.getElementById('users');

//Create-References
const dbRefOject = firebase.database().ref().child('users').child('user1');


//Sync object changes
dbRefOject.on('child_added', snap => console.log(snap.val()));




function writeUserData(userId, userName, email, pass) {
  firebase.database().ref('users/' + userId).set({
		username: userName,
		email: email,
    password: pass
  });
}

function validate(){
	console.log("Jalan");
	var tempUserName = document.getElementById('input-username').value;
	var tempEmail = document.getElementById('input-email').value;
	var tempPass = document.getElementById('input-password').value;
	console.log(tempUserName);
	console.log(tempEmail);
	console.log(tempPass);

	//writeUserData("user3",tempUserName,"coba");
}

