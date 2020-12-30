import React from 'react';
import axios from 'axios';


class SecondPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name:'',
            email:'',
            pass:''            
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    successfulAuth(data){
        this.props.handleLogin(data);
        // console.log(data+' DATA')
        this.props.history.push("/");
    } 

    handleChange(event){
        console.log('Handle change',event)
        this.setState({
            [event.target.name]:event.target.value})
    }

    handleSubmit(event){
        this.sendReg();
        event.preventDefault();
    }

    sendReg(){
        axios.post('https://backend-app-jk.herokuapp.com/api/user/register',{
            email:this.state.email,
            password:this.state.pass,
            name:'Nameee'
        },{withCredentials:true})
        .then(response =>{
            if(response.data.message==='registered'){
            this.successfulAuth(response.data.user);
            console.log(response.data)
            }
            else {
            console.log(response)}
        })
        .catch(error =>{
            console.log(error);
        })
    }

    render(){
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                name="email" 
                placeholder="Email" 
                value={this.state.email} 
                onChange={this.handleChange} 
                required />
                
                <input type="password" 
                name="pass" 
                placeholder="Password" 
                value={this.state.pass} 
                onChange={this.handleChange} 
                required />

                <button type="submit">Register</button>
            </form>
        <label>{this.props.loogedInStatus}</label>
        </div>)
    }
}

export default SecondPage;