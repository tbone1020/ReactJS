import React, { Component } from 'react';
import './profile.css';

export default class Profile extends Component {
	addCommasToNumber = num => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	}
  
	render(){
		let artist = {
			name: '',
			followers:{
				total:''
			},
			images:[{
				url:''
			}],
			genres:[]
		};

		artist = this.props.artist !== null ? this.props.artist : artist;

		return(
			<div className="profile-container">
				<div className="profile-img">
				     <img alt="Profile"
						src={ artist.images[0].url }/>
				</div>
				<div className="profile-info">
					<div className="profile-name">{artist.name}</div>
					<div className="profile-followers">{this.addCommasToNumber(artist.followers.total)} followers</div>
					<div className="profile-genres"><span>Genres: </span>	
						{artist.genres.map((genre,k) => {
							return (k !== artist.genres.length - 1) ? <span key={k}>{genre}, </span> : <span key={k}>& {genre}</span>
							// return artist.genres.length;
						})}
					</div>
				</div>
			</div>
		)
	}