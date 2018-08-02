import React, { Component } from 'react';
import './gallery.css';

export default class Gallery extends Component {

	constructor(props){
		super(props)
		this.state = {
			playingUrl: '',
			audio: null,
			playing:false,

		};
	}

	changeButtonText(){

	}

	playAudio(previewUrl){
		let audio = new Audio(previewUrl);
		if(!this.state.playing) {
			audio.play();
			this.setState(()=>{
				return {
					playing:true,
					playingUrl: previewUrl,
					audio
				}
			})
		} else {
			if(this.state.playingUrl === previewUrl) {
				this.state.audio.pause();
				this.setState(()=>{
					return{
						playing:false
					}	
			} else {
				this.state.audio.pause();
				audio.play();
				this.setState(()=>{
					return {
						playing:true,
						playingUrl: previewUrl, 
						audio
					}
				})
			}
		}
	}
	render(){
		const { tracks } = this.props;
		return( 
			<div className="tracks-container">
				{tracks.map((track,k) => {
					const trackImg = track.album.images[0].url;
					return(
						<div 
							key={k} 
							className="track"
							onClick={() => this.playAudio(track.preview_url)}>

							<img src={ trackImg } className="track-img" alt="track"/>
							<div className="artist-info">
								<div className="track-text">{track.name}</div>
								<div className="additional-info"> 
									{ track.album.name }
								</div> 
								<div className="click-to-play">
									{
										this.state.playingUrl === track.preview_url
										? <span>Pause | |</span> 
										: <span>Play &#9654;</span>
									}	
								</div>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
}
