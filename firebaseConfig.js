
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

messaging.requestPermission()
	.then(function () {
		console.log('Notification permission granted.');
		// TODO(developer): Retrieve an Instance ID token for use with FCM.
		// ...
	})
	.catch(function (err) {
		console.log('Unable to get permission to notify.', err);
	});

// var a = 702000.00;
// var b = parseInt(a);
// var c = b.toString();
var countNum = 0;

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
var userList = [];
var teamList = [];
var refreshLeaderBoard = 0;
var refreshSearch = 0;

firebase.database().ref().child('users').on('value', function (snapshot) {
	var allDonation = 0;
	listLeaderBoard();
	// console.log("jlan jlan jlan");
	snapshot.forEach(function (childSnapshot) {
		var childKey = childSnapshot.key;
		userList.push(childKey);
		firebase.database().ref('/users/' + childKey).once('value', function (snapshot) {
			var readDonationTotal = snapshot.child('donationTotal').val();
			allDonation += readDonationTotal;
			document.getElementById("collected-donation").innerHTML = "Rp. " + allDonation + ".00";
		});
	});
});

function addHistoryTable(readDate, readAmount, readHistExp, readPoint) {
	var riwayatTable = document.getElementById('riwayat-table');
	var divTable = document.createElement("div");
	divTable.className = "table-content";
	divTable.id = "tableContent";
	divTable.style.display = "flex";
	var divColumn1 = document.createElement("div");
	var divColumn2 = document.createElement("div");
	var divColumn3 = document.createElement("div");
	var divColumn4 = document.createElement("div");
	divColumn1.className = "column-name";
	divColumn2.className = "column-name";
	divColumn3.className = "column-name";
	divColumn4.className = "column-name";
	divColumn1.textContent = readDate;
	divColumn2.textContent = readAmount;
	divColumn3.textContent = readHistExp;
	divColumn4.textContent = readPoint;
	divTable.appendChild(divColumn1);
	divTable.appendChild(divColumn2);
	divTable.appendChild(divColumn3);
	divTable.appendChild(divColumn4);
	riwayatTable.appendChild(divTable);
}
var baca = 0;

function updateTeam(userId, getTeamName, teamId, currTotalMember, getName) {
	firebase.database().ref('users/' + userId).update({
		teamID: getTeamName,
	});
	firebase.database().ref('teams/' + teamId).update({
		totalMember: currTotalMember + 1,
	});
	firebase.database().ref('teams/' + teamId + "/member/" + "userT0" + (currTotalMember + 1)).update({
		name: getName
	});
}

function listTeam(userId, usrname) {
	if (baca == 1) {
		var teamTable = document.getElementById("teamListTable");
		var countTable = teamTable.childElementCount;
		for (var i = 0; i < countTable; i++) {
			var trRecord = document.getElementById("teamRecord");
			teamTable.removeChild(trRecord);
		}
		baca = 0;
	}
	baca++;
	firebase.database().ref().child('teams').once('value', function (snapshot) {
		var index = 0;
		snapshot.forEach(function (childSnapshot) {

			var childKey = childSnapshot.key;
			console.log("jlan jlan jlan:" + childKey);
			firebase.database().ref('/teams/' + childKey).once('value', function (snapshot) {
				var readDonationPeriod = snapshot.child('donationPeriod').val();
				var readMaxMember = snapshot.child('maxMember').val();
				var readTeamMember = snapshot.child('member').val();
				var readMinTier = snapshot.child('minTier').val();
				var readTeamName = snapshot.child('name').val();
				var readTotalMember = snapshot.child('totalMember').val();

				var teamTable = document.getElementById("teamListTable");
				var tr = document.createElement("tr");
				tr.id = "teamRecord";
				var td1 = document.createElement("td");
				var td2 = document.createElement("td");
				var td3 = document.createElement("td");
				var td4 = document.createElement("td");
				var td5 = document.createElement("td");
				td1.textContent = index + 1;
				index++;
				td2.textContent = readTeamName;
				td3.textContent = readTotalMember + "/" + readMaxMember;
				td4.textContent = readDonationPeriod;
				if (readTotalMember < readMaxMember) {
					var joinBtn = document.createElement("button");
					joinBtn.textContent = "JOIN";
					joinBtn.value = readTeamName;
					joinBtn.onclick = function () {
						updateTeam(userId, this.value, childKey, readTotalMember, usrname);
						//console.log(this.value);
					};
					td5.appendChild(joinBtn);
					console.log("value JOIN: " + joinBtn.value);
				} else {
					td5.textContent = "CLOSED";
				}
				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);
				teamTable.appendChild(tr);
			});
		});
	});


	console.log("baca:" + baca);
}

