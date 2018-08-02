import React, { Component } from 'react';
import './app.css';
import { FormGroup,FormControl, InputGroup,Glyphicon } from 'react-bootstrap';
import Profile from './Profile/profile';
import Gallery from './Gallery/gallery';

// Client ID: ad47915dc6ed4dfd910f12df20df79e2
// Secret: 2131f21c294c4016acdbc709d2ed9e94

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			artist: null,
			tracks: []
		}
	}

	search() {
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const ACCESS_TOKEN = 'BQD_Pi4IiqFNEwlyMIjoRJ5T3Y60CDcfX_23-A04KqlRGrymJrlKmFqjEvK0u4bVrU0hWGLMkVr5s3R61Q6XkThTolh_dLlBVqECavtPpKG0j0OSlt8DK4wqWJaGD8wqERfCMk6KySmQ1KYZMmOlub7NF4di7gW0k_9Twn0fx6YrXWYE9hdZkQ';
		const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
		let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
		// const MYHEADERS = new Headers();
		const MY_OPTIONS = {
	      	method: 'GET',
	      	headers:  {
	        		'Authorization': 'Bearer ' + ACCESS_TOKEN
	     	},
	     	mode: 'cors',
	     	cache: 'default'
	     };
		fetch(FETCH_URL, MY_OPTIONS)
		 	.then(response => response.json())
		 	.then(json => {
		 		let artist = json.artists.items[0];
		 		this.setState({artist})

		 		FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
				fetch(FETCH_URL,MY_OPTIONS)
					.then(response => response.json())
					.then(json => {
						const { tracks } = json;
						this.setState({tracks})
					})
		 	});
	}

	render() {
		return(
			<div className="app">
				<div className="App-title">Spotify Music Player</div>
				<FormGroup>
					<InputGroup>
						<FormControl 
							type="text" 
							placeholder="Search Artists..." 
							value = {this.state.query}
							onChange={event => {this.setState({query: event.target.value})}} 
							onKeyPress={event => {
								if(event.key === 'Enter'){
									this.search()
								}
							}}
						/>
						<InputGroup.Addon onClick={()=>this.search()}>
							<Glyphicon glyph="search"></Glyphicon>	
						</InputGroup.Addon>
					</InputGroup>
				</FormGroup>
				{
					this.state.artist !== null ? 
						<div className="main-container">
							<Profile artist={this.state.artist} />
							<Gallery tracks={this.state.tracks} />
						</div>
						: <div></div>
				}
			</div>
		)
	}
}

export default App;