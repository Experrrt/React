import React from 'react';
import axios from 'axios';

//totototototototototo
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
        this.handleLogoutClick=this.handleLogoutClick.bind(this);
    }

    successfulAuth(data){
        this.props.handleLogin(data);
        // console.log(data+' DATA')
        this.props.history.push("/");
    } 

    handleLogoutClick(){
        axios.delete('http://localhost:5001/api/user/logout',{withCredentials:true})
        .then(response=>{
            this.props.handleLogout()
            this.props.history.push("/");
            console.log(response)
        }).catch(err=>{
            console.log(err);
        })

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
        //https://backend-app-jk.herokuapp.com/api/user/register
        axios.post('http://localhost:5001/api/user/register',{
            email:this.state.email,
            password:this.state.pass,
            name:this.state.name
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
                name="name" 
                placeholder="Name" 
                value={this.state.name} 
                onChange={this.handleChange} 
                required />

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
                <button onClick={()=>this.handleLogoutClick()}>Logout</button>
            </form>
        <label>{this.props.loogedInStatus}</label>
        </div>)
    }
}

export default SecondPage;