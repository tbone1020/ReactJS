import React, { Component } from 'react';
import './app.css';
import { FormGroup,FormControl, InputGroup,Glyphicon } from 'react-bootstrap';
import Profile from './Profile/profile';
import Gallery from './Gallery/gallery';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			artist: null,
			tracks: [],
			message: '',
		}
	}

	search() {
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const ACCESS_TOKEN = '';
		const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
		let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
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
		 		if(artist !== undefined){
		 			// If artist was found
			 		this.setState(()=>{
			 			return {artist};
			 		});

			 		FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
					fetch(FETCH_URL,MY_OPTIONS)
						.then(response => response.json())
						.then(json => {
							const { tracks } = json;
							this.setState(()=>{
								return {tracks}
							});
						});

		 		} else {
		 			// If no artist was found
		 			this.setState((prevState, props)=>{
		 				return {message: "No Artists Found"}		
		 			})
		 		}
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
						: <div>{this.state.message}</div>
				}
			</div>
		)
	}
}
