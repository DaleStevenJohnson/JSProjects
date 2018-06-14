window.onload = init;

function init() {
	document.getElementById("page").style.backgroundImage = "url(images/welcome.jpg)";
	document.getElementById("infoText").innerHTML = copy.welcome;
	templateSketcher();
} 

function templateSketcher() {
	
	var bgimg = document.getElementById("page");
	var original = "url(images/welcome.jpg)";
	bgimg.removeAttribute("class", "hidden");
	bgimg.backgroundImage = original 
	var guide = document.getElementById("infoText");
	var changed = "url(images/guide.jpg)";
	var step1a = "url(images/step1a.jpg)";
	var step1b = "url(images/step1b.jpg)";
	var step1c = "url(images/step1c.jpg)";
	var selectedTemplate;
	var selectedPaper;
	var selectedFont = "brandon";
	var lastFunction;
	
	bgimg.onmouseover = showGuide;
	bgimg.onmouseout = showWelcome;
	bgimg.onclick = startDesigner;
	
	var tPos = {
		fourup: 	{x1: 100, y1: 107, x2: 197, y2: 248, fontTop: "405px", fontLeft: "45px", fontWidth: "225px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "150px", tepR: "10px"},
		bigtop: 	{x1: 319, y1: 107, x2: 418, y2: 248, fontTop: "240px", fontLeft: "45px", fontWidth: "225px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "150px", tepR: "10px"},
		single: 	{x1: 549, y1: 107, x2: 647, y2: 248, fontTop: "343px", fontLeft: "45px", fontWidth: "225px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "150px", tepR: "10px"},
		bigleft: 	{x1: 56,  y1: 334, x2: 218, y2: 448, fontTop: "190px", fontLeft: "240px", fontWidth: "221px", imgWidth: "473px", imgHeight: "312px", tepW: "360px", tepT: "340px", tepR: "155px"},
		threeup: 	{x1: 286, y1: 335, x2: 447, y2: 451, fontTop: "170px", fontLeft: "240px", fontWidth: "221px", imgWidth: "473px", imgHeight: "312px", tepW: "360px", tepT: "340px", tepR: "155px"},
		d3: 		{x1: 555, y1: 313, x2: 599, y2: 458, fontTop: "415px", fontLeft: "85px", fontWidth: "140px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "150px", tepR: "10px"},
		d4: 		{x1: 602, y1: 320, x2: 650, y2: 465, fontTop: "415px", fontLeft: "85px", fontWidth: "140px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "150px", tepR: "10px"}
	}

	// #textEditor tepW: "360px", tepT: "340px", tepL: "-153px"

	var pPos = {
		vintage:    {x1: 8,   y1: 62,  x2: 186, y2: 272},
		retro:      {x1: 187, y1: 62,  x2: 363, y2: 272},
		tickertape: {x1: 364, y1: 62,  x2: 540, y2: 272},
		leaves:     {x1: 541, y1: 62,  x2: 725, y2: 272},
		white:      {x1: 8,   y1: 273, x2: 186, y2: 324},
		shock:      {x1: 187, y1: 273, x2: 363, y2: 324},
		oldskool:   {x1: 364, y1: 273, x2: 540, y2: 377},
		newskool:   {x1: 541, y1: 273, x2: 725, y2: 377},
		mellow:     {x1: 8,   y1: 325, x2: 186, y2: 377},
		baby:       {x1: 187, y1: 325, x2: 363, y2: 377},
		teal: 		{x1: 8,   y1: 378, x2: 186, y2: 429},
		cool: 		{x1: 187, y1: 378, x2: 363, y2: 429},
		pluto: 		{x1: 364, y1: 378, x2: 540, y2: 481},
		saturn: 	{x1: 541, y1: 378, x2: 725, y2: 481},
		minty: 		{x1: 8,   y1: 430, x2: 186, y2: 481},
		black: 		{x1: 187, y1: 430, x2: 363, y2: 481},
	 	back: 		{x1: 9,   y1: 482, x2: 52,  y2: 507}
	}

	var fPos = {
		wendy: 				{x1: 17,  y1: 50,  x2: 103, y2: 159},
		playfair: 			{x1: 104, y1: 50,  x2: 196, y2: 159},
		amatic: 			{x1: 17,  y1: 160, x2: 103, y2: 277},
		geometria: 			{x1: 104, y1: 160, x2: 196, y2: 277},
		brandon: 			{x1: 17,  y1: 278, x2: 103, y2: 386},
		jacquesandgilles: 	{x1: 104, y1: 278, x2: 196, y2: 386},
		blockl: 			{x1: 17,  y1: 387, x2: 103, y2: 480},
		bromello: 			{x1: 104, y1: 387, x2: 196, y2: 480},
		back: 				{x1: 9,   y1: 481, x2: 52,  y2: 524}
	}



	function showGuide(eventObj) {
		eventObj.target.style.backgroundImage = changed;	
	}

	function showWelcome(eventObj) {
		eventObj.target.style.backgroundImage = original;
	}

	function startDesigner(eventObj) {
		guide.innerHTML = copy.templateDesc;		
		eventObj.target.style.backgroundImage = step1a;		
		bgimg.onmouseout = null;
		bgimg.onmouseover = null;

		bgimg.onmousemove = logCoords;
		function logCoords(eventObj) {
			var n = eventObj.pageX 
			var m = eventObj.pageY 
			console.log(n + ", " + m);
		}

		bgimg.onclick = chooseTemplate;

		function chooseTemplate(eventObj) {
			lastFunction = null;
			var x = eventObj.pageX 
			var y = eventObj.pageY 

			for (key in tPos) {
					
				if (x > tPos[key].x1 && x < tPos[key].x2 && y > tPos[key].y1 && y < tPos[key].y2) {
					
					console.log(key);
					document.getElementById("templateText").style.top = tPos[key].fontTop;
					document.getElementById("templateText").style.left = tPos[key].fontLeft;
					document.getElementById("templateText").style.width = tPos[key].fontWidth;
					document.getElementById("selectedTemplate").style.width = tPos[key].imgWidth;
					document.getElementById("selectedTemplate").style.height = tPos[key].imgHeight;
					document.getElementById("textEditor").style.right = tPos[key].tepR;
					document.getElementById("textEditor").style.top = tPos[key].tepT;
					document.getElementById("textEditor").style.width = tPos[key].tepW;
					// if (key === "d3" || key === "d4") {
					// 	document.getElementById("line2").style.top = "-20px";
					// } else {
					// 	document.getElementById("line2").style.top = "-20px";
					// }
					selectedTemplate = key;
					paperTime(eventObj);
				}
			}


		// 	if (y > 107 && y < 248) {

		// 		if (x > tPos.fourup.x1 && x < tPos.fourup.x2) {
		// 			//Choose 4 up
		// 			selectedTemplate = "fourup";
		// 			console.log(selectedTemplate);
		// 			paperTime(eventObj);
					
		// 		} else if (x > tPos.bigtop.x1 && x < tPos.bigtop.x2) {
		// 			// Choose Big Top
		// 			selectedTemplate = "bigtop";
		// 			console.log(selectedTemplate);
		// 		} else if (x > tPos.single.x1 && x < tPos.single.x2) {
		// 			//Choose Single
		// 			selectedTemplate = "single";
		// 			console.log(selectedTemplate);
		// 		}
		// 	} else if (y > 313 && y < 452) {
				
		// 		if (x > tPos.bigleft.x1 && x < tPos.bigleft.x2) {
		// 			//Choose Big Left
		// 			selectedTemplate = "bigleft";
		// 			console.log(selectedTemplate);
		// 		} else if (x > tPos.threeup.x1 && x < tPos.threeup.x2) {
		// 			// Choose Three Up
		// 			selectedTemplate = "threeup";
		// 			console.log(selectedTemplate);
		// 		} else if (x > tPos.d3.x1 && x < tPos.d3.x2) {
		// 			//Choose Duplicates 3
		// 			selectedTemplate = "d3";
		// 			console.log(selectedTemplate);
		// 		} else if (x > tPos.d4.x1 && x < tPos.d4.x2) {
		// 			//Choose Duplicates 4
		// 			selectedTemplate = "d4";
		// 			console.log(selectedTemplate);
		// 		}
		// 	}
		}

		function paperTime(eventObj) {
			lastFunction = startDesigner;
			guide.innerHTML = copy.paperDesc;
			eventObj.target.style.backgroundImage = step1b;
			bgimg.onclick = choosePaper;

			function choosePaper(eventObj) {
				var x = eventObj.pageX;
				var y = eventObj.pageY;
				
				for (key in pPos) {
					
					if (x > pPos[key].x1 && x < pPos[key].x2 && y > pPos[key].y1 && y < pPos[key].y2) {
						
						console.log(key);
						
						if (key != "back") {

							selectedPaper = key
							fontTime(eventObj);
						} else {
							lastFunction(eventObj);
						}
					}
				}
			}
		}

		function fontTime(eventObj) {
			lastFunction = function(eventObj) {
							
							selTemp.setAttribute("class", "hidden");
							document.getElementById("textEditor").setAttribute("class", "hidden");
							document.getElementById("templateText").setAttribute("class", "hidden");
							paperTime(eventObj);
						}
			guide.innerHTML = copy.fontDesc;
			eventObj.target.style.backgroundImage = step1c;

			var selTemp = document.getElementById("selectedTemplate");
			selTemp.removeAttribute("class", "hidden");
			selTemp.style.backgroundImage = "url(images/" + String(selectedTemplate) + "/" + String(selectedTemplate) + String(selectedPaper) + ".jpg)";
			
			document.getElementById("textEditor").removeAttribute("class", "hidden");
			document.getElementById("templateText").removeAttribute("class", "hidden");
			
			bgimg.onclick = chooseFont;
			
			


			function chooseFont(eventObj) {
				//This allows you to click and select the font you want
				var x = eventObj.pageX;
				var y = eventObj.pageY;
				
				for (key in fPos) {
					
					if (x > fPos[key].x1 && x < fPos[key].x2 && y > fPos[key].y1 && y < fPos[key].y2) {
						
						console.log(key);
						if (key != "back") {
							selectedFont = key;
							document.getElementById("templateText").style.fontFamily = key;
						} else {
							lastFunction(eventObj);
						}	
					}
				}
			}



			var input1 = document.getElementById("input1");
			var input2 = document.getElementById("input2");
			input1.onkeyup = function(){
    			document.getElementById("line1").innerHTML = input1.value;
			}
			input2.onkeyup = function(){
    			document.getElementById("line2").innerHTML = input2.value;
			}

			var black = document.getElementById("black")
			var white = document.getElementById("white")
			black.onclick = blackFont;
			white.onclick = whiteFont;
			function blackFont() {
				document.getElementById("templateText").style.color = "black";
			}
			function whiteFont() {
				document.getElementById("templateText").style.color = "white";
			}
		}
		
		
	}	
}

function fontSize(value) {
		
		var line1Size = document.getElementById("line1").style.fontSize;
		line1Size = line1Size + value;
		}

var lastvar = 0;
function changeFontSize(slider, element) {
	var fontvar = parseInt(document.getElementById(slider).value);
    
    var lineOne = document.getElementById(element).style.fontSize;
    var lineTwo = document.getElementById("line2").style.fontSize;
    var div = parseInt(lineOne.replace("px", ""));
    var div2 = parseInt(lineTwo.replace("px", ""));
  
    if (fontvar > lastvar) {
   		 document.getElementById(element).style.fontSize = (div + (fontvar-lastvar)) + "px";
   		 document.getElementById("line2").style.fontSize = (div2 + (fontvar-lastvar)) + "px";
   		 console.log(document.getElementById(element).style.fontSize);
   		 
   	} else if (fontvar < lastvar) {
   		 document.getElementById(element).style.fontSize = (div - (lastvar - fontvar)) + "px";
   		 document.getElementById("line2").style.fontSize = (div2 - (lastvar-fontvar)) + "px";
   		 console.log(document.getElementById(element).style.fontSize);
   		 
   	}
   		//

    
  	lastvar = fontvar;
}








