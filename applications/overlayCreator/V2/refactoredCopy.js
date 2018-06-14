var selectedTemplate;
var selectedPaper;
var selectedFont = "brandon";
var lastFunction;
var lastvar = 0;
var toggle;


var art = {
	
	original: "url(images/welcome.jpg)",
	changed: "url(images/guide.jpg)",
	step1a: "url(images/step1a.jpg)",
	step1b: "url(images/step1b.jpg)",
	step1c: "url(images/step1c.jpg)"
};

var elem = {
	choose: {
		template: function(eventObj) {
			lastFunction = null;
			var x = eventObj.pageX 
			var y = eventObj.pageY 

			for (key in tPos) {
					
				if (x > tPos[key].x1 && x < tPos[key].x2 && y > tPos[key].y1 && y < tPos[key].y2) {
					
					console.log(key);
					(elem.styles.textEditor()).top = tPos[key].tepT;
					(elem.styles.textEditor()).width = tPos[key].tepW;
					(elem.styles.textEditor()).right = tPos[key].tepR;
					(elem.templateText.style.return()).top = tPos[key].fontTop;
					(elem.templateText.style.return()).left = tPos[key].fontLeft;
					(elem.templateText.style.return()).width = tPos[key].fontWidth;
					(elem.styles.selectedTemplate()).width = tPos[key].imgWidth;
					(elem.styles.selectedTemplate()).height = tPos[key].imgHeight;
					selectedTemplate = key;
					paperTime(eventObj);
					return selectedTemplate;
				}
			}
		},

		paper: function(eventObj) {
			var x = eventObj.pageX;
			var y = eventObj.pageY;
			
			for (key in pPos) {
				
				if (x > pPos[key].x1 && x < pPos[key].x2 && y > pPos[key].y1 && y < pPos[key].y2) {
					
					console.log(key);
					
					if (key != "back") {

						selectedPaper = key
						fontTime(eventObj);
						return selectedPaper;
					} else {
						lastFunction(eventObj);
					}
				}
			}
		},

		font: function(eventObj) {
			//This allows you to click and select the font you want
			var x = eventObj.pageX;
			var y = eventObj.pageY;
			
			for (key in fPos) {
				
				if (x > fPos[key].x1 && x < fPos[key].x2 && y > fPos[key].y1 && y < fPos[key].y2) {
					
					console.log(key);
					if (key != "back") {
						selectedFont = key;
						document.getElementById("templateText").style.fontFamily = key;
						return selectedFont;
					} else {
						lastFunction(eventObj);
					}	
				}
			}
		}
	},

	guide: {

		Change: function(guideText, secondText) {
			document.getElementById('infoText').innerHTML = guideText + "</br>" + secondText;
		},

	},
	
	bg: {
		MouseOut: function(func) {
			document.getElementById('page').onmouseout = func;
		},

		MouseOver: function(func) {
			document.getElementById('page').onmouseover = func;
		},

		MouseMove: function(func) {
			document.getElementById('page').onmousemove = func;
		},

		Click: function(func) {
			document.getElementById('page').onclick = func;
		},

		Change: function(newImg) {
			document.getElementById('page').style.backgroundImage = newImg;
		}, 

		Reveal: function(){
			document.getElementById('page').removeAttribute('class', 'hidden');
		},

		Hide: function(){
			document.getElementById('page').setAttribute('class', 'hidden');
		},

		Guide: function(eventObj) {
			eventObj.target.style.backgroundImage = art.changed;	
		},

		Welcome: function(eventObj) {
			eventObj.target.style.backgroundImage = art.original;
		}
	},

	templateText: {

		style: {
			return: function() {
				return document.getElementById("templateText").style;
			},

			blackFont:	function() {
				document.getElementById("templateText").style.color = "black";
			},
	
			whiteFont:	function () {
				document.getElementById("templateText").style.color = "white";
			}
		},


	},

	blackButton: {
		Click: function(func) {
			document.getElementById("black").onclick = func;
		}
	},

	whiteButton: {
		Click: function(func) {
			document.getElementById("white").onclick = func;
		}
	},
	
	// The sliders are buggy and need investigation!
	slider: {
		fontSize: function(slider, element) {
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
		  	lastvar = fontvar;
		  	return
			},

		fontPos: function(slider, element) {
			var fontvar = parseInt(document.getElementById(slider).value);
		    var lineOne = document.getElementById(element).style.top;
		    var div = parseInt(lineOne.replace("px", ""));
		   		  
		    if (fontvar > lastvar) {
		   		 document.getElementById(element).style.top = (div + (fontvar-lastvar)) + "px";
		   		 console.log(document.getElementById(element).style.top); 		 
		   	} else if (fontvar < lastvar) {
		   		 document.getElementById(element).style.top = (div - (lastvar - fontvar)) + "px";
		   		 console.log(document.getElementById(element).style.top); 		 
		   	}
   			lastvar = fontvar;
		  	return
			},

		lineSpacing: function(slider, element) {
				var fontvar = parseInt(document.getElementById(slider).value);			  
			    var lineOne = document.getElementById(element).style.top;			   
			    var div = parseInt(lineOne.replace("px", ""));			   
			  
			    if (fontvar > lastvar) {
			   		 document.getElementById(element).style.top = (div + (fontvar-lastvar)) + "px";
			   		 console.log(document.getElementById(element).style.top);
			   		 
			   	} else if (fontvar < lastvar) {
			   		 document.getElementById(element).style.top = (div - (lastvar - fontvar)) + "px";
			   		 console.log(document.getElementById(element).style.top);			   		 
			   	}		    
			  	lastvar = fontvar;
			  	return
			}
		


	},

	styles: {
		textEditor: function() {
			return document.getElementById("textEditor").style;
		},
		selectedTemplate: function() {
			return document.getElementById("selectedTemplate").style;
		},

		hide: function(el) {
			document.getElementById(el).removeAttribute("class", "hidden");
		}
	},

	submit: {
		Click: function(func) {
			document.getElementById("submitDesign").onclick = func;
		}
	},
	coords: {
		Click: function(func) {
			document.getElementById('logCoords').onclick = func;
		},

		toggle: function() {
			if (toggle) {
				toggle = false;
			} else {
				toggle = true;
			}
			console.log(toggle)
			if (toggle) {
				elem.bg.MouseMove(logCoords);
			} else {
				elem.bg.MouseMove(null)
			}
		},

		log: function(eventObj) {
			var n = eventObj.pageX;
			var m = eventObj.pageY;
			console.log(n + ", " + m);
		}
	}
};

