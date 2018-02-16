function searchModalOn() {
	var modal = document.getElementById('searchModal');
	var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
}

function createTeamModalOn() {
	var modal = document.getElementById('createTeamModal');
	closeSearchModal();
    modal.style.display = "block";
}

function closeSearchModal() {
	var modal = document.getElementById('searchModal');
    modal.style.display = "none";
}

function closeCreateTeamModal() {
	var modal = document.getElementById('createTeamModal');
    modal.style.display = "none";
}

function donationHistoryModalOn(){
	var modal = document.getElementById('donationHistoryModal');
	modal.style.display = "block";
}
function closeDonationHistoryModal(){
	var modal = document.getElementById('donationHistoryModal');
	modal.style.display = "none";
}

function archiveModalOn(){
	var modal = document.getElementById('archiveModal');
	modal.style.display = "block";
}
function closeArchiveModal(){
	var modal = document.getElementById('archiveModal');
	modal.style.display = "none";
}

window.onclick = function(event) {
	var modal = document.getElementById('myModal');
	var btn = document.getElementById("trigger");
	var span = document.getElementsByClassName("close")[0];
    if (event.target == modal) {
        modal.style.display = "none";
    }
}