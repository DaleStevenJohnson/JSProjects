var deck = [];
var suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
var player;
var dealer;
var games = 0;
window.onload = init;

function init() {
	elem.click(elem.name.button, elem.name.get);
	elem.click(elem.button.start, start);
	elem.click(bet.button, bet.place);
	elem.click(elem.button.hit, hit);
	elem.click(elem.button.stick, stick);
	elem.click(elem.button.doubleDown, bet.doubleDown);
}

// Check to see if player has stats - if so, copy them over to the new player object.
// Return cards to deck & shuffle deck. Deal two cards to the player. Reveal game buttons.
function start() {
	if (games > 0) {
		var playerWins = player.wins;
		var playerLosses = player.losses;
		var dealerWins = dealer.wins;
		var dealerLosses = dealer.losses;
		var playerMoney = player.money;
		var dealerMoney = dealer.money;
		player = new Player(elem.name.user, playerWins, playerLosses, playerMoney, "player");
		dealer = new Player("Dealer", dealerWins, dealerLosses, dealerMoney, "dealer");
	} else {
		player = new Player(elem.name.user, 0, 0, 100, "player");
		dealer = new Player("Dealer", 0 , 0, 200, "dealer");

		
	};
	newDeck();
	deck.shuffle();
	deck.shuffle();
	deck.shuffle();
	elem.title.innerHTML = "Welcome " + player.name + ", Let's Play Blackjack!";
	elem.show(elem.button.game);
	elem.remove(elem.button.start);
	elem.help.innerHTML = "Place your bets!";
	elem.flash(elem.help);
	deal(player, 2);
	elem.stats();
};


// Creates a 52 card deck of Card Objects, each with their own number, suit and name properties.
function newDeck() {
	deck = [];
	for (var i = 0; i<suits.length; i++) {
		for (var j=1; j<14; j++) {
			var suit = suits[i];
			var newCard = new Card(j, suits[i]);
			deck.push(newCard);
		};
	};
};


// Takes amount of cards specified from the top of the deck and deals them to the specified person's hand.
// Calls parseScore to add up the score, then check if win/loss conditions have been met.
function deal(person, num) {
	for (i=0; i<num; i++) {
		var nextCard = deck.splice(0, 1);
		person.hand.push(nextCard[0]);
	};
	if (player.hand.length < 3) {
		elem.show(elem.button.doubleDown);
		bet.place();
	} else {
		elem.hide(elem.button.doubleDown);
	};
	parseScore(person);
};


// This makes sure picture cards are worth 10 and an ace is worth 11 or 1 depending on the score.
// Calls scoreCheck to test the newly generated score against win/loss conditions.
// Need to allow for the edge case of getting multiple aces in your hand, and the game not letting you have them all as 1's 
//- e.g. 8, 10 and three Aces woud equal 21
function parseScore(person) {
	var newScore = 0;
	person.hand.sort(function(a, b) {return a["number"] - b["number"]})
	for (i = 0; i<person.hand.length; i++) {
		var card = person.hand[i];
		if(card.number > 10) { newScore = newScore + 10;	}
		else if (card.number !== 1) {	newScore = newScore + card.number; };
	};
	for (i = 0; i<person.hand.length; i++) {
		var card = person.hand[i];
		if (card.number === 1 && newScore < 11 ) {	newScore = newScore + 11;	}
		else if (card.number === 1) {	newScore = newScore + 1;	};
	};
	person.score = newScore;
	var pSLit = person["type"] + "Score";
	var personScore = document.getElementById(pSLit)
	personScore.innerHTML = person.name + "'s score: " + person.score;
	var pHLit = person["type"] + "Hand";
	var personHand = document.getElementById(pHLit)
	personHand.innerHTML = elem.playerHand.display(person); 
	scoreCheck();
}


