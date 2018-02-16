
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

function updateTeam(userId, getTeamName, teamId, getTotalMember, getName, getMemberId, getArchiveCount, getDate, getTime, act, arcName) {
	firebase.database().ref('users/' + userId).update({
		teamID: getTeamName,
	});
	firebase.database().ref('teams/' + teamId).update({
		totalMember: getTotalMember,
		archiveCount: getArchiveCount
	});
	firebase.database().ref('teams/' + teamId + "/member/" + getMemberId).update({
		name: getName
	});
	if (act == "join") {
		firebase.database().ref('teams/' + teamId + '/archives/' + "arch0" + getArchiveCount).update({
			date: getDate,
			time: getTime,
			name: getName,
			description: "Tergabung dalam team"
		});
	} else {
		firebase.database().ref('teams/' + teamId + '/archives/' + "arch0" + getArchiveCount).update({
			date: getDate,
			time: getTime,
			name: arcName,
			description: "Keluar dari team"
		});
	}
}

function listTeam(userId, usrname) {

	firebase.database().ref().child('teams').on('value', function (snapshot) {
		console.log("lisstt TEAM JALAN OIII");
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
		var index = 0;
		snapshot.forEach(function (childSnapshot) {

			var childKey = childSnapshot.key;
			//console.log("jlan jlan jlan:" + childKey);
			firebase.database().ref('/teams/' + childKey).once('value', function (snapshot) {
				var readDonationPeriod = snapshot.child('donationPeriod').val();
				var readMaxMember = snapshot.child('maxMember').val();
				var readTeamMember = snapshot.child('member').val();
				var readMinTier = snapshot.child('minTier').val();
				var readTeamName = snapshot.child('name').val();
				var readTotalMember = snapshot.child('totalMember').val();
				var readArchiveCount = snapshot.child('archiveCount').val();

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
						var updateMember = readTotalMember + 1;
						var updateArchiveCount = readArchiveCount + 1;
						var d = new Date();
						var date = d.getDate();
						var month = d.getMonth() + 1;
						var year = d.getFullYear();
						var hours = d.getHours();
						var minutes = d.getMinutes();
						console.log("jam : " + hours + ":" + minutes);
						var fullDate;
						var fullTime;

						if (hours <= 9 && minutes > 9) {
							fullTime = "0" + hours + ":" + minutes;
						} else if (hours > 9 && minutes <= 9) {
							fullTime = hours + ":" + "0" + minutes;
						} else if (hours <= 9 && minutes <= 9) {
							fullTime = "0" + hours + ":" + "0" + minutes;
						} else {
							fullTime = hours + ":" + minutes;
						}


						if (date <= 9 && month > 9) {
							fullDate = "0" + date + "-" + month + "-" + year;
						} else if (date > 9 && month <= 9) {
							fullDate = date + "-" + "0" + month + "-" + year;
						} else if (date <= 9 && month <= 9) {
							fullDate = "0" + date + "-" + "0" + month + "-" + year;
						} else {
							fullDate = date + "-" + month + "-" + year;
						}
						var generateMemberId = "userT0" + (readTotalMember + 1);
						updateTeam(userId, this.value, childKey, updateMember, usrname, generateMemberId, updateArchiveCount, fullDate, fullTime, "join", usrname);
						//console.log(this.value);
						toggleState = 1;
						var modal = document.getElementById('searchModal');
						modal.style.display = "none";
					};
					td5.appendChild(joinBtn);
					//console.log("value JOIN: " + joinBtn.value);
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

function leaveTeam(userId, teamId, memberName) {
	alert("Anda telah keluar dari team");
	toggleStateNoTeam = 1;
	firebase.database().ref().child('teams').once('value', function (snapshot) {

		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			console.log("buat keluar team: " + childKey);
			console.log("teamID: " + teamId);
			console.log("userId: "+ userId);
			console.log("memberName: " + memberName);
			// var childData = childSnapshot.val();
			firebase.database().ref('/teams/' + childKey).once('value', function (snapshot) {
				var readTeamName = snapshot.child('name').val();
				var readTotalMember = snapshot.child('totalMember').val();
				var readArchiveCount = snapshot.child('archiveCount').val();
				if (readTeamName == teamId) {
					var updateMember = readTotalMember - 1;
					firebase.database().ref('/teams/' + childKey).child('member').once('value', function (snapshot) {

						snapshot.forEach(function (childSnapshot) {
							var memberChildKey = childSnapshot.key;
							// var childData = childSnapshot.val();
							firebase.database().ref('/teams/' + childKey + "/member/" + memberChildKey).once('value', function (snapshot) {
								var readMemberName = snapshot.child('name').val();
								if (memberName == readMemberName) {
									console.log("opo o ikiiiii");
									var d = new Date();
									var date = d.getDate();
									var month = d.getMonth() + 1;
									var year = d.getFullYear();
									var hours = d.getHours();
									var minutes = d.getMinutes();
									console.log("jam : " + hours + ":" + minutes);
									var fullDate;
									var fullTime;

									if (hours <= 9 && minutes > 9) {
										fullTime = "0" + hours + ":" + minutes;
									} else if (hours > 9 && minutes <= 9) {
										fullTime = hours + ":" + "0" + minutes;
									} else if (hours <= 9 && minutes <= 9) {
										fullTime = "0" + hours + ":" + "0" + minutes;
									} else {
										fullTime = hours + ":" + minutes;
									}


									if (date <= 9 && month > 9) {
										fullDate = "0" + date + "-" + month + "-" + year;
									} else if (date > 9 && month <= 9) {
										fullDate = date + "-" + "0" + month + "-" + year;
									} else if (date <= 9 && month <= 9) {
										fullDate = "0" + date + "-" + "0" + month + "-" + year;
									} else {
										fullDate = date + "-" + month + "-" + year;
									}
									var upArchiveCount = readArchiveCount + 1;
									updateTeam(userId, "null", childKey, updateMember, null, memberChildKey, upArchiveCount, fullDate, fullTime, "leave", readMemberName);
								}
							});
						});
					});

				}
			});
		});
	});
}

function listLeaderBoard() {

	var leaderBoard = document.getElementById("leaderBoard");
	firebase.database().ref().child('teams').orderByChild('name').on('value', function (snapshot) {
		var num = 0;
		//console.log("refreshLeader Board: " + refreshLeaderBoard);
		if (refreshLeaderBoard == 1) {
			var countBoard = leaderBoard.childElementCount;
			//console.log(countBoard);
			for (var i = 0; i < countBoard - 1; i++) {
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

var createHist = 0;
var createArch = 0;
function readTeamData(getTeamID) {

	firebase.database().ref().child('teams').on('value', function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			firebase.database().ref('/teams/' + childKey).once('value', function (snapshot) {
				var readDonationPeriod = snapshot.child('donationPeriod').val();
				var readMaxMember = snapshot.child('maxMember').val();
				var readTeamMember = snapshot.child('member').val();
				var readMinTier = snapshot.child('minTier').val();
				var readTeamName = snapshot.child('name').val();
				var readTotalMember = snapshot.child('totalMember').val();
				var readTeamDonationHist = snapshot.child('teamDonationHistoryCount').val();
				var readArchiveCount = snapshot.child('archiveCount').val();
				if (readTeamName == getTeamID) {
					document.getElementById("jmlh-anggota").innerHTML = "Jumlah anggota: " + readTotalMember + "/" + readMaxMember;
					document.getElementById("jmlh-donasi").innerHTML = "Jumlah donasi periode ini: Rp. " + readDonationPeriod;
					document.getElementById("total-donasi-cafe").innerHTML = "Total donasi terkumpul: Rp. " + 0;
					var teamDonateHistoryTable = document.getElementById("teamDonationHistoryList");
					var archiveTableList = document.getElementById("archiveTable");
					if(readTeamDonationHist == 0){

					}else{
						if (createHist == 1) {
							var countTableHist = teamDonateHistoryTable.childElementCount;
							for (var i = 0; i < countTableHist; i++) {
								var trRecord = document.getElementById("trRecordTeamDonateHist");
								teamDonateHistoryTable.removeChild(trRecord);
							}
						}
						createHist = 1;
						firebase.database().ref('/teams/' + childKey).child('historyDonation').once('value', function (snapshot) {
							var x = 0;
							snapshot.forEach(function (childSnapshot) {
								var historyChildKey = childSnapshot.key;
								firebase.database().ref('/teams/' + childKey + '/historyDonation/' + historyChildKey).once('value', function (snapshot) {
									var readDonaturMember = snapshot.child('name').val();
									var readDateHist = snapshot.child('date').val();
									var readTimeHist = snapshot.child('time').val();
									var readAmountHist = snapshot.child('amount').val();
	
									var trHistory = document.createElement("tr");
									trHistory.id = "trRecordTeamDonateHist";
									var tdHistory1 = document.createElement("td");
									var tdHistory2 = document.createElement("td");
									var tdHistory3 = document.createElement("td");
									var tdHistory4 = document.createElement("td");
									tdHistory1.textContent = x + 1;
									tdHistory2.textContent = readDateHist + "  " + readTimeHist;
									tdHistory3.textContent = readDonaturMember;
									tdHistory4.textContent = readAmountHist;
									trHistory.appendChild(tdHistory1);
									trHistory.appendChild(tdHistory2);
									trHistory.appendChild(tdHistory3);
									trHistory.appendChild(tdHistory4);
									teamDonateHistoryTable.appendChild(trHistory);
									x++;
								});
							});
						});
					}

					if(readArchiveCount == 0){

					}else{
						if (createArch == 1) {
							var countTableHist = archiveTableList.childElementCount;
							for (var i = 0; i < countTableHist; i++) {
								var trRecord = document.getElementById("trRecordArchHist");
								archiveTableList.removeChild(trRecord);
							}
						}
						createArch = 1;
						firebase.database().ref('/teams/' + childKey).child('archives').once('value', function (snapshot) {
							var x = 0;
							snapshot.forEach(function (childSnapshot) {
								var archiveChildKey = childSnapshot.key;
								firebase.database().ref('/teams/' + childKey + '/archives/' + archiveChildKey).once('value', function (snapshot) {
									var readDateArch = snapshot.child('date').val();
									var readTimeArch = snapshot.child('time').val();
									var readMemberArch = snapshot.child('name').val();
									var readDesc = snapshot.child('description').val();
									var trHistory = document.createElement("tr");
									trHistory.id = "trRecordArchHist";
									var tdArch1 = document.createElement("td");
									var tdArch2 = document.createElement("td");
									var tdArch3 = document.createElement("td");
									var tdArch4 = document.createElement("td");
									tdArch1.textContent = x + 1;
									tdArch2.textContent = readDateArch + "  " + readTimeArch;
									tdArch3.textContent = readMemberArch;
									tdArch4.textContent = readDesc;
									trHistory.appendChild(tdArch1);
									trHistory.appendChild(tdArch2);
									trHistory.appendChild(tdArch3);
									trHistory.appendChild(tdArch4);
									archiveTableList.appendChild(trHistory);
									x++;
								});
							});
						});
					}
					
				}

			});
		});
	});
}



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
					console.log("kepanggil");
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

						document.getElementById("headerNotLogin").style.display = "none";
						document.getElementById("headerDontHaveTeam").style.display = "";
						document.getElementById("headerNotQualified").style.display = "none";
						document.getElementById("headerHaveTeam").style.display = "none";

						toggleStateNoTeam = 1;
						listTeam(childKey, readName);
						adaTeam = 0;
					} else {

						document.getElementById("headerNotLogin").style.display = "none";
						document.getElementById("headerDontHaveTeam").style.display = "none";
						document.getElementById("headerNotQualified").style.display = "none";
						document.getElementById("headerHaveTeam").style.display = "";
						document.getElementById("team-name-archive").innerHTML = readTeamID;
						document.getElementById("team-name-cafe").innerHTML = readTeamID;
						document.getElementById("nama-team").innerHTML = readTeamID;
						document.getElementById("leave-team").onclick = function () { leaveTeam(childKey, readTeamID, readName) };
						readTeamData(readTeamID);
					}



					//console.log(readName);
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
									//console.log("date: " + readDate);
									//console.log("Amount: " + readAmount);
									//console.log("Exp: " + readHistExp);
									//console.log("Point: " + readPoint);
									addHistoryTable(readDate, readAmount, readHistExp, readPoint);
								});
							});
						});


					}
				}

			});
		});

		//console.log("read:" + read);
		//console.log("FFLAAAAAAGGG = " + flag);
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

function updateUserPoint(userId, getPoint) {
	firebase.database().ref('users/' + userId).update({
		point: getPoint
	});
}

function processReward(getPrice) {
	var currUser = firebase.auth().currentUser;
	firebase.database().ref().child('users').once('value', function (snapshot) {
		console.log("current User : " + currUser);
		snapshot.forEach(function (childSnapshot) {
			var childKey = childSnapshot.key;
			// var childData = childSnapshot.val();
			firebase.database().ref('/users/' + childKey).once('value', function (snapshot) {
				var readEmail = snapshot.child('email').val();
				var readPoint = snapshot.child('point').val();
				if (currUser.email == readEmail) {
					if (readPoint < getPrice) {
						alert("point tidak cukup");
					} else {
						var remainPoint = readPoint - getPrice;
						updateUserPoint(childKey, readPoint);
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
		document.getElementById("headerNotLogin").style.display = "";
		document.getElementById("headerDontHaveTeam").style.display = "none";
		document.getElementById("headerNotQualified").style.display = "none";
		document.getElementById("headerHaveTeam").style.display = "none";

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