var copy = {
	welcome: "Roll your mouse over the image above to reveal the instructions. </br> When you're ready - give the image a click!",
	templateDesc: "Choose your template",
	paperDesc: "Choose your Paper Style",
	fontDesc: "Time to Edit!",
	choices: function() {
		return "Copy and Paste the following in an email to your JustPose contact to get your Print Template designed and a Proof sent over to you: </br> </br> Template: " + selectedTemplate + ", </br> Paper: " + selectedPaper + ", </br> Font: " + selectedFont + ", </br> Line 1 Text: " + lineParse("line1") + ", </br> Line 2 Text: " + lineParse("line2") +  ", </br> </br> If you designed something very precisely - make sure to let your JustPose contact know so they can recreate your design as accurately as possible*";
	},
	terms: "</br></br> *All designs are subject to JustPose brand guidelines."
	

};

var tPos = {
	fourup: 	{x1: 100, y1: 107, x2: 197, y2: 248, fontTop: "405px", fontLeft: "20px", fontWidth: "275px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "10px", tepR: "10px"},
	bigtop: 	{x1: 319, y1: 107, x2: 418, y2: 248, fontTop: "240px", fontLeft: "45px", fontWidth: "225px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "10px", tepR: "10px"},
	single: 	{x1: 549, y1: 107, x2: 647, y2: 248, fontTop: "343px", fontLeft: "45px", fontWidth: "225px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "10px", tepR: "10px"},
	bigleft: 	{x1: 56,  y1: 334, x2: 218, y2: 448, fontTop: "190px", fontLeft: "240px", fontWidth: "221px", imgWidth: "473px", imgHeight: "312px", tepW: "360px", tepT: "340px", tepR: "155px"},
	threeup: 	{x1: 286, y1: 335, x2: 447, y2: 451, fontTop: "170px", fontLeft: "240px", fontWidth: "221px", imgWidth: "473px", imgHeight: "312px", tepW: "360px", tepT: "340px", tepR: "155px"},
	d3: 		{x1: 555, y1: 313, x2: 599, y2: 458, fontTop: "415px", fontLeft: "85px", fontWidth: "140px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "10px", tepR: "10px"},
	d4: 		{x1: 602, y1: 320, x2: 650, y2: 465, fontTop: "415px", fontLeft: "85px", fontWidth: "140px", imgWidth: "312px", imgHeight: "473px", tepW: "180px", tepT: "10px", tepR: "10px"}
};

	
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
};

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
};

function lineParse(element) {
		if (document.getElementById(element).innerHTML === "") {
			return "No Text";
		} else {
			return document.getElementById(element).innerHTML;
		}
	}

