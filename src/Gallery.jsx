import React, {PropTypes} from 'react'

class Gallery extends React.Component {
	render() {
		return (
			<div className="kwav-section">
				<h1>Gallery</h1>
				<p>{"All art and backgrounds by the exceedingly talented "}
					<a href="http://kaseykingdom.tumblr.com/">Kasey Corlett</a>!
				</p>
				<div className="gallery">
					<a href="/img/caller1.jpeg">
						<img src="/img/caller1.jpeg"></img>
					</a>
					<a href="/img/caller1_success.jpeg">
						<img src="/img/caller1_success.jpeg"></img>
					</a>
					<a href="/img/caller1_fail.jpeg">
						<img src="/img/caller1_fail.jpeg"></img>
					</a>
					<a href="/img/producer1.jpeg">
						<img src="/img/producer1.jpeg"></img>
					</a>
					<a href="/img/producer1_success.jpeg">
						<img src="/img/producer1_success.jpeg"></img>
					</a>
					<a href="/img/producer1_fail.jpeg">
						<img src="/img/producer1_fail.jpeg"></img>
					</a>
					<a href="/img/evening1.jpeg">
						<img src="/img/evening1.jpeg"></img>
					</a>
					<a href="/img/evening1_success.jpeg">
						<img src="/img/evening1_success.jpeg"></img>
					</a>
					<a href="/img/evening1_fail.jpeg">
						<img src="/img/evening1_fail.jpeg"></img>
					</a>
					<a href="/img/albums1.jpeg">
						<img src="/img/albums1.jpeg"></img>
					</a>
					<a href="/img/albums2.jpeg">
						<img src="/img/albums2.jpeg"></img>
					</a>
					<a href="/img/albums4.jpeg">
						<img src="/img/albums4.jpeg"></img>
					</a>
					<a href="/img/background.jpeg">
						<img src="/img/background.jpeg"></img>
					</a>
				</div>
			</div>
		)
	}
}

export default Gallery;
