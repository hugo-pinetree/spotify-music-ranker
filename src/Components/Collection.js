import React from 'react';
import '../index.css';
//import collection from '../vars.js';
export default class Collection extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      category: null,
      tracks: this.props.tracks_,
      valence_tracks: null,
      original_tracks: this.props.tracks,
      danceability_tracks: null,
      energy_tracks: null
    }
  }
  handle_category_request(tracks, categ){
    if(categ === 'original' ){
      this.setState({
        category: categ,
        tracks: this.state.original_tracks
      });
    }
    else if(categ === 'valence' && this.state.valence_tracks){
      this.setState({
        category: categ,
        tracks: this.state.valence_tracks
      });
    }
    else if(categ === 'danceability' && this.state.danceability_tracks){
      console.log(this.state.danceability_tracks);
      this.setState({
        category: categ,
        tracks: this.state.danceability_tracks
        
      });
    }
    else if(categ === 'energy' && this.state.energy_tracks){
      this.setState({
        category: categ,
        tracks: this.state.energy_tracks
      });
    }
    else{

    let updated_tracks = [];
    let dict = {};
    let features = this.props.features_.slice();
    
    this.heapsort(features,features.length,categ);

    for(let i=0;i<25;i++){
      
      dict[this.state.tracks[i].id] = this.state.tracks[i];
    }
    for(let j=0;j<25;j++){
      updated_tracks.push(dict[features[j].id]);
    }
    if(categ === 'valence'){
    this.setState({
      category: categ,
      tracks: updated_tracks,
      valence_tracks: updated_tracks

    });
  }
  else if(categ === 'danceability'){
    this.setState({
      category: categ,
      tracks: updated_tracks,
      danceability_tracks: updated_tracks

    });
  }
    else if(categ === 'energy'){
      this.setState({
        category: categ,
        tracks: updated_tracks,
        energy_tracks: updated_tracks
  
      });

  }
  else if(categ === 'original'){
  this.setState({
    category: categ,
    tracks: updated_tracks,
    original_tracks: tracks

  });
}
    }
  }
  heapsort(arr, n, categ){   
    for(var i = Math.floor(n / 2 - 1); i >= 0; i--){
        this.heapify(arr, n, i, categ);  
    }
    for(var y = n-1; y>=0; y--){
        this.swap(arr, 0, y);
        this.heapify(arr, y, 0, categ);
    }
    return arr;
}
swap(arr, x, y ){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
heapify(arr,n,i, categ){
    let smallest = i;
    let l = 2*i + 1;
    let r = 2*i + 2;
    
      if (l < n && arr[l][categ] < arr[smallest][categ])
        smallest = l;
      if(r < n && arr[r][categ]< arr[smallest][categ])
        smallest = r;
      if(smallest !== i){
        this.swap(arr, smallest, i);
        this.heapify(arr, n, smallest,categ);
      }
}
handleClick(categ){
  this.handle_category_request(this.state.tracks,categ);
}
    render(){
    
        return(
          <div>
            <h1 className='title2'>Discover your mood.</h1>
            <div className="btn-group toolbar" role="group" aria-label="Basic example">
              <button onClick={()=> this.handleClick('valence')} type="button" className={this.state.category==='valence'? "btn btn-warning":"btn btn-outline-warning"} data-toggle="button">valence</button>
              <button onClick={()=> this.handleClick('danceability')} type="button" className={this.state.category==='danceability'? "btn btn-warning":"btn btn-outline-warning"}>danceability</button>
              <button onClick={()=> this.handleClick('energy')} type="button" className={this.state.category==='energy'? "btn btn-warning":"btn btn-outline-warning"}>energy</button>
              
            </div>

            <table className="text-white tb">
    
            <tbody >
           
              <tr >
                <th  scope="row">1</th>
                <td>
                 
                    <img className='float-left ml-2 ' src={this.state.tracks[0].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[0].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[0].artists[0].name} </p>
                    </div>
                   
                  
                </td>
            
              </tr>
              <tr>
                <th  scope="row">2</th>
                
                    <img className='float-left ml-2' src={this.state.tracks[1].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[1].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[1].artists[0].name} </p>
                    </div>
                 
              </tr>
              <tr>
                <th scope="row">3</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[2].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[2].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[2].artists[0].name} </p>
                    </div>
                 </div>
              </tr>
              <tr>
                <th scope="row">4</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[3].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[3].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[3].artists[0].name} </p>
                    </div>
                 </div>
              </tr>
              <tr>
                <th scope="row">5</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[4].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[4].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[4].artists[0].name} </p>
                    </div>
                 </div>
              </tr>
              <tr>
                <th scope="row">6</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[5].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[5].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[5].artists[0].name} </p>
                    </div>
                 </div>
              </tr>

              <tr>
                <th scope="row">7</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[6].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[6].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[6].artists[0].name} </p>
                    </div>
                 </div>
              </tr>

              <tr>
                <th scope="row">8</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[7].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[7].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[7].artists[0].name} </p>
                    </div>
                 </div>
              </tr>

              <tr>
                <th scope="row">9</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[8].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[8].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[8].artists[0].name} </p>
                    </div>
                 </div>
              </tr>

              <tr>
                <th scope="row">10</th>
                <div>
                    <img className='float-left ml-2' src={this.state.tracks[9].album.images[2].url} alt='' /> 
                    <div className='float-left ml-4 pt-2'>
                      <h6 ><strong>{this.state.tracks[9].name}</strong></h6>
                      <p className='artist-text '>{this.state.tracks[9].artists[0].name} </p>
                    </div>
                 </div>
              </tr>
              
            </tbody>
          </table>
          </div>
        )
    }
}