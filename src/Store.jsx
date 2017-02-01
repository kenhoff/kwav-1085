import React from 'react'
import CardList from "./CardList.jsx";

class Store extends React.Component {
	render() {
		return (
			<div className="record-store kwav-section">
				<div>
					<h1>The record store</h1>
					<div>
						<h2>Your cards</h2>
					</div>
					<CardList cards={this.props.playerWorkingLibrary} actionWhenClicked={this.props.addCardFromWorkingLibraryToStore}></CardList>
				</div>
				<div>
					<p>Here, you can exchange 3 tracks for 1 higher rarity track.</p>
					<CardList cards={this.props.store} actionWhenClicked={this.props.putCardBackFromStoreToWorkingLibrary}></CardList>
					<button className="kwav-button" onClick={this.props.transmuteStoreCards}>Exchange</button>
				</div>
			</div>
		)
	}
}

export default Store;
