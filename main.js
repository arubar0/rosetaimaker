console.log("--DEBUG--");

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
10 	Hands (front) 
     Normal hands, should be able to cover any other item
9 	Eyes
     Covering the visor
8	Tie (front)
     Normal tie
7	Visor
     Visor, glasses
6 	Tie (back)
     maybe a scarf with wind partially behind the body
5	Head (front)
     Hats, hair...
4 	Body
     Normal body
3 	Head (back)
     long hair, etc
2 	Legs (front)
     Normal legs
1 	Hands (back)
     Arms crossed on the back or something
0 	Legs (back)
     Maybe when running, it would be the farthest item

*/


const prevWidth = 100;
const prevHeight = prevWidth * 1.33;

const dirBody = "./body";
const dirEyes = "./eyes";
const dirHands = "./hands";
const dirHead = "./head";
const dirLegs = "./legs";
const dirTie = "./tie";
const dirVisor = "./visor";

const canvas = document.getElementById("app");
const ctx = canvas.getContext("2d");

const bufferCanvas = document.createElement("canvas");
const bufferCtx = bufferCanvas.getContext("2d");

const body = [
	[{ src: `${dirBody}/body_basic.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_beer bottle.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_blue.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_broccoli - sakamot o.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_cyan.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_green.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_lime.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_orange.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_pineapple.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_pink.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_purple.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_real.png`, layer: 4, category: 'body' }],
	[{ src: `${dirBody}/body_yellow.png`, layer: 4, category: 'body' }]
	];


const eyes = [
	[{ src: `${dirEyes}/eyes_basic.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_3rd eye.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_angry.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_closed.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_creeper.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_dead.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_horus.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_oh no.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_real.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_round.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_swirly glasses.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_weird.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_white.png`, layer: 9, category: 'eyes' }],
	[{ src: `${dirEyes}/eyes_XD.png`, layer: 9, category: 'eyes' }]
	];

const hands = [
	[{ src: `${dirHands}/hands_basic.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_beer.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_broccoli - sakamot o.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_buff.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_club.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_cornpopper.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_penlights.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_pickaxe.png`, layer: 10, category: 'hands' }],
	[{ src: `${dirHands}/hands_SnS.png`, layer: 10, category: 'hands' }]
	];

const head = [
	[{ src: `${dirHead}/head_basic.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_basic_b.png`, layer: 3, category: 'head' }],
	[{ src: `${dirHead}/head_pata_rough.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_long_hair_front.png`, layer: 5, category: 'head' }, { src: `${dirHead}/head_long_hair_back.png`, layer: 3, category: 'head' }],	
	[{ src: `${dirHead}/head_broccoli - sakamot o.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_diamond helmet.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_headphone.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_indian headdress_b.png`, layer: 3, category: 'head' }],
	[{ src: `${dirHead}/head_pata_rough.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_pineapple_b.png`, layer: 3, category: 'head' }],
	[{ src: `${dirHead}/head_rose.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_straw hat.png`, layer: 5, category: 'head' }],
	[{ src: `${dirHead}/head_worm.png`, layer: 5, category: 'head' }]
	];

const legs = [
	[{ src: `${dirLegs}/legs_basic.png`, layer: 2, category: 'legs' }],
	[{ src: `${dirLegs}/legs_Aki boots.png`, layer: 2, category: 'legs' }],
	[{ src: `${dirLegs}/legs_broccoli - sakamot o.png`, layer: 2, category: 'legs' }],
	[{ src: `${dirLegs}/legs_human.png`, layer: 2, category: 'legs' }],
	[{ src: `${dirLegs}/legs_tako.png`, layer: 2, category: 'legs' }]
	];

const tie = [
	[{ src: `${dirTie}/tie_basic.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_beard black.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_beard blonde.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_beard white.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_broccoli - sakamot o.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_moustache black.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_moustache blonde.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_moustache white.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_mustache - oshu.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_neopolice M.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_neopolice _F.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_peanut.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_straight.png`, layer: 8, category: 'tie' }],
	[{ src: `${dirTie}/tie_UFO_b.png`, layer: 6, category: 'tie' }]
	];

const visor = [
	[{ src: `${dirVisor}/visor_basic.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_biker.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_broccoli - sakamot o.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_crusader.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_crusader2.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_cyclops.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_kamina.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_noh mask.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_paper.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_round.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_round2.png`, layer: 7, category: 'visor' }],
	[{ src: `${dirVisor}/visor_tanuki2 edit - Tanuki Senpai.png`, layer: 7, category: 'visor' }]
	];



const currentRosetai = [
	// Back
	null, 			// 0
	null,			// 1
	legs[0][0],		// 2
	null,			// 3
	body[0][0],		// 4
	head[0][0],		// 5
	null,			// 6
	visor[0][0],	// 7
	tie[0][0],		// 8
	eyes[0][0],		// 9
	hands[0][0]		// 10
	// Front
	];


(function init() {
loadPreviews("head");
loadPreviews("visor");
loadPreviews("tie");
loadPreviews("body");
loadPreviews("eyes");
loadPreviews("hands");
loadPreviews("legs");

bufferCanvas.width = canvas.width;
bufferCanvas.height = canvas.height;

drawRosetai(0);

})();



function loadPreviews(type) {
	const container = document.getElementById(type);

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

		for(let partIndex = 0;partIndex < asset.length ; partIndex++){
			const img = new Image();
			img.src = asset[partIndex].src; 

			img.width=prevWidth;
			img.height=prevHeight;

			img.onload = function () {
				ctxPrev.drawImage(img, 0, 0, canvasPrev.width, canvasPrev.height);
			};

		}

		container.children[i].appendChild(canvasPrev);

	}
}




function drawRosetai(index) {
	if (index === 0) {
		bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
	}

	if (index >= currentRosetai.length) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(bufferCanvas, 0, 0);
		return;
	}

	const currentItem = currentRosetai[index];
	if (currentItem != null) {
		const img = new Image();
		img.src = currentItem.src;

		img.onload = function () {
			bufferCtx.drawImage(img, 0, 0, bufferCanvas.width, bufferCanvas.height);
			drawRosetai(index + 1);
		};


	} else {
		drawRosetai(index + 1);
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
		return [0, 2];
	case "body":
		return [4];
	case "visor":
		return [7];
	case "eyes":
		return [9];
	case "tie":
		return [6, 8];
	case "hands":
		return [1, 10];
	case "head":
		return [3, 5];
	default:
		return [];
	}
}