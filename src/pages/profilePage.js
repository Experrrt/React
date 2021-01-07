import React, { useEffect, useState, useRef } from "react";
import  { Redirect } from 'react-router-dom'

function ProfilePage(props){
    
    
    return(
        <div>
        {props.loogedInStatus ==="NOT_LOGGED_IN"?(
            <div>
                 <Redirect to='./userpage'/>
                <h1>Log in to see profile</h1>
            </div>
        ):(
            <div>
            {props.user.name}
            </div>
        )
    }
    </div>
        )
}
export default ProfilePage;