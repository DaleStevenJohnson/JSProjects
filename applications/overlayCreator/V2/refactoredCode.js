window.onload = init;

function init() {
	elem.guide.Change(copy.welcome, " ");
	elem.bg.Change(art.original);
	elem.bg.Reveal();
	elem.coords.Click(elem.coords.toggle);
	templateSketcher();
} 

function templateSketcher() {
	elem.bg.MouseOver(elem.bg.Guide);
	elem.bg.MouseOut(elem.bg.Welcome);
	elem.bg.Click(startDesigner);
}
	
function toggleCoords() {
	elem.bg.MouseMove(elem.coords.log);
}

function startDesigner(eventObj) {
	elem.guide.Change(copy.templateDesc, " ");		
	eventObj.target.style.backgroundImage = art.step1a;		
	elem.bg.MouseOut(null);
	elem.bg.MouseOver(null);
	elem.bg.Click(elem.choose.template);
}

function paperTime(eventObj) {
	lastFunction = startDesigner;
	elem.guide.Change(copy.paperDesc, " ");
	eventObj.target.style.backgroundImage = art.step1b;
	elem.bg.Click(elem.choose.paper);
}

function fontTime(eventObj) {
	lastFunction = function(eventObj) {
					
		selTemp.setAttribute("class", "hidden");
		document.getElementById("textEditor").setAttribute("class", "hidden");
		document.getElementById("templateText").setAttribute("class", "hidden");
		paperTime(eventObj);
	}

	elem.guide.Change(copy.fontDesc, " ");
	eventObj.target.style.backgroundImage = art.step1c;

	var selTemp = document.getElementById("selectedTemplate");
	selTemp.removeAttribute("class", "hidden");
	selTemp.style.backgroundImage = "url(images/" + String(selectedTemplate) + "/" + String(selectedTemplate) + String(selectedPaper) + ".jpg)";
	
	elem.styles.hide("textEditor")
	elem.styles.hide("templateText")

	elem.bg.Click(elem.choose.font);

	var input1 = document.getElementById("input1");
	var input2 = document.getElementById("input2");
	
	input1.onkeyup = function(){
		document.getElementById("line1").innerHTML = input1.value;
	}
	
	input2.onkeyup = function(){
		document.getElementById("line2").innerHTML = input2.value;
	}

	elem.blackButton.Click(elem.templateText.style.blackFont);
	elem.whiteButton.Click(elem.templateText.style.whiteFont);
	elem.submit.Click(printChoices);
}

function printChoices() {
	elem.bg.Hide();
	elem.guide.Change(copy.choices(), copy.terms);
}