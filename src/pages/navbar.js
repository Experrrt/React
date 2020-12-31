import React, {useState, useEffect} from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import'../css/navbar.css';
import Icon from '../svg/svg.js'
import {Link} from 'react-router-dom';

function Navbar(props){
    const[click, setClick]=useState(false)
    const handleClick = () => {
        setClick(!click);
        console.log(click)
    }
    
    window.addEventListener('resize', ()=>{
        setClick(false);
    })

    return (
       
        <nav className='navbar'>
          <div className ='logo'>
           <Link to='/'>
          <Icon/>
          </Link>
          </div>
             <ul className='nav-links'>
                 <li>
                 <Link to='/secondpage'className='link'>
                     Home
                     </Link>
                 </li>
                 <li>
                 <Link to='/secondpage'className='link'>
                     About
                 </Link>
                 </li>
                 <li>
                 <Link to='/secondpage'className='link'>
                     Work
                     </Link>
                 </li>
                 <li>
                 <Link to='/secondpage' className='link'>
                     {props.userName.name ||'Register'}
                     </Link>
                 </li>
             </ul>
            <div className='burger' onClick={handleClick}>
                <ul className={click? 'open' : 'close'}>
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
                </ul>
            </div>
          </nav>
        )

}
export default Navbar;