window.onload = init;



function init() {
	selectTemplate();
} 
 // This looks for a click event on each element with the class of 'thumbs' 		
function selectTemplate() {
	var images = document.getElementsByClassName("thumbs");
	for (var i = 0; i < images.length; i++) {
		images[i].onclick = showTemplate;
		
	}
	// on.click handler - this changes the source filename for the large displayed template, 
	// removing the word "Thumb" and replacing it with "White"
	function showTemplate(eventObj) {
	var thumb = eventObj.target; 
	var main = document.getElementById("selectedTemplate");
	var change = thumb.src.replace("Thumb", "White");
	
	main.src = change;
	}
}



function selectPaper() {

}

function showPaper() {

}