function writeTeamData(getName, getInputName, getMaxMember, getMinTier, userId) {
	var countTeam = 0;
	firebase.database().ref().child('teams').once('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			countTeam++;
		});
	});
	var generateTeamID = "team" + teamList.length + 1;
	firebase.database().ref('teams/' + generateTeamID).update({
		maxMember: getMaxMember,
		totalMember: 1,
		name: getInputName,
		minTier: getMinTier,
		donationPeriod: 0,
		archiveCount: 0,
		teamDonationHistoryCount: 0
	});
	firebase.database().ref('teams/' + generateTeamID + "/member/" + "userT01").update({
		name: getName
	});
	firebase.database().ref('users/' + userId).update({
		teamID: getInputName,
	});
}

function createTeam(userEmail) {
	var inputTeamName = document.getElementById("namaTeam").value;
	var inputMemberCapacity = document.getElementById("jml-anggota").value;
	var inputMinTier = document.getElementById("min-tier");
	var inputTier = inputMinTier.options[inputMinTier.selectedIndex].textContent;
	var inputTeamDesc = document.getElementById("teamDesc").value;

	firebase.database().ref().child('users').once('value', function (snapshot) {

		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			firebase.database().ref('/users/' + childKey).once('value', function (snapshot) {
				var readEmail = snapshot.child('email').val();
				var readName = snapshot.child('name').val();
				if (readEmail == userEmail) {

					writeTeamData(readName, inputTeamName, inputMemberCapacity, inputTier, childKey);
				}
			});
		});
	});


	console.log("input Team name: " + inputTeamName);
	console.log("input Member Capt: " + inputMemberCapacity);
	console.log("input Min Tier: " + inputTier);
	console.log("input team desc: " + inputTeamDesc);


}

function listLeaderBoard() {

	var leaderBoard = document.getElementById("leaderBoard");
	firebase.database().ref().child('teams').orderByChild('name').on('value', function (snapshot) {
		var num = 0;
		//console.log("refreshLeader Board: " + refreshLeaderBoard);
		if (refreshLeaderBoard == 1) {
			var countBoard = leaderBoard.childElementCount;
			//console.log(countBoard);
			for (var i = 0; i < countBoard-1; i++) {
				var BoardChild = document.getElementById("tableContent-Board");
				leaderBoard.removeChild(BoardChild);
				
			}
			
		}
		refreshLeaderBoard = 1;

		snapshot.forEach(function (childSnapshot) {

			var childKey = childSnapshot.key;
			teamList.push(childKey);
			firebase.database().ref('/teams/' + childKey).once('value', function (snapshot) {

				var readDonationPeriod = snapshot.child('donationPeriod').val();
				var readMaxMember = snapshot.child('maxMember').val();
				var readTeamMember = snapshot.child('member').val();
				var readMinTier = snapshot.child('minTier').val();
				var readTeamName = snapshot.child('name').val();
				var readTotalMember = snapshot.child('totalMember').val();

				var divTableContent = document.createElement("div");
				divTableContent.className = "table-content";
				divTableContent.id = "tableContent-Board";
				var divNo = document.createElement("div");
				divNo.className = "no";
				var h1 = document.createElement("h1");
				var divTeamName = document.createElement("div");
				divTeamName.className = "team-name";
				var divTeamDonation = document.createElement("div");
				divTeamDonation.className = "jml-donasi";
				h1.textContent = num + 1;
				divTeamName.textContent = readTeamName;
				divTeamDonation.textContent = readDonationPeriod;
				divNo.appendChild(h1);
				divTableContent.appendChild(divNo);
				divTableContent.appendChild(divTeamName);
				divTableContent.appendChild(divTeamDonation);
				leaderBoard.appendChild(divTableContent);

			});
			num++;
		});
	});
}

function readTeamData(getTeamID) {
	firebase.database().ref().child('teams').once('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			firebase.database().ref('/teams/' + childKey).once('value', function (snapshot) {
				var readDonationPeriod = snapshot.child('donationPeriod').val();
				var readMaxMember = snapshot.child('maxMember').val();
				var readTeamMember = snapshot.child('member').val();
				var readMinTier = snapshot.child('minTier').val();
				var readTeamName = snapshot.child('name').val();
				var readTotalMember = snapshot.child('totalMember').val();
				if (readTeamName == getTeamID) {
					document.getElementById("jmlh-anggota").innerHTML = "Jumlah anggota: " + readTotalMember + "/" + readMaxMember;
					document.getElementById("jmlh-donasi").innerHTML = "Jumlah donasi periode ini: Rp. " + readDonationPeriod;
					document.getElementById("total-donasi-cafe").innerHTML = "Total donasi terkumpul: Rp. " + 0;
				}

			});
		});
	});
}

