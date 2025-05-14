
/*
Hands (front) 
	Normal hands, should be able to cover any other item
Tie (front)
	Normal tie
Head (front)
	Hats, hair...
Eyes
	Covering the visor
Visor
	Visor, glasses
Legs (front)
	Normal legs
Body
	Normal body
Hands (back)
	Arms crossed on the back or something
Tie (back)
	maybe a scarf with wind partially behind the body
Legs (back)
	Maybe when running, it would be the farthest item
Head (back)
	long hair, etc


If we need to change the layer of a part: 
- we need to change the order in currentRosetai array,
- change the layer number inside its respective array
- and the layer number inside the getLayersByType function

*/


/*
NEW ARRANGE
------------
----FRONT---
11 	Hands (front) 
	 Normal hands, should be able to cover any other item
10 	Eyes
	 Covering the visor
9	Head (front)
	 Hats, hair...
8	Tie (front)
	 Normal tie
7	Visor
	 Visor, glasses
6 	Tie (back)
	 maybe a scarf with wind partially behind the body
5	Head 2 (front)
	 Hats, hair...
4 	Body
	 Normal body
3 	Legs (front)
	 Normal legs
2 	Head (back)
	 long hair, etc
1 	Hands (back)
	 Arms crossed on the back or something
0 	Legs (back)
	 Maybe when running, it would be the farthest item

----BACK----
*/

const webWidth = 600;
const webHeight = 800;
const originalWidth = 1200;
const originalHeight = 1600;
const prevWidth = 100;
const prevHeight = prevWidth * 1.33;


const dirCommon = "./common";
const dirBody = "./body";
const dirEyes = "./eyes";
const dirHands = "./hands";
const dirHead = "./head";
const dirLegs = "./legs";
const dirTie = "./tie";
const dirVisor = "./visor";

const canvas = document.getElementById("app");
const ctx = canvas.getContext("2d");

const downloadCanvas = document.createElement("canvas");
const downloadCtx = downloadCanvas.getContext("2d");

const bufferCanvas = document.createElement("canvas");
const bufferCtx = bufferCanvas.getContext("2d");

const body = [
	[{ src: `${dirBody}/body_basic.png`, layer: 4 }],
	[{ src: `${dirCommon}/empty.png`, layer: 4 }],
	[{ src: `${dirBody}/body_beer bottle.png`, layer: 4 }],
	[{ src: `${dirBody}/body_blue.png`, layer: 4 }],
	[{ src: `${dirBody}/body_broccoli - sakamot o.png`, layer: 4 }],
	[{ src: `${dirBody}/body_cyan.png`, layer: 4 }],
	[{ src: `${dirBody}/body_green.png`, layer: 4 }],
	[{ src: `${dirBody}/body_lime.png`, layer: 4 }],
	[{ src: `${dirBody}/body_orange.png`, layer: 4 }],
	[{ src: `${dirBody}/body_pineapple.png`, layer: 4 }],
	[{ src: `${dirBody}/body_pink.png`, layer: 4 }],
	[{ src: `${dirBody}/body_purple.png`, layer: 4 }],
	[{ src: `${dirBody}/body_real.png`, layer: 4 }],
	[{ src: `${dirBody}/body_square.png`, layer: 4 }],
	[{ src: `${dirBody}/body_yellow.png`, layer: 4 }],
	[{ src: `${dirBody}/body_8ball.png`, layer: 4 }],
	[{ src: `${dirBody}/body_redshortapple - Sofea Osmera.png`, layer: 4 }],
	[{ src: `${dirBody}/body_pumpkin.png`, layer: 4 }],
];


const eyes = [
	[{ src: `${dirEyes}/eyes_basic.png`, layer: 10 }],
	[{ src: `${dirCommon}/empty.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_3rd eye.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_angry.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_closed.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_creeper.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_dead.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_haaton.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_halfeye - Sofea Osmera.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_horus.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_jealous penguin.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_jobzu.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_monocle.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_oh no.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_pumpkin.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_real.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_round.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_swirly glasses.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_weird.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_white.png`, layer: 10 }],
	[{ src: `${dirEyes}/eyes_XD.png`, layer: 10 }],
];

