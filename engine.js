module.exports = function(playerLibrary, abilityTypes, abilityCards, encounterCards) {
	this.playerLibrary = playerLibrary;
	this.abilityTypes = abilityTypes;
	this.allAbilityCards = abilityCards;
	this.encounterCards = encounterCards;

	this.workingLibrary = Object.assign({}, this.playerLibrary);

	this.deck = {};

	this.sessionRunning = false;

	this.addCardFromLibraryToDeck = function(cardID) {
		// check to see if the card is available from the player library - either that the count is above 0, or it is -1 (unlimited)
		// console.log(`adding ${cardID} from library to deck...`);
		if (!([cardID] in this.workingLibrary)) {
			throw `Can't add card ${cardID} - the card isn't in the player's library.`;
		} else if (this.workingLibrary[cardID] == 0) {
			throw `Can't add card ${cardID}: ${this.allAbilityCards[cardID].title} - there aren't any more of those cards left in the player's library.`;
		} else {
			if ([cardID] in this.deck) {
				// if already exists in this.deck, increment by 1
				this.deck[cardID] += 1;
			} else {
				// console.log(`${cardID} not in deck - setting equal to 1`);
				// else, if doesn't exist in this.deck, set equal to 1
				this.deck[cardID] = 1;
			}
			if (this.workingLibrary[cardID] != -1) {
				// if it's an unlimited card, don't decrement from the library
				this.workingLibrary[cardID] -= 1;
			}
		}
	};
	this.putCardBackFromDeckToLibrary = function(cardID) {
		if (!([cardID] in this.deck)) {
			throw `Can't put card ${cardID} back - the card isn't in the player's deck.`;
		} else if (this.deck[cardID] <= 0) {
			throw `Can't put card ${cardID}: ${this.allAbilityCards[cardID].title} back - there aren't any more of those cards left in the player's deck.`;
		} else {
			this.deck[cardID] -= 1;
			// if card in working library is not -1, then increment in working library
			if (this.workingLibrary[cardID] != -1) {
				this.workingLibrary[cardID] += 1;
			}
		}
	};

	this.startSession = function() {
		this.sessionRunning = true;
	};
};

/*

high-level game phases
- menu				- session not running, player not selected deck
- deck-select		- player needs to select cards from library to put in deck
- session-running	- player is receiving encounters, playing abilities, and turns are resolving

in-session game phases - just one?
- library-restock if no cards left in library, attempt to shuffle discard pile into library
- hand-restock if less than N cards left in hand, attempt draw cards until N cards are in hand, or library has no cards left
- player-select
	- (resolve player action - roll dice, determine if resistance was beaten)
	- (if resistance wasn't beaten, check to see if player has any cards left to lose, in deck or hand - if not, game over, if so, lose a random card from the hand or library/discard pile if the last card)
	- (if resistance was beaten, decrement encounter "HP", provide player with new )

*/