var toggleState = 0;
var toggleStateNoTeam = 0;
var habisLogin = 0;
var adaTeam = 0;

function readData(userEmail, uid, googleDisplayName) {
	var read = 0;
	var flag = 0;
	var header = document.getElementsByClassName('header-profile');
	firebase.database().ref().child('users').on('value', function (snapshot) {

		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
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
				var readTeamID = snapshot.child('teamID').val();
				var readHistoryCount = snapshot.child('historyCount').val();

				if (userEmail == readEmail) {
					alert("Ada Cuuuii");
					flag = 1;
					if (read == 1) {
						var count = document.getElementById('riwayat-table').childElementCount;
						var rTable = document.getElementById('riwayat-table');
						console.log("count riwayat:" + count);
						for (var i = 0; i < count - 1; i++) {
							var divContent = document.getElementById('tableContent');
							rTable.removeChild(divContent);
							read = 0;
						}
					}

					if (readTeamID == "null") {
						//dari awal login
						if (toggleStateNoTeam != 1) {
							header[0].classList.toggle('hide');
							header[1].classList.toggle('hide');
							console.log("masuk kene");

						}
						if (adaTeam == 1) {
							header[1].classList.toggle('hide');
							header[3].classList.toggle('hide');
							console.log("masuk kono");
						}

						listTeam(childKey, readName);
						adaTeam = 0;
					} else {
						adaTeam = 1;

						if (toggleState != 1) {
							for (var i = 0; i < header.length; i++) {

								header[i].classList.toggle('hide');
								//console.log(22222222222222222222);
							}
							header[1].classList.toggle('hide');
							header[2].classList.toggle('hide');
						}

						toggleState = 1;
						//console.log(header.length);
						document.getElementById("nama-team").innerHTML = readTeamID;
						readTeamData(readTeamID);
					}



					console.log(readName);
					document.getElementById("user-name").innerHTML = readName;
					//document.getElementById("user-lv").innerHTML = "Lv. " + readLvl;
					document.getElementById("user-tier").innerHTML = readTier;
					document.getElementById("user-team").innerHTML = "Team : " + readTeamID;
					document.getElementById("user-email").innerHTML = readEmail;

					var maxExp;
					var persentExp;
					var remainingExp;
					if (readTier == "Bronze") {
						maxExp = 50000;
						persentExp = (readEXP / maxExp) * 100;
						remainingExp = maxExp - readEXP;
					} else if (readTier == "Silver") {
						maxExp = 200000;
						persentExp = (readEXP / maxExp) * 100;
						remainingExp = maxExp - readEXP;
					} else {
						maxExp = 500000;
						persentExp = (readEXP / maxExp) * 100;
						remainingExp = maxExp - readEXP;
					}
					document.getElementById("viewPoint").innerHTML = "Anda memiliki " + readPoint + " poin.";
					document.getElementById("expDescription").innerHTML = readEXP + " / " + maxExp + " - ";
					document.getElementById("progressBar").style.width = persentExp + "%";
					document.getElementById("expRemain").innerHTML = "&nbsp" + remainingExp + " poin untuk ke tier berikutnya!";
					var exchangeCount = 0;
					if (readPoint >= 35000) {
						exchangeCount++;
					}
					if (readPoint >= 60000) {
						exchangeCount++;
					}
					if (readPoint >= 110000) {
						exchangeCount++;
					} if (readPoint >= 350000) {
						exchangeCount++;
					} if (readPoint >= 500000) {
						exchangeCount++;
					} if (readPoint >= 850000) {
						exchangeCount++;
					} if (readPoint >= 1200000) {
						exchangeCount++;
					} if (readPoint >= 2750000) {
						exchangeCount++;
					}
					if (exchangeCount == 0) {
						document.getElementById("exchangeAvailable").innerHTML = "Point anda belum mencukupi untuk menukarkan dengan hadiah";
					} else {
						document.getElementById("exchangeAvailable").innerHTML = "Terdapat " + exchangeCount + " jenis hadiah yang dapat anda tukarkan";
					}

					document.getElementById("rewardPointStat").innerHTML = "Saat ini anda memiliki " + readPoint + " poin";
					if (readHistoryCount == 0) {


					}
					else {
						read = 1;
						firebase.database().ref('/users/' + childKey + "/historyDonation").once('value', function (snapshot) {
							snapshot.forEach(function (childSnapshot) {
								var childKunci = childSnapshot.key;
								firebase.database().ref('/users/' + childKey + "/historyDonation/" + childKunci).once('value', function (snapshot) {
									var readDate = snapshot.child('date').val();
									var readAmount = snapshot.child('amount').val();
									var readHistExp = snapshot.child('exp').val();
									var readPoint = snapshot.child('point').val();
									console.log("date: " + readDate);
									console.log("Amount: " + readAmount);
									console.log("Exp: " + readHistExp);
									console.log("Point: " + readPoint);
									addHistoryTable(readDate, readAmount, readHistExp, readPoint);
								});
							});
						});


					}
				}

			});
		});

		console.log("read:" + read);
		console.log("FFLAAAAAAGGG = " + flag);
		if (flag == 0) {
			console.log("firebase displayName: " + firebase.auth().currentUser.displayName);
			writeUserDataForGoogleAccount(uid, googleDisplayName, userEmail);
		}
	});
	flag = 0;
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
		donationTotal: 0,
		historyCount: 0

	});
}

