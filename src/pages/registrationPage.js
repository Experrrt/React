import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function ReagistratioPage(props){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [message,setMessage]=useState("")
    const [loading,setLoading]=useState(false)
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (message === "") return;
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    
        timeoutRef.current = setTimeout(() => {
          setMessage("");
          timeoutRef.current = null;
        }, 5000);
      }, [message]);

    const handleSubmit=(e)=>{
        if(loading)return;
        sendReg();
        e.preventDefault();
    }

     function sendReg(){
         //https://backend-app-jk.herokuapp.com/api/user/register
        setLoading(true)
        setMessage("")

        axios
          .post(
            "https://backend-app-jk.herokuapp.com/api/user/register",
            {
              email: email,
              password: pass,
              name: name,
            },
            { withCredentials: true }
          )
          .then((response) => {
            if (response.data.message === "registered") {
              localStorage.setItem("token", response.data.token);
              props.successfulAuth(response.data.user);
            } else {
                setLoading(false)
                setMessage(response.data.message)
                console.log(response);
            }
          })
          .catch((error) => console.log(error));
      }
    

    return(
        <div>
        <form autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={e=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="pass"
            placeholder="Password"
            value={pass}
            onChange={e=>setPass(e.target.value)}
            required
          />

          <button
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
        {loading ? <h6>Loading</h6> : <h6></h6>}
        <h6>{message}</h6>
      </div>
        )
}

export default ReagistratioPage;