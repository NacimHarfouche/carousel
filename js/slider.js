'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/
// je saisie les elements DOM
let barreElt = document.getElementById("toolbarToggle");
let navElt = document.querySelector("nav.toolbar");

let buttonPreviousElt = document.getElementById("slider-previous");
let buttonToggleElt = document.getElementById("slider-toggle");
let buttonNextElt = document.getElementById("slider-next");
let buttonRandomElt = document.getElementById("slider-random");

let imageElt = document.querySelector("figure>img");
let legendeImgElt = document.querySelector("figure>figcaption");

let buttonPauseElt = document.querySelector("nav>a:nth-of-type(2)>i");

// declaration de tableau qui comporte les image et legende
const tabImages = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg" ,"img/6.jpg"];
const tabLegend = ["Street Art", "Bridge in the Morning", "Colorfull Building", "Night Sky Building", "Fast Life in the City", "Paris By Night"];

// compteur de position
let count = 0;
// stock un nombre aléatoire
let randomNumber = new Number();
// déclare une variable interval
let interval;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/
// change l'image et le texte
function changeIt() {
	count === -1 ? count = 5 : count;
	count === 6 ? count = 0 : count;
	imageElt.src = tabImages[count];
	legendeImgElt.textContent = tabLegend[count];
}
function getRandomNumber() {
	randomNumber = Math.floor(Math.random() * 6);
}
function increase() {
	count++;
	changeIt();
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
// image et texte par défaut au chargement de la page
window.addEventListener("load", ()=> {
	imageElt.src = tabImages[0];
	legendeImgElt.textContent = tabLegend[0];
});

// cache le nav lors du clique
barreElt.addEventListener("click",  ()=> {
	navElt.classList.toggle("hidden");
});

// change l'image lors du clique droit/gauche
buttonPreviousElt.addEventListener("click", ()=> {
	count--;
	changeIt();
});
buttonNextElt.addEventListener("click", increase);

// affiche une image aléatoire
buttonRandomElt.addEventListener("click", ()=> {
	getRandomNumber();
	while (count == randomNumber){
		getRandomNumber();
	}
	count = randomNumber;
	changeIt();
});

// defile les image automatiquement au clique
buttonToggleElt.addEventListener("click", ()=> {
	imageElt.classList.toggle("on");
	console.log(imageElt.className);
	if (imageElt.className == "on") {
		buttonPauseElt.classList.replace("fa-play", "fa-pause");
		interval = setInterval(increase, 1500);
	} else {
		buttonPauseElt.classList.replace("fa-pause", "fa-play");
		console.log("off");
		clearInterval(interval);
	}
});

// menu déroulant
let option = document.querySelector("select");
let indexOption = 0;

for (let name of tabLegend) {
	let opt = document.createElement("option");
	opt.textContent = name;
	opt.value = indexOption
	option.append(opt);
	indexOption++;
}


// quand on aura généré le select et ses options, qu'est c e qu'il se passe lorsqu'on change
option.addEventListener("change", function(){
	legendeImgElt.textContent = tabLegend[this.value];
	imageElt.src = tabImages[this.value];
	count = this.value;
});