function writeUserDataForGoogleAccount(userId, name, email) {
	firebase.database().ref('users/' + userId).set({
		username: "unset",
		password: "secret",
		name: name,
		email: email,
		level: 1,
		exp: 0,
		point: 0,
		tier: "Bronze",
		teamID: "null",
		donationTotal: 0,
		historyCount: 0

	});
}

function setDisplayName(userEmail) {
	console.log("masuk sini lhoooooooooo");
	var setMyDisplayName;
	firebase.database().ref().child('users').once('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			// var childData = childSnapshot.val();
			firebase.database().ref('/users/' + childKey).once('value', function (snapshot) {
				var readName = snapshot.child('name').val();
				var readEmail = snapshot.child('email').val();

				if (userEmail == readEmail) {
					setMyDisplayName = readName;
					firebase.auth().currentUser.updateProfile({
						displayName: setMyDisplayName,
						photoURL: "/assets/profile_placeholder.png"
					}).then(function () {

						// Profile updated successfully!
						// "Jane Q. User"
						console.log("Profile updated successfully");
						var displayName = firebase.auth().currentUser.displayName;
						console.log("yang terupdate: " + displayName);
						// "https://example.com/jane-q-user/profile.jpg"
						//var photoURL = user.photoURL;
					}, function (error) {
						// An error happened.
						console.log("error updated profile");
					});
				}
			});
		});
	});
}

function updateUserPoint(userId, getPoint){
	firebase.database().ref('users/' + userId).update({
		point: getPoint
	});
}

function processReward(getPrice){
	var currUser = firebase.auth().currentUser;
	firebase.database().ref().child('users').once('value', function (snapshot) {
		console.log("current User : " + currUser);
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			// var childData = childSnapshot.val();
			firebase.database().ref('/users/' + childKey).once('value', function (snapshot) {
				var readEmail = snapshot.child('email').val();
				var readPoint = snapshot.child('point').val();
				if(currUser.email == readEmail){
					if(readPoint < getPrice){
						alert("point tidak cukup");
					}else{
						var remainPoint = readPoint - getPrice;
						updateUserPoint(childKey,readPoint);
						alert("Reward Anda akan segera dikirim");
					}
				}
			});
		});
	});		
	
}

function getReward(element) {
	var parent = element.parentNode;
	var content = parent.querySelector("div");
	var price = 0;
	if (content.id == "rwd1") {
		price = 35000;
	} else if (content.id == "rwd2") {
		price = 60000;
	} else if (content.id == "rwd3") {
		price = 110000;
	} else if (content.id == "rwd4") {
		price = 350000;
	} else if (content.id == "rwd5") {
		price = 500000;
	} else if (content.id == "rwd6") {
		price = 850000;
	} else if (content.id == "rwd7") {
		price = 1200000;
	} else {
		price = 2750000;
	}
	processReward(price);

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
		habisLogin = 1;
		var btnCreateTeam = document.getElementById("submitTeam");
		btnCreateTeam.onclick = function () {
			createTeam(user.email);
		}
		var check = 0;
		console.log("user masuk boss");
		var id = user.uid;
		var userIndex;
		console.log(id);
		console.log(user.email);
		if (user.displayName == null) {
			setDisplayName(user.email);
		}
		readData(user.email, user.uid, user.displayName);
		document.getElementById("userProfilePicture").src = user.photoURL;
	} else {
		// No user is signed in.
		var header = document.getElementsByClassName('header-profile');
		if (habisLogin == 1) {
			if (adaTeam == 1) {
				header[0].classList.toggle('hide');
				header[3].classList.toggle('hide');
			} else {
				header[0].classList.toggle('hide');
				header[1].classList.toggle('hide');
			}

		}
		toggleState = 0;
		toggleStateNoTeam = 0;
		adaTeam = 0;
		console.log("user ga masuk bos");
		var count = document.getElementById('riwayat-table').childElementCount;
		var rTable = document.getElementById('riwayat-table');
		for (var i = 0; i < count - 1; i++) {
			var divContent = document.getElementById('tableContent');
			rTable.removeChild(divContent);
		}
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

