function getPeople() {
	let people = {};
	let newPerson = true;
	let population = 0
	for (let entry in data) {
 		if (people[data[entry].person] == undefined) {
 			 people[data[entry].person] = [];
 		}

 		people[data[entry].person].push(new Message(data[entry].timestamp.time, data[entry].timestamp.date, data[entry].message))
	}
	return people;
}

class Message {
	constructor(time, date, message) {
		this.text = message;
		this.time = time;
		this.date = date;
	}
}

class Word {
	constructor(word) {
		this.word = word;
		this.frequency = 1;
	}
}

function getWordFrequency(array) {
	let split = new RegExp(/[^a-zA-Z0-9']/g);
	let result = [];
	for (let message of array) {
		let words = message.text;
		words = words.split(split)
		for (let i = 0; i < words.length; i++) {
			let thisWord = words[i].toLowerCase();
			if (thisWord != "") { 
				let newWord = true;
				let j;
				for (j of result) {
					if (j.word == thisWord) {
						newWord = false;
						break;
					}
				}
				if (newWord) {
					let w = new Word(thisWord);
					result.push(w);
				} else {
					j.frequency++;
				}		
			}
		}
	}
	result.sort(function (a,b) { return b.frequency - a.frequency; });
	return result;
}


function removeCommonWords(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (top100Words.indexOf(arr[i].word) >= 0 ) {
			arr.splice(i,1);
			console.log(arr[i].word);
		}
	}
}


let a = getPeople();
let dale = getWordFrequency(a["Dale Johnson"]);
let b = getWordFrequency(a["Hannah Mitten"]);
