import React from 'react';
import '../welcome.css';

export default class Welcome extends React.Component{
    //hello
    render(){
        return(
        <div className='welcome'>
            <h1 className='title'>Discover your mood.</h1>
            <p className='sub-heading-text'>Discover what songs make you feel like dancing, happy</p>
            <h2 classname='about-me'>My name is Hugo</h2>
        </div>
        )
    }
}