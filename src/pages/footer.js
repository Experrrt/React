import'../css/footer.css';
import React, {Component} from 'react';
import axios from 'axios';

class Footer extends Component{
    constructor(props){
        super (props);
        this.sendEmail = this.sendEmail.bind(this);
        this.state = {
            email:'',
            name:'asdasdasd',
            password:'kosadla',
            ready:true,
            succes:''
        }
       
    }

    handleChange = e=>{
        this.setState({
            email : e.target.value
        })
    }

    sendEmail(){
       
        if(this.state.ready){
        
            axios.post('', {
                email : this.state.email,
                name :this.state.name,
                password:this.state.password
            })
        .then(res =>{
            console.log(res)
            // clearTimeout(timer)
            if(res.data =='inuse'){this.setState({succes:'Email sa uz pouziva'})}
            else if(res.data=='registered'){this.setState({succes:'Email bol zaregistrovany'})}
            else{this.setState({succes: res.data})}

        }).catch(err =>{ 
            })        
            this.setState({
                ready:false
            });    
            
        setTimeout(() => {
        this.setState({
            ready:true,
            succes: ''
            
        });    
    },5000);

    }}

    render(){
    return(
        <div className='footer'>
            <div className='heading a'>
                <h2>About</h2>
                <a href='#'>Zaco</a>
            </div>
            <div className='heading b'>
                <h2>Contact</h2>
                <a href='#'>Preco</a>
            </div>
            <div className='heading c'>
                <h2>Work</h2>
                <a href='#'>Aha</a>
            </div>
        <div className='footer-form'>
            <h2>Joing our newsletter</h2>
            <input type="email" placeholder="Enter your email" id="footer-email" onChange={this.handleChange}></input>
            <input type="submit" placeholder="Sign Up" id="footer-email-btn" onClick={this.sendEmail}></input>
            <p className='warning'>
                <small>{this.state.succes}</small> 
            </p>
        </div>
        </div>
    )
    }
}
export default Footer;