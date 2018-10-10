import React from 'react';
import { Link, Route } from 'react-router-dom';

import Profile from './Forms/Well/Profile';
import Visit from './Forms/Well/Visit';
import Home from './Home';
import Violation from './Forms/Well/Violation';



export class Form extends React.Component{
    constructor(props){
    super(props);
}
    render(){
        return (
            <div>
            <ul>
             <li><Link to="/Home">Home</Link></li>
             
             <li><Link to="/Profile">Profile</Link></li>
            <li><Link to="/Visit">Visit </Link></li>
           <li><Link to="/Violation">Violation</Link></li>
          </ul>
          <Route path="/Home" component={Home}/>
          
          <Route path="/Profile" component={Profile}/>
          <Route path="/Visit" component={Visit} />
          
          <Route path="/Violation" component={Violation}/>
          </div>
        // <div className='form'>
           
        //     {/* <ItemForm/> */}
        //     <br/>
        //     <Visit  />
        //     </div>
            
          
          )
    }
}