//Checks the score of the player and the dealer against all win conditions for the game, 
//such as Pontoon, 5-card-stud and general greater thans and less thans.
function scoreCheck() {
	// Player Bust
	if (player.score > 21) {
		elem.title.innerHTML = "Bust! You Lose!";
		player.bust = true;
		dealer.wins++;
		player.losses++;
		end();
		bet.pay("lose");
		
	//Dealer Bust
	} else if (dealer.score > 21) {
		elem.title.innerHTML = "Dealer Bust - You Win! £" + player.bet*2 + " added to your winnings.";
		dealer.bust = true;
		player.wins++;
		dealer.losses++;
		end();
		bet.pay("win");
	};
	// Five Card Trick
	if (player.score < 22 && player.hand.length === 5) {
		elem.title.innerHTML = "Five-card Charlie! You Win! £" + player.bet*2 + " added to your winnings.";
		player.wins++;
		dealer.losses++;
		end();
		bet.pay("win");
	};
	// Pontoon
	if (player.hand.length === 2 && player.score === 21) {
		if (player.hand[0]["number"] === 1 || player.hand[1]["number"] === 1) {
			elem.title.innerHTML = "Pontoon! You Win! £" + player.bet*2 + " added to your winnings.";
			player.wins++;
			dealer.losses++;
			end();
			bet.pay("win");
		};
	};
	// Player has Highest Score
	if (player.stuck === true && dealer.stuck === true) {
		if (player.score > dealer.score) {
			elem.title.innerHTML = "Your Score of " + player.score + " beat the Dealer's " + dealer.score + " - You Win! £" + player.bet*2 + " added to your winnings.";
			player.wins++;
			dealer.losses++;
			end();
			bet.pay("win");		
		// Dealer has highest score
		} else if (player.score < dealer.score || player.score === dealer.score) {
			elem.title.innerHTML = "The Dealer's Score of " + dealer.score + " beat your score of " + player.score + " - You Lose!";
			dealer.wins++;
			player.losses++;
			end();
			bet.pay("lose");
		};
	};
};

//Deals the player one card - only a function to tie it to a button - dealerTurn uses deal function directly.
function hit() {	deal(player, 1);	};
//Updates player's stuck property, Hides Game buttons and starts the dealer's turn
function stick() {
	player.stuck = true;
	var buttons = document.getElementById("game-buttons");
	buttons.setAttribute("class", "hidden");
	dealerTurn();
}
// Runs through the dealer's turn, true to standard blackjack rules.
function dealerTurn() {
	function doDeal() {	deal(dealer, 2);	}
	if (dealer.score < 17 && dealer.hand.length > 1) {	setTimeout(dealerHits, 3000);	};
	function dealerHits() {	elem.updateHelp("Dealer says: 'Hit!'");	deal(dealer, 1);	};
	if (dealer.score < 22 && dealer.score >= 17) {
		dealer.stuck = true;
		elem.updateHelp("Dealer says: 'I think I'll stick...'");
		clearTimeout(dealerTurn);
		clearTimeout(dealerHits);
		scoreCheck();
		return;
	};
	if (dealer.hand.length === 0 && !player.bust) {	setTimeout(doDeal, 5000);	};
	if (!dealer.bust && !dealer.stuck) {	setTimeout(dealerTurn, 5000); 	};
};

// Pretty sure this is redundant
function reset() {	newDeck();	deck.shuffle();	};
// Ends the current hand and allows you t start a new one.
function end() {
	elem.show(elem.button.start);
	games++;
	elem.hide(elem.button.game);
	elem.stats();
};
// Ends the whole game
function endGame(outcome) {
	elem.remove(elem.gameArea);
	elem.remove(elem.button.start);
	if (outcome == "win") {
		alert("Congratulations " + player.name + ", you beat the Dealer! You Win!");
		document.getElementById("title").innerHTML = "Congratulations!";
	} else {
		alert("Commiserations " + player.name + ", you lost all of your money to the dealer.");
		document.getElementById("title").innerHTML = "Better Luck Next Time!";
	};
	elem.stats();
}
//Cheat code - Bribe the dealer
document.addEventListener("keydown", function(event) { if (event.which === 66) {	bet.bribe();	}	});








