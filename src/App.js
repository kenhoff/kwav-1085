import React, {Component} from 'react';
import Deckbuilder from "./Deckbuilder.jsx";
import RadioWavesEngine from "./engine.js";
import abilityTypes from "./abilityTypes.js";
import encounterCards from "./encounterCards.js";
import CardList from "./CardList.jsx";
import Encounter from "./Encounter.jsx";
import Store from "./Store.jsx";
import ImportGame from "./ImportGame.jsx";

import abilityCards from "./abilityCards.js";

let game = new RadioWavesEngine([], abilityTypes, abilityCards, encounterCards);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			menuState: "main-menu"
		};
		game.gameOver = () => {
			console.log("calling gameover");
			this.setState({menuState: "main-menu"});
		}

	}
	componentDidMount() {
		if (localStorage["radio-waves"]) {
			try {
				game = new RadioWavesEngine(JSON.parse(atob(localStorage["radio-waves"])), abilityTypes, abilityCards, encounterCards)
				game.gameOver = () => {
					console.log("calling gameover");
					this.setState({menuState: "main-menu"});
				}
				this.forceUpdate();
			} finally {}
		}
	}
	render() {
		if (game.gameState !== "not-started") {
			// <h1>Cards in your deck:</h1>
			// <CardList cards={game.deck}></CardList>

			return (
				<div className="game overlay-bg">
					<div className="encounter">
						<div className="info-bar">
							<div>{`${game.encountersCompleted}`}</div>
						</div>
						<Encounter continue={() => {
							game.continue();
							this.forceUpdate();
						}} gameState={game.gameState} encounterCard={game.currentEncounter}></Encounter>
					</div>
					<div className="player-cards-area">
						<div>
							<h1>{`Library: ${game.deck.length}`}</h1>
						</div>
						<CardList cards={game.hand} actionWhenClicked={(cardID) => {
							if (game.gameState == "waiting-for-player") {
								game.playCardFromHandIntoCurrentEncounter(cardID);
							} else {
								game.continue();
							}
							this.forceUpdate();
						}}></CardList>
						<div>
							<h1>{`Discard pile: ${game.discardPile.length}`}</h1>
						</div>
					</div>
				</div>
			);
			// <h1>Cards in your discard pile:</h1>
			// <CardList cards={game.discardPile}></CardList>
		} else {
			const backButton = <button onClick={() => {
				this.setState({menuState: "main-menu"});
			}}>back to main menu</button>

			switch (this.state.menuState) {
				case "main-menu":
					return (
						<div className="main-menu">
							<h1 className="logo">KWAV 108.5</h1>
							<div className="main-menu-buttons">
								<button onClick={() => {
									game.resetDeckbuilding();
									this.setState({menuState: "deckbuilding"});
								}}>New Game</button>
								<button onClick={() => {
									game.resetDeckbuilding();
									this.setState({menuState: "record-store"});
								}}>Record Store</button>
								<button onClick={() => {
									this.setState({menuState: "import-game"});
								}}>Import Game</button>
								<button onClick={() => {
									this.setState({menuState: "export-game"});
								}}>Export Game</button>
								<button onClick={() => {
									this.setState({menuState: "credits"});
								}}>Credits</button>
							</div>
						</div>
					);
				case "deckbuilding":
					return (
						<div className="overlay-bg">
							{backButton}
							<Deckbuilder game={game} playerWorkingLibrary={game.workingLibrary} playerDeck={game.deck} addCardFromWorkingLibraryToDeck={(cardID) => {
								game.addCardFromWorkingLibraryToDeck(cardID);
								this.forceUpdate();
							}} putCardBackFromDeckToWorkingLibrary={(cardID) => {
								game.putCardBackFromDeckToWorkingLibrary(cardID);
								this.forceUpdate();
							}} startGame={() => {
								game.startGame();
								this.forceUpdate();
							}} maxCardsAllowed={game.maxCardsInDeck}></Deckbuilder>
						</div>
					);
				case "record-store":
					return (
						<div className="overlay-bg">
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<Store playerWorkingLibrary={game.workingLibrary} store={game.store} addCardFromWorkingLibraryToStore={(cardID) => {
								game.addCardFromWorkingLibraryToStore(cardID);
								this.forceUpdate()
							}} putCardBackFromStoreToWorkingLibrary={(cardID) => {
								game.putCardBackFromStoreToWorkingLibrary(cardID);
								this.forceUpdate()
							}} transmuteStoreCards={() => {
								game.transmuteStoreCards();
								this.forceUpdate();
							}}></Store>
						</div>
					);
				case "import-game":
					return (
						<div className="overlay-bg">
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<h1>
								import game
							</h1>
							<ImportGame importGame={(gameString) => {
								game = new RadioWavesEngine(JSON.parse(atob(gameString)), abilityTypes, abilityCards, encounterCards);
								game.gameOver = () => {
									this.setState({menuState: "main-menu"});
								}
								game.saveGame();
								this.forceUpdate();
							}}></ImportGame>
						</div>
					);
				case "export-game":
					return (
						<div className="overlay-bg">
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<h1>
								export game
							</h1>
							<p>
								{`To take your game to another computer, just copy and paste this code in the "import game" section:`}
							</p>
							<p>{localStorage["radio-waves"]}</p>
						</div>
					);
				case "credits":
					return (
						<div className="overlay-bg">
							<button onClick={() => {
								this.setState({menuState: "main-menu"});
							}}>back to main menu</button>
							<h1>
								Bananacat + Kasey + Josh + Ken!
							</h1>
						</div>
					);
				default:
					return (
						<div>{`¯\\_(ツ)_/¯`}</div>
					)
			}

		}
	}
}

export default App;
