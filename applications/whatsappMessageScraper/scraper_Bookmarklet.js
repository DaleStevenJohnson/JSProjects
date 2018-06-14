function getText() {
	let rawMessages = document.getElementsByClassName("Tkt2p");
	let messages = {};
	for (let i = 1; i < rawMessages.length; i++) {
		let m = rawMessages[i];
		let text = m.children[0].innerText;
		let data = m.children[0].dataset.prePlainText;
		messages[i] = {person: "", message: "", timestamp: { date: "", time: ""}};
		messages[i].message = text;
		let reg = new RegExp(/[^a-zA-Z0-9/: ]/g);
		data = data.replace(reg, "");
		data = data.split(" ");
		data[3] = data[3].substring(0, data[3].length-1);
		messages[i].timestamp.date = data[1];
		messages[i].timestamp.time = data[0];
		messages[i].person = data[2] + " " + data[3];
	}
	localStorage["whatsAppScraper"] = JSON.stringify(messages);
	exportToJsonFile(messages);
}
function exportToJsonFile(jsonData) {
    let dataStr = "let data = " + JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    let exportFileDefaultName = 'WhatsApp_data.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
getText();