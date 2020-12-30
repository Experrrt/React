import React from 'react';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import StartPage from './pages/startpage';
import Nav from './pages/navbar';
import SecondPage from './pages/secondpage'
import Footer from './pages/footer';
import error from './pages/pagenotfound'


class App extends React.Component{
  constructor(){
    super();

    this.state={
      loogedInStatus: "NOT_LOGGED_IN",
      user:{}
    }
    this.handleLogin=this.handleLogin.bind(this);
  }

  handleLogin(data){
      this.setState({
        loogedInStatus:"LOGGED_IN",
        user:data
      })
  }

render(){
  return (
  <Router>
    <div className='container-main'>
        <Nav loogedInStatus = {this.state.loogedInStatus}/>
        <Switch>
          <Route path="/" exact render={props=>(<StartPage {...props} handleLogin={this.handleLogin} loogedInStatus={this.state.loogedInStatus} user={this.state.user}/>)}/>
          <Route path="/secondpage" exact render={props=>(<SecondPage {...props} handleLogin={this.handleLogin} loogedInStatus={this.state.loogedInStatus}/>)}/>
          <Route path ="/" component={error}/>
        </Switch>
        <Footer/>
    </div>
  </Router>
  )
}

}

export default App;