class Engine {
	constructor(playerExistingLibrary, abilityTypes, abilityCards, encounterCards, maxCardsInDeck) {
		this.abilityTypes = abilityTypes;
		this.allAbilityCards = abilityCards;
		this.encounterCards = encounterCards;
		this.maxCardsInDeck = 10;
		this.maxCardsInHand = 4
		this.chanceForAward = 0.2


		this.gameState = "not-started"

		this.deck = [];
		this.hand = []
		this.discardPile = [];
		this.store = [];

		this.encountersCompleted = 0;
		// number of encounters per level?
		this.encountersPerLevel = 3

		this.calculateCurrentLevel();

		// current level = floor(1 + (number of encounters completed / encounters per level))

		// the player library is all cards that the player owns
		if (playerExistingLibrary.length === 0) {
			this.playerLibrary = [];
			for (var i = 0; i < 20; i++) {
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
		this.encountersCompleted = 0
		this.calculateCurrentLevel()
			// load first encounter
		this.currentEncounter = this.encounterCards.randomEncounterCards[Math.floor(Math.random() * this.encounterCards.randomEncounterCards.length)];
		// shuffle deck
		shuffle(this.deck);
		// draw cards until hand has N cards
		this.drawHand()
	}

	calculateCurrentLevel() {
		this.currentLevel = Math.floor(1 + (this.encountersCompleted / this.encountersPerLevel))
	}

	shuffleDiscardIntoDeck() {
		if (this.deck.length === 0) {
			this.deck = this.discardPile.slice()
			this.discardPile = []
			shuffle(this.deck);
		}
	}

	drawHand() {
		// if there are cards left in the deck and there are less than max-cards in the hand, draw cards
		while ((this.deck.length > 0) && (this.hand.length < this.maxCardsInHand)) {
			this.drawCard()
		}
	}

	drawCard() {
		this.hand.push(this.deck.pop());
	}

	addJunkCardToPlayerLibrary() {
		// create a new array from all the cards, filter only the junk (rarity 1) cards, and pick one at random to add to the player library
		let junkCards = this.allAbilityCards.filter(function(card) {
			return (card.rarity === 1);
		})
		let junkCard = junkCards[Math.floor(Math.random() * junkCards.length)]
		this.playerLibrary.push(junkCard)
		if (this.workingLibrary) {
			this.workingLibrary.push(junkCard)
		}
	}
	resetDeckbuilding() {
		this.workingLibrary = this.playerLibrary.slice()
		this.deck = [];
		this.store = [];
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
			if (this.workingLibrary[i].id === cardID) {
				this.deck.push(this.workingLibrary[i])
				this.workingLibrary.splice(i, 1);
				return
			}
		}
	}
	putCardBackFromDeckToWorkingLibrary(cardID) {
		for (var i = 0; i < this.deck.length; i++) {
			if (this.deck[i].id === cardID) {
				this.workingLibrary.push(this.deck[i])
				this.deck.splice(i, 1);
				return
			}
		}
	}

	addCardFromWorkingLibraryToStore(cardID) {
		for (var i = 0; i < this.workingLibrary.length; i++) {
			if (this.workingLibrary[i].id === cardID) {
				this.store.push(this.workingLibrary[i])
				this.workingLibrary.splice(i, 1);
				return
			}
		}
	}
	putCardBackFromStoreToWorkingLibrary(cardID) {
		for (var i = 0; i < this.store.length; i++) {
			if (this.store[i].id === cardID) {
				this.workingLibrary.push(this.store[i])
				this.store.splice(i, 1);
				return
			}
		}
	}

	transmuteStoreCards() {
		if (this.store.length === 3) {
			let initialCardRarity = this.store[0].rarity
			for (let card of this.store) {
				if (card.rarity !== initialCardRarity) {
					return;
				}
			}
			let newCard = this.getRandomCardWithRarityLevel(initialCardRarity + 1);
			if (!newCard) {
				return
			}
			// need to adjust player's library, and save
			// just make players library now equal to the working library? and add the new card to it?
			this.playerLibrary = this.workingLibrary.slice();
			this.playerLibrary.push(newCard);
			this.store = [];
			this.store.push(newCard);
			this.saveGame();
		}
	}

	// this is the "main loop" of the game
	playCardFromHandIntoCurrentEncounter(cardID) {
		this.shuffleDiscardIntoDeck()
		for (var i = 0; i < this.hand.length; i++) {
			if (this.hand[i].id === cardID) {
				// pop card off of hand, store here
				// resolve encounter
				// calculate levels and compare
				if (this.didEncounterSucceed(this.currentEncounter, this.hand[i])) {
					// if encounter successful, put card in discard pile
					this.discardPile.push(this.hand[i])
					this.hand.splice(i, 1)
					if (Math.random() <= this.chanceForAward) {
						this.awardNewCard(this.currentLevel)
					}
					// increment level
					this.encountersCompleted += 1;
					this.calculateCurrentLevel()
						// load up new encounter
					this.currentEncounter = this.encounterCards.randomEncounterCards[Math.floor(Math.random() * this.encounterCards.randomEncounterCards.length)];

				} else {
					// if encounter unsuccessful, delete card
					this.hand.splice(i, 1)
						// at this point, if you've run out of cards, you lose :(
					this.shuffleDiscardIntoDeck()
					if (this.deck.length === 0 && this.hand.length === 0) {
						this.gameState = "not-started"
						this.gameOver()
					}
				}
				this.shuffleDiscardIntoDeck()
				this.drawHand()
				return
			}
		}
	}
	didEncounterSucceed(encounter, card) {
		let encounterChanceToSucceed;
		if (card.type === encounter.resistances[0]) {
			encounterChanceToSucceed = 0.8
		} else if (card.type === encounter.resistances[1]) {
			encounterChanceToSucceed = 0.5
		} else if (card.type === encounter.resistances[2]) {
			encounterChanceToSucceed = 0.2
		}
		encounterChanceToSucceed += (card.rarity * 0.2)
		encounterChanceToSucceed -= (this.currentLevel * 0.2)
		let roll = Math.random()
		if (roll <= encounterChanceToSucceed) {
			return true;
		} else {
			return false;
		}
	}

	getRandomCardWithRarityLevel(rarityLevel) {
		let cards = this.allAbilityCards.filter(function(card) {
			return (card.rarity === rarityLevel);
		})
		if (cards.length === 0) {
			return null;
		}
		return cards[Math.floor(Math.random() * cards.length)]
	}

	awardNewCard(rarityLevel) {
		// pick card with right rarity level at random from card list
		// create a new array from all the cards, filter only the junk (rarity 1) cards, and pick one at random to add to the player library
		let awardCard = this.getRandomCardWithRarityLevel(rarityLevel)
		if (!awardCard) {
			return
		}
		this.playerLibrary.push(awardCard)
		this.deck.push(awardCard)
		this.saveGame();

		// put card in player's deck
		// put card in player's library
	}
	saveGame() {
		localStorage.setItem("radio-waves", btoa(JSON.stringify(this.playerLibrary)))
	}
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

export default Engine;
