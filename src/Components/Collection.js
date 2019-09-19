import React from 'react';
import '../index.css';
//import collection from '../vars.js';
export default class Collection extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      category: 'valence',
      tracks: this.props.tracks_,
      features: this.props.features_ //can we set this to the prop instead

    }
  }
  
  heapsort(arr, n, categ_num, categ){   
    for(var i = n / 2 - 1; i >= 0; i--){
        this.heapify(arr, n, i, categ_num, categ);  
    }
    for(var y = n-1; y>=0; y--){
        this.swap(arr, 0, y);
        this.heapify(arr, y, 0, categ_num,categ);
    }
}
swap(arr, x, y ){
    let temp = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
}
heapify(arr,n,i,categ_num, categ){
    let smallest = i;
    let l = 2*i + 1;
    let r = 2*i + 2;

    if (l < n && arr[l].audio_features[categ_num].categ < arr[smallest].audio_features[categ_num].categ)
        smallest = l;
    if(r < n && arr[r].audio_features[categ_num].categ < arr[smallest].audio_features[categ_num].categ)
        smallest = r;
    if(smallest !== i){
        this.swap(arr, smallest, i);
        this.heapify(arr, n, smallest,categ_num,categ);
    }
}
handleClick(i){
  
  
  this.setState({
    category: i
  })

}
    render(){
     
        return(
          <div>
            <div className="btn-group toolbar" role="group" aria-label="Basic example">
              <button onClick={()=> this.handleClick('valence')} type="button" className={this.state.category==='valence'? "btn btn-warning":"btn btn-outline-warning"} data-toggle="button">valence</button>
              <button onClick={()=> this.handleClick('danceability')} type="button" className={this.state.category==='danceability'? "btn btn-warning":"btn btn-outline-warning"}>danceability</button>
              <button onClick={()=> this.handleClick('energy')} type="button" className={this.state.category==='energy'? "btn btn-warning":"btn btn-outline-warning"}>energy</button>
              
            </div>

            <table class="table text-white tb">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Song</th>
                <th scope="col">Artist</th>
                <th scope="col">Visual</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td></td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td></td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              
            </tbody>
          </table>
          </div>
        )
    }
}