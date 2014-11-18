function DeckStoreService(Cards, Deck) {
	var deckStoreName = "edb-savedDecks";

	this.save = function(name, deck) {
		var deckString = Deck.stringify(deck);
		if(typeof deckString !== "undefined") {
			var savedDecks = JSON.parse(localStorage.getItem(deckStoreName));
			if(savedDecks) {
				savedDecks[name] = deckString;
			} else {
				savedDecks = {};
				savedDecks[name] = deckString;
			}
			localStorage.setItem(deckStoreName, JSON.stringify(savedDecks));
			return true;
		} else {
			return false;
		}
	};
	this.load = function(name) {
		var savedDecks = JSON.parse(localStorage.getItem(deckStoreName));
		if(savedDecks) {
			var deckString = savedDecks[name];
			var deck = Deck.parse(deckString);
			return deck;
		}
	};
	this.remove = function(name) {
		var savedDecks = JSON.parse(localStorage.getItem(deckStoreName));
		if(savedDecks) {
			delete savedDecks[name];
			localStorage.setItem(deckStoreName, JSON.stringify(savedDecks));
		}
	};
	this.list = function() {
		var savedDecks = JSON.parse(localStorage.getItem(deckStoreName));
		var deckNames = [];
		if(savedDecks) {
			for(var name in savedDecks) {
				deckNames.push(name);
			}
		}
		return deckNames;
	};
}
