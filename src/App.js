import React from 'react';
import Sidebar from './Components/Sidebar';
import Welcome from './Components/Welcome';
import Collection from './Components/Collection';
import * as $ from "jquery";
import {client_id, redirect_uri, auth_endpoint, scopes} from './config.js';
import hash_key from './hash.js';
//import collection from './vars.js';
//import rightside from './rightside-img.jpg';
import './index.css';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          tracks: null,
          token: null,
          features: null,
          loaded_features: false
        };
        
      }
     


      
      componentDidMount(){
        let _token = hash_key.access_token;
        
        if(_token){
          
            this.setState({
                token: _token
            });
            this.getTracks(_token);
            
           
        }
      }
      
    getTracks(token_){
        let copied_tracks;
        $.ajax({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=short_term',
            
            headers: {
                'Authorization': 'Bearer ' + token_
            },
            success: (response)=> {
                copied_tracks = response.items.slice();
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
            method: 'GET',
            url: endpoint,
            headers: {
                'Authorization': 'Bearer ' + this.state.token
            },
            success: (response) => {
                collection = response.audio_features.slice(); 
                this.setState({
                   loaded_features:true,
                    features: collection
                });
            }
            

        });
    }
    render(){
        if(this.state.tracks && !this.state.loaded_features)
            this.getFeatures();
        return(
            <div >
                {this.state.tracks && (<Sidebar></Sidebar>)}
         
            {!this.state.token && (
                <div>
                    <Welcome className='welcome'></Welcome>
                    <a
                        className='btn btn-outline-success btn-lg btn-login-link'
                        role='button'
                        href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scopes
                        }&response_type=token&show_dialog=true`}
                    >
                        Log In
                    </a>
                </div>
                
          )}
          
          {(this.state.tracks && this.state.features) && (
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