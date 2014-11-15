function DeckStoreService(Cards) {
	var deckStoreName = "edb-savedDecks";

	function deckStringify(deck) {
		if(typeof deck !== "undefined" && deck instanceof Array) {
			var deckString = "";
			deck.forEach(function(card) {
				deckString += card.code ? card.code + " " : ""
			});
			return deckString.trim();
		}
	}
	function deckParse(deckString) {
		if(typeof deckString === "string" && deckString.length > 0) {
			var deck = [];
			var deckStringCodes = deckString.split(" ");
			var uniqueCodes = {};
			deckStringCodes.forEach(function(code) {
				if(uniqueCodes.hasOwnProperty(code)) {
					uniqueCodes[code]++;
				} else {
					uniqueCodes[code] = 1;
				}
			});
			var cardCodes = Cards.map(function(card) {
				return card.code;
			});
			for(var code in uniqueCodes) {
				var count = uniqueCodes[code];
				var codeIndex = cardCodes.indexOf(code);
				if(codeIndex > -1) {
					for(var i = 0; i < count; i++) {
						deck.push(angular.copy(Cards[codeIndex]));
					}
				}
			}
			console.log("Deck: ", deck);
			return deck;
		}
	}
	this.save = function(name, deck) {
		var deckString = deckStringify(deck);
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
			var deck = deckParse(deckString);
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
