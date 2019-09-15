import React from 'react';
import Sidebar from './Components/Sidebar';
import Welcome from './Components/Welcome';
import Collection from './Components/Collection';
import * as $ from "jquery";
import {client_id, redirect_uri, auth_endpoint, scopes} from './config.js';
import hash from './hash.js';

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
        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=short_term',
            
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            },
            success: function(response) {
                this.setState({
                    tracks: response.items
                })
            }
        });
    }
    getFeatures(){
        let ids = '';
        let i = 0;
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
                this.setState({
                    features: response.items
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