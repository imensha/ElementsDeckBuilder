function BuilderController($animate, Cards, Elements) {
	this.elements = Elements;
	this.allCards = Cards;
	this.currentDeck = [];
	this.filterElement = null;

	this.deckAdd = function(card) {
		this.currentDeck.push(angular.copy(card));
	}
	this.deckRemove = function(i) {
		this.currentDeck.splice(i, 1);
	}
	this.hasImage = function(card) {
		if(typeof card.image === "undefined" || card.image.search(/^data/) > -1) {
			return false;
		} else {
			return true;
		}
	}
}