const hands = [
	[{ src: `${dirHands}/hands_basic.png`, layer: 11 }],
	[{ src: `${dirCommon}/empty.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_beer.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_broccoli - sakamot o.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_buff.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_club.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_cornpopper.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_jobzu.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_mic.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_penlights.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_pickaxe.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_simple whiteglove - Sofea Osmera.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_SnS.png`, layer: 11 }],
	[{ src: `${dirHands}/hands_splatoongun.png`, layer: 11 }],
];
// b = 2
const head = [
	[{ src: `${dirHead}/head_basic.png`, layer: 2 }],
	[{ src: `${dirCommon}/empty.png`, layer: 5 }],
	[{ src: `${dirHead}/head_asacocoplug.png`, layer: 5 }],
	[{ src: `${dirHead}/head_broccoli - sakamot o.png`, layer: 5 }],
	[{ src: `${dirHead}/head_cat ears.png`, layer: 5 }],
	[{ src: `${dirHead}/head_choco horns_b.png`, layer: 2 }],
	[{ src: `${dirHead}/head_diamond helmet.png`, layer: 9 }],
	[{ src: `${dirHead}/head_ebifrion mane_b.png`, layer: 2 }],
	[{ src: `${dirHead}/head_flowery - Sofea Osmera.png`, layer: 5 }],
	[{ src: `${dirHead}/head_fubuki ears.png`, layer: 5 }],
	[{ src: `${dirHead}/head_headphone.png`, layer: 5 }],
	[{ src: `${dirHead}/head_indian headdress_b.png`, layer: 2 }],
	[{ src: `${dirHead}/head_kapumin bow.png`, layer: 5 }],
	[{ src: `${dirHead}/head_pain.png`, layer: 5 }],
	[{ src: `${dirHead}/head_pata_rough.png`, layer: 2 }],
	[{ src: `${dirHead}/head_peko ears.png`, layer: 5 }],
	[{ src: `${dirHead}/head_pineapple_b.png`, layer: 2 }],
	[{ src: `${dirHead}/head_rose.png`, layer: 5 }],
	[{ src: `${dirHead}/head_rosenbhat.png`, layer: 5 }],
	[{ src: `${dirHead}/head_straw hat.png`, layer: 9 }],
	[{ src: `${dirHead}/head_tanukileaf.png`, layer: 9 }],
	[{ src: `${dirHead}/head_worm.png`, layer: 5 }],
];

const legs = [
	[{ src: `${dirLegs}/legs_basic.png`, layer: 3 }],
	[{ src: `${dirCommon}/empty.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_Aki boots.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_broccoli - sakamot o.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_chicken.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_closer - Sofea Osmera.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_human.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_sports shoes.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_tako.png`, layer: 3 }],
	[{ src: `${dirLegs}/legs_tree trunk.png`, layer: 3 }],
];

// b = 6
const tie = [
	[{ src: `${dirTie}/tie_basic.png`, layer: 8 }],
	[{ src: `${dirCommon}/empty.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_beard black.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_beard blonde.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_beard white.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_gamer coat_b.png`, layer: 6 }],
	[{ src: `${dirTie}/tie_jobzu.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_moustache black.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_moustache blonde.png`, layer: 6 }],
	[{ src: `${dirTie}/tie_moustache white.png`, layer: 6 }],
	[{ src: `${dirTie}/tie_mustache_oshu.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_neopolice F_b.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_neopolice M_b.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_peanut.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_pinkribbon - Sofea Osmera.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_straight.png`, layer: 8 }],
	[{ src: `${dirTie}/tie_UFO_b.png`, layer: 6 }],
];

const visor = [
	[{ src: `${dirVisor}/visor_basic.png`, layer: 7 }],
	[{ src: `${dirCommon}/empty.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_biker.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_crusader.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_crusader2.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_cyclops.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_feathery - Sofea Osmera.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_kamina.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_noh mask.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_panda_Ticket.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_paper.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_round.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_round2.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_sunglasses.png`, layer: 7 }],
	[{ src: `${dirVisor}/visor_tanuki2 edit - Tanuki Senpai.png`, layer: 7 }],
];



const currentRosetai = [
	// Back
	null, 			// 0
	null,			// 1
	head[0][0],		// 2
	legs[0][0],		// 3
	body[0][0],		// 4
	null,			// 5
	null,			// 6
	visor[0][0],	// 7
	tie[0][0],		// 8
	null,			// 9
	eyes[0][0],		// 10
	hands[0][0]		// 11
	// Front
];


(function init() {
	showCategory("body");
	loadPreviews("head");
	loadPreviews("visor");
	loadPreviews("tie");
	loadPreviews("body");
	loadPreviews("eyes");
	loadPreviews("hands");
	loadPreviews("legs");

	bufferCanvas.width = canvas.width;
	bufferCanvas.height = canvas.height;

	downloadCanvas.width = originalWidth;
	downloadCanvas.height = originalHeight;

	drawRosetai(0);

	window.addEventListener('DOMContentLoaded', () => {
		document.querySelectorAll('.items canvas').forEach(canvas => {
			let wrapper = document.createElement('div');
			wrapper.className = 'canvas-wrapper';
			canvas.parentNode.insertBefore(wrapper, canvas);
			wrapper.appendChild(canvas);
		});

		document.querySelectorAll('.items').forEach(item => {
			let canvasWrappers = item.querySelectorAll('.canvas-wrapper');

			let second = canvasWrappers[1];
			second.className = 'canvas-wrapper empty';
		});
	});

	const container = document.querySelector('#categories');
	const leftBtn = document.querySelector('#btn-left');
	const rightBtn = document.querySelector('#btn-right');

	leftBtn.addEventListener('click', () => {
		container.scrollBy({
			left: -70,
			behavior: 'smooth'
		});
	});

	rightBtn.addEventListener('click', () => {
		container.scrollBy({
			left: 70,
			behavior: 'smooth'
		});
	});

})();



