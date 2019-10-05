import React from 'react';
import '../welcome.css';

export default class Welcome extends React.Component{
    //hello
    render(){
        return(
        <div className='welcome'>
            <h1 className='title'>Discover your mood.</h1>
            <p className='sub-heading-text'>We often listen to music because we feel a certain mood, and sometimes listening to music can evoke feelings in us. Sign in to discover which of your songs are the most danceable, energetic, and happy. This website pulls data about valence, energy and danceability of your most recent top 10 most listened-to songs. This website uses Spotify API to fetch data. </p>
        </div>
        )
    }
}