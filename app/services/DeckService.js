function DeckService(Cards) {
	this.stringify = function(deck) {
		if(typeof deck !== "undefined" && deck instanceof Array) {
			var deckString = "";
			deck.forEach(function(card) {
				deckString += card.code ? card.code + " " : ""
			});
			return deckString.trim();
		}
	};
	this.parse = function(deckString) {
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
			return deck.length > 0 ? deck : undefined;
		} else {
			return [];
		}
	}
}
