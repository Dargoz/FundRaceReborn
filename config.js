<<<<<<< HEAD
var currMenu = "home";

var names = [];
var items = [];

function init(){
	items = document.getElementsByClassName('nav-link');
	
	for(var i = 0; i<items.length; i++){
		names[i] = items[i].name;
		console.log(names[i]);
	}

	items[0].addEventListener('click', function(event){
		changeMenu(names[0]);
	});
	items[1].addEventListener('click', function(event){
		changeMenu(names[1]);
	});
	items[2].addEventListener('click', function(event){
		changeMenu(names[2]);
	});
	items[3].addEventListener('click', function(event){
		changeMenu(names[3]);
	});
	items[4].addEventListener('click', function(event){
		changeMenu(names[4]);
	});
}

function nextPage(){
	var NxtIndex = 0;
	var CurrIndex = 0;
	for (var i = 0; i<names.length; i++){
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}
	NxtIndex = CurrIndex+1;

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(names[(CurrIndex+1)%items.length])[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, names[(CurrIndex+1)%items.length]);
}

function prevPage(){
	var NxtIndex = 0;
	var CurrIndex = 0;
	for (var i = 0; i<names.length; i++){
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}
	NxtIndex = CurrIndex+1;

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(names[(CurrIndex-1)%items.length])[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, names[(CurrIndex-1)%items.length]);
}


function changeMenu(menuName){
	console.log(menuName);
	if (currMenu == menuName) return;


	var NxtIndex = 0;
	var CurrIndex = 0;

	for (var i = 0; i<names.length; i++){
		if(menuName == names[i]) {
			NxtIndex = i;
		}
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(menuName)[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, menuName);
}

function doChange(curr, nxt, CurrIndex, NxtIndex, menuName){
	curr.classList.toggle('menu--off');
	nxt.classList.toggle('menu--on');
	curr.classList.remove('menu--on');
	items[CurrIndex].classList.remove('active');
	items[NxtIndex].classList.toggle('active');

	window.setTimeout(function(){
		curr.classList.remove('menu--off');
	}, 500);

	currMenu = menuName;
=======
var currMenu = "home";

var names = [];
var items = [];

function init(){
	items = document.getElementsByClassName('nav-link');
	
	for(var i = 0; i<items.length; i++){
		names[i] = items[i].name;
		console.log(names[i]);
	}

	items[0].addEventListener('click', function(event){
		changeMenu(names[0]);
	});
	items[1].addEventListener('click', function(event){
		changeMenu(names[1]);
	});
	items[2].addEventListener('click', function(event){
		changeMenu(names[2]);
	});
	items[3].addEventListener('click', function(event){
		changeMenu(names[3]);
	});
	items[4].addEventListener('click', function(event){
		changeMenu(names[4]);
	});
}

function nextPage(){
	var NxtIndex = 0;
	var CurrIndex = 0;
	for (var i = 0; i<names.length; i++){
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}
	NxtIndex = CurrIndex+1;

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(names[(CurrIndex+1)%items.length])[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, names[(CurrIndex+1)%items.length]);
}

function prevPage(){
	var NxtIndex = 0;
	var CurrIndex = 0;
	for (var i = 0; i<names.length; i++){
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}
	NxtIndex = CurrIndex+1;

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(names[(CurrIndex-1)%items.length])[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, names[(CurrIndex-1)%items.length]);
}


function changeMenu(menuName){
	console.log(menuName);
	if (currMenu == menuName) return;


	var NxtIndex = 0;
	var CurrIndex = 0;

	for (var i = 0; i<names.length; i++){
		if(menuName == names[i]) {
			NxtIndex = i;
		}
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(menuName)[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, menuName);
}

function doChange(curr, nxt, CurrIndex, NxtIndex, menuName){
	curr.classList.toggle('menu--off');
	nxt.classList.toggle('menu--on');
	curr.classList.remove('menu--on');
	items[CurrIndex].classList.remove('active');
	items[NxtIndex].classList.toggle('active');

	window.setTimeout(function(){
		curr.classList.remove('menu--off');
	}, 500);

	currMenu = menuName;
>>>>>>> 8519e1c6ee128eabd4813c84163f9ea3a67037f7
}