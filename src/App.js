import React from 'react';
import Sidebar from './Components/Sidebar';
import Welcome from './Components/Welcome';
import './index.css';
class App extends React.Component{
    render(){
        return(
            <div >
            <Sidebar></Sidebar>
            <Welcome className='welcome'></Welcome>
            </div>
        );
    }
}
export default App;