import React from 'react'
import CardList from "./CardList.jsx";

class Store extends React.Component {
	render() {
		return (
			<div>
				<h1>The record store</h1>
				<p>Here, you can exchange 3 tracks for 1 higher rarity track.</p>
				<h2>Your cards</h2>
				<CardList cards={this.props.playerWorkingLibrary} actionWhenClicked={this.props.addCardFromWorkingLibraryToStore}></CardList>
				<h2>the store:</h2>
				<CardList cards={this.props.store} actionWhenClicked={this.props.putCardBackFromStoreToWorkingLibrary}></CardList>
				<button onClick={this.props.transmuteStoreCards}>transmute!</button>
			</div>
		)
	}
}



export default Store;
