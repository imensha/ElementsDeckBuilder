function BuilderController($animate, $filter, Cards, Elements) {
	this.elements = Elements;
	this.elements.unshift({name: "All", value: ""});
	this.allCards = Cards;
	this.currentDeck = [];
	this.filterElement = this.elements[0].value;
	this.searchText = "";

	this.deckAdd = function(card) {
		this.currentDeck.push(angular.copy(card));
	};
	this.deckRemove = function(i) {
		this.currentDeck.splice(i, 1);
	};
	this.hasImage = function(card) {
		if(typeof card.image === "undefined" || card.image.search(/^data/) > -1) {
			return false;
		} else {
			return true;
		}
	};

	this.currentPage = 1;
	this.itemsPerPage = 12;
	this.maxPages = 5;
	this.filteredCards = $filter("filter")(this.allCards, {element: this.filterElement});
	this.pageCards = this.filteredCards.slice(0, this.itemsPerPage);
	this.filterCards = function() {
		var filterByElement = $filter("filter")(this.allCards, {element: this.filterElement});
		var filterBySearch = $filter("filter")(filterByElement, this.searchText);
		this.filteredCards = filterBySearch;
	};
	this.filteredCardCount = function() {
		return this.filteredCards.length;
	}
	this.elementChange = function() {
		this.currentPage = 1;
		this.filterCards();
		this.pageChange();
	};
	this.searchChange = function() {
		this.currentPage = 1;
		this.filterCards();
		this.pageChange();
	};
	this.pageChange = function() {
		this.pageCards = this.filteredCards.slice((this.currentPage-1)*this.itemsPerPage, this.currentPage*this.itemsPerPage);
	};
}
