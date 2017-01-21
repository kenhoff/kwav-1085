class Engine {
	constructor(playerExistingLibrary, abilityTypes, abilityCards, encounterCards, maxCardsInDeck, maxCardsInHand) {
		this.abilityTypes = abilityTypes;
		this.allAbilityCards = abilityCards;
		this.encounterCards = encounterCards;
		this.maxCardsInHand = 4

		this.gameState = "not-started"
		this.hand = {}

		this.deck = [];
		this.discardPile = {};

		this.sessionRunning = false;

		// the player library is all cards that the player owns
		if (playerExistingLibrary.length == 0) {
			this.playerLibrary = [];
			for (var i = 0; i < 10; i++) {
				this.addJunkCardToPlayerLibrary();
			}
		} else {
			this.playerLibrary = playerExistingLibrary;
		}

		// the "working library" is the counts of cards left in the player's library - usually considered the "library" when the player is building decks
		this.workingLibrary = this.playerLibrary.slice();

	}
	startGame() {
		this.gameState = "started"
			// load first encounter
		this.currentEncounter = this.encounterCards.randomEncounterCards[Math.floor(Math.random() * this.encounterCards.randomEncounterCards.length)];
		// draw cards until hand has N cards
	}
	addJunkCardToPlayerLibrary() {
		// create a new array from all the cards, filter only the junk (rarity 1) cards, and pick one at random to add to the player library
		let junkCards = this.allAbilityCards.filter(function(card) {
			return (card.rarity == 1);
		})
		let junkCard = junkCards[Math.floor(Math.random() * junkCards.length)]
		this.playerLibrary.push(junkCard)
		if (this.workingLibrary) {
			this.workingLibrary.push(junkCard)
		}
	}
	resetWorkingLibrary() {
		this.workingLibrary = this.playerLibrary.slice()
	}
	getCardByID(cardID) {
		for (let card of this.abilityCards) {
			if (card.id === cardID) {
				return card
			}
		}
	}
	addCardFromWorkingLibraryToDeck(cardID) {
		for (var i = 0; i < this.workingLibrary.length; i++) {
			if (this.workingLibrary[i].id == cardID) {
				this.deck.push(this.workingLibrary[i])
				this.workingLibrary.splice(i, 1);
				return
			}
		}
	}
	putCardBackFromDeckToWorkingLibrary(cardID) {
		for (var i = 0; i < this.deck.length; i++) {
			if (this.deck[i].id == cardID) {
				this.workingLibrary.push(this.deck[i])
				this.deck.splice(i, 1);
				return
			}
		}
	}
}

export default Engine;
