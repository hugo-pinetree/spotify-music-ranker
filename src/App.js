import React from 'react';
import Sidebar from './Components/Sidebar';
import Welcome from './Components/Welcome';
import Collection from './Components/Collection';
import * as $ from "jquery";
import {client_id, redirect_uri, auth_endpoint, scopes} from './config.js';
import hash from './hash.js';
//import collection from './vars.js';
//import rightside from './rightside-img.jpg';
import './index.css';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          tracks: [],
          features: [],
          token: null
        };
      }
      componentDidMount(){
        let _token = hash.hash_key;

        if(_token){
            this.setState({
                token: _token
            });
            this.getTopTracks();
            this.getFeatures();
        }
      }
    getTopTracks(){
        let copied_tracks;
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=short_term',
            
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            },
            success: function(response) {
                copied_tracks = response.items.slice(0);
                this.setState({
                    tracks: copied_tracks
                })
            }
        });
    }
    
    
    getFeatures(){
        let ids = '';
        let i = 0;
        let collection;
        for(; i < 25;i++){
            ids = ids + this.state.tracks[i].id; 
            if(i !== 24)
                ids = ids + ',';
        }
        let endpoint = 'https://api.spotify.com/v1/audio-features?ids=' + ids;
        $.ajax({
            url: endpoint,
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            },
            success: function(response) {
                collection = response.items.slice(0);
                this.setState({
                    features: collection
                })
            }

        });
    }
    render(){
        return(
            <div >
            <Sidebar></Sidebar>
            <Welcome className='welcome'></Welcome>
            
            {!this.state.token && (
                <a
                    className='btn btn-outline-success btn-lg btn-login-link'
                    role='button'
                    href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes
                    }&response_type=token&show_dialog=true`}
                >
                    Spotify Log In
                </a>
                
          )}
          <Collection tracks_= {this.state.tracks}
                        features_ = {this.state.features}
                        className = 'collection'
            
            ></Collection>
          {this.state.token && (
            <Collection tracks_= {this.state.tracks}
                        features_ = {this.state.features}
                        className = 'collection'
            
            ></Collection>
           
          )}
           
            </div>
        );
    }
}
export default App;