function loadPreviews(type) {
	const container = document.getElementById("items-" + type);

	const assetArray = getAssetArray(type);

	for (let i = 0; i < assetArray.length; i++) {
		const asset = assetArray[i];
		const canvasPrev = document.createElement('canvas');
		const ctxPrev = canvasPrev.getContext("2d");

		canvasPrev.width = prevWidth;
		canvasPrev.height = prevHeight;

		canvasPrev.dataset.type = type;
		canvasPrev.dataset.index = i;

		canvasPrev.addEventListener("click", function (e) {
			const index = e.target.dataset.index;
			const selectedAsset = assetArray[index];

			for (let layer of getLayersByType(type)) {
				currentRosetai[layer] = null;
			}

			for (let item of selectedAsset) {
				currentRosetai[item.layer] = item;
			}

			drawRosetai(0);
		});

		asset.sort((a, b) => a.layer - b.layer);

		for (let partIndex = 0; partIndex < asset.length; partIndex++) {
			const img = new Image();
			img.src = asset[partIndex].src;

			img.width = prevWidth;
			img.height = prevHeight;

			img.onload = function () {
				ctxPrev.drawImage(img, 0, 0, canvasPrev.width, canvasPrev.height);
			};

		}

		container.appendChild(canvasPrev);

	}
}




function drawRosetai(index, isDownload) {

	if (index === 0) {
		if (isDownload) {
			downloadCtx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height);
		} else {
			bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
		}
	}

	if (index >= currentRosetai.length) {
		if (isDownload) {
			const data = downloadCanvas.toDataURL();
			const link = document.createElement('a');
			link.href = data;
			link.download = "rosetai_" + Date.now();

			link.click();
			link.remove();

		} else {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(bufferCanvas, 0, 0);
		}

		return;
	}

	const currentItem = currentRosetai[index];
	if (currentItem != null) {
		const img = new Image();
		img.src = currentItem.src;

		img.onload = function () {
			if (isDownload) {
				downloadCtx.drawImage(img, 0, 0, downloadCanvas.width, downloadCanvas.height);
			} else {
				bufferCtx.drawImage(img, 0, 0, bufferCanvas.width, bufferCanvas.height);
			}

			drawRosetai(index + 1, isDownload);
		};


	} else {
		drawRosetai(index + 1, isDownload);
	}
}



function getAssetArray(type) {
	switch (type) {
		case "head":
			return head;
		case "visor":
			return visor;
		case "eyes":
			return eyes;
		case "tie":
			return tie;
		case "body":
			return body;
		case "hands":
			return hands;
		case "legs":
			return legs;
		default:
			return [];
	}
}

function getLayersByType(type) {
	switch (type) {
		case "legs":
			return [0, 3];
		case "body":
			return [4];
		case "visor":
			return [7];
		case "eyes":
			return [10];
		case "tie":
			return [6, 8];
		case "hands":
			return [1, 11];
		case "head":
			return [2, 5, 9];
		default:
			return [];
	}
}


function showCategory(input) {
	let items = document.querySelectorAll(".items");

	let category;
	if (typeof input === 'string') {
		category = input;
	} else if (input?.currentTarget?.dataset?.category) {
		category = input.currentTarget.dataset.category;
	}

	items.forEach(function (el) {
		el.style.display = 'none';
	});

	const unselectButtons = document.querySelectorAll('.btn-category');
	const selectButton = document.querySelector(`#${category}`);

	unselectButtons.forEach(btn => {
		btn.classList.remove('active');
	});

	selectButton.classList.add('active');


	document.querySelector("#items-" + category).style.display = 'grid';
}

function downloadRosetai() {
	drawRosetai(0, true);
}

// Instead of checking which layer do I need to skip due to 
// complements having different options, we simulate the click event of the previews so it will take care of the rest
// We use the requestFrame because if not, even after cleaning the vanvas, it will show overlapped
// duplicated accesories
function randomRosetai() {
	// Clean the buffer and canvas just in case
	bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const categories = document.querySelectorAll('.items');
	let i = 0;

	function clickNext() {
		if (i >= categories.length) return;

		const accesories = categories[i].querySelectorAll('canvas');
		if (accesories.length > 0) {
			const randomAccesory = accesories[Math.floor(Math.random() * accesories.length)];
			randomAccesory.click();
		}

		i++;
		// Waiting for the next frame to be used to draw
		requestAnimationFrame(clickNext);
	}

	clickNext();
}