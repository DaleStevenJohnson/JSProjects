Array.prototype.swap = function(x, y) {
	var b = this[x];
	this[x] = this[y];
	this[y] = b;
	return this;
};

Array.prototype.shuffle = function() {	for (i=0; i<this.length; i++) {	var rand = Math.floor(Math.random() * 52);	this.swap(i, rand);	};	};

function Player(name, wins, losses, money, type) {
	this.name = name;
	this.hand = [];
	this.score = 0;
	this.stuck = false;
	this.bust = false;
	this.wins = wins;
	this.losses = losses;
	this.bet = 0;
	this.money = money;
	this.type = type;
};

function Card(num, suit) {
	this.number = num;
	this.suit = suit;
	var cardNames = ["Joker", "Ace", "Two", "Three", "Four","Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
	var cardName = cardNames[num];
	this.name = cardName + " of " + suit;
};

var elem = {
	flash: function(x) {
		elem.show(x);
		function ghj() {	elem.hide(x);	};
		setTimeout(ghj, 5000);
	},
	hide: function(elem) 		{	elem.setAttribute("class", "hidden");	},
	remove: function(elem) 		{	elem.setAttribute("class", "gone");		},
	show: function(elem) 		{	elem.removeAttribute("class", "hidden");},
	click: function(elem, func) {	elem.onclick = func;					},
	title: document.getElementById("title"),
	help: document.getElementById("help"),
	updateHelp: function(str) 	{	elem.help.innerHTML = str;	elem.flash(elem.help)	},
	gameArea: document.getElementById("game-area"),
	scoreArea: document.getElementById("score-area"),
	playerHand: {
		literal: document.getElementById("playerHand"),
		// Purely visual - Displays card names on screen.
		display: function (person) {
			var thisHand = person.hand[0].name;
			for (var i = 1; i < person.hand.length; i++) {	thisHand = thisHand + ", " + person.hand[i].name;	};
			return thisHand;
		}
	},
	button: {
		start: document.getElementById("newGameButton"),
		game: document.getElementById("game-buttons"),
		hit: document.getElementById("hitButton"),
		stick: document.getElementById("stickButton"),	
		doubleDown: document.getElementById("DDButton"),
		bet: document.getElementById("bet"),
	},
	name: {
		user: "",
		div: document.getElementById("player-name"),
		field: document.getElementById("playerNameInput"),
		button: document.getElementById("playerNameButton"),
		get: function() {
			elem.name.user = elem.name.field.value;
			elem.remove(elem.name.div);
			elem.show(elem.gameArea);
			elem.title.innerHTML = "Welcome " + elem.name.user + ", Let's Play Blackjack!";
			elem.show(elem.button.start);
		}
	},
	stats: function() {
		var stat = document.getElementById("stats");
		stat.innerHTML = "Dealer's Pot: £" + dealer.money + " | Games Played: " + games + " | Wins: " + player.wins + " | Losses: " + player.losses + " | Money: £" + player.money;
	}
};

var bet = {
	literal: document.getElementById("bet"),
	button: document.getElementById("betButton"),
	place: function() {
		if (player.money > 1 && player.hand.length === 2) {
			player.money = player.money - 2;
			player.bet = player.bet + 2;
		} else if (player.money < 1) {
			elem.help.innerHTML = "Out of money - no more betting can be placed for this hand.";
			elem.flash(elem.help)
		} else if (player.hand.length > 2){
			elem.help.innerHTML = "No more bets please.";
			elem.flash(elem.help);
		}
		bet.literal.innerHTML = "Bet: £" + player.bet;
		document.getElementById("returnBet").innerHTML = "Dealer will return: £" + (player.bet*2);
		elem.stats();
	},
	pay: function(outcome) {
		if (outcome == "win") {
			player.money = player.money + (player.bet * 2)
			dealer.money = dealer.money - player.bet
		} else {
			dealer.money = dealer.money + player.bet
		}
		if (player.money < 2) {
			endGame("lose")
		} else if (dealer.money < 2) {
			endGame("win")
		}
	},
	doubleDown: function() {
		if (player.money > player.bet) {
			player.money = player.money - player.bet;
			player.bet = player.bet + player.bet;
			deal(player, 1);
			stick();
		} else if (player.money < player.bet) {
			elem.help.innerHTML = "Out of money - double down unavailable";
			elem.flash(elem.help);
		};
		var betP = document.getElementById("bet");
		betP.innerHTML = "Bet: £" + player.bet;
		elem.stats();
	},
	bribe: function () {
	elem.help.innerHTML = "Next Card: " + deck[0]["name"];
	bet.place();
	elem.flash(elem.help);
	}
};