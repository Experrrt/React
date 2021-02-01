// import React from "react";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
//   useHistory,
// } from "react-router-dom";
// import axios from "axios";

// import StartPage from "./pages/startpage";
// import Nav from "./pages/navbar";
// import UserPage from "./pages/reglogPage";
// import Footer from "./pages/footer";
// import error from "./pages/pagenotfound";
// import ProfilePage from "./pages/profilePage";
// import ProfileViewer from "./pages/profileViewer";
// import adress from "./scripts/apiAddress";
// import FriendPage from "./pages/friendPage";

// let Header;

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       loogedInStatus: "NOT_LOGGEN_IN",
//       userLoading: "YES",
//       user: {},
//     };
//     this.handleLogin = this.handleLogin.bind(this);
//     this.handleLogout = this.handleLogout.bind(this);
//     this.checkLoginStatu = this.checkLoginStatu.bind(this);
//   }

//   handleLogin(data) {
//     this.handleHeader();
//     this.checkLoginStatu();
//     // this.setState({
//     //   loogedInStatus: "LOGGED_IN",
//     //   user: data,
//     // });
//   }

//   handleLogout() {
//     localStorage.clear();
//     this.handleHeader();
//     this.checkLoginStatu();
//     // this.setState({
//     //   loogedInStatus: "NOT_LOGGED_IN",
//     //   user: {},
//     // });
//   }
//   async handleHeader() {
//     if (!localStorage.getItem("token")) {
//       axios.interceptors.request.eject(Header);
//     } else {
//       Header = axios.interceptors.request.use(
//         (config) => {
//           config.headers.authtoken = localStorage.getItem("token");
//           return config;
//         },
//         (err) => {
//           return Promise.reject(err);
//         }
//       );
//     }
//   }
//   async checkLoginStatu() {
//     console.log(localStorage.getItem("token"));
//     await axios
//       .get(adress + "api/user/auth/logged_in", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         console.log(response);
//         if (response.data.loggedIn) {
//           console.log("ano");
//           this.setState({
//             loogedInStatus: "LOGGED_IN",
//             user: response.data.user,
//             userLoading: "NO",
//           });
//           console.log("ano");
//         } else if (!response.data.loggedIn) {
//           this.setState({
//             loogedInStatus: "NOT_LOGGED_IN",
//             userLoading: "NO",
//             user: {},
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   async updateState() {
//     axios
//       .get("http://localhost:5001/api/user/auth/logged_in", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         this.setState({
//           user: response.data.user,
//         });
//       });
//   }
//   // componentWillMount() {
//   //   if (localStorage.getItem("token")) {
//   //     this.setState({
//   //       loogedInStatus: "LOGGED_IN",
//   //       userLoading: "YES",
//   //     });
//   //   }
//   // }

//   componentDidMount() {
//     console.log("NENI DOBRE");
//     this.handleHeader();
//     this.checkLoginStatu();
//   }

//   render() {
//     return (
//       <Router>
//         <div className="container-main">
//           <Nav
//             userName={this.state.user}
//             loggedIn={this.state.loogedInStatus}
//             handleLogout={this.handleLogout}
//           />
//           <Switch>
//             <Route
//               path="/"
//               exact
//               render={(props) => (
//                 <StartPage
//                   {...props}
//                   handleLogin={this.handleLogin}
//                   loogedInStatus={this.state.loogedInStatus}
//                   user={this.state.user}
//                 />
//               )}
//             />
//             <Route
//               path="/userpage"
//               exact
//               render={(props) => (
//                 <UserPage
//                   {...props}
//                   handleLogin={this.handleLogin}
//                   loogedInStatus={this.state.loogedInStatus}
//                   handleLogout={this.handleLogout}
//                 />
//               )}
//             />
//             <Route
//               path="/profile"
//               exact
//               render={(props) => (
//                 <ProfilePage
//                   {...props}
//                   loogedInStatus={this.state.loogedInStatus}
//                   user={this.state.user}
//                   checkLoginStatus={this.checkLoginStatu}
//                   userLoading={this.state.userLoading}
//                 />
//               )}
//             />
//             <Route
//               path="/profileFind/:id"
//               exact
//               render={(props) => (
//                 <ProfileViewer
//                   {...props}
//                   loogedInStatus={this.state.loogedInStatus}
//                   user={this.state.user}
//                   checkLoginStatus={this.checkLoginStatu}
//                 />
//               )}
//             />
//             {this.state.userLoading == "YES" ? (
//               <Route path="/friends" exact render={() => <div>"wait"</div>} />
//             ) : (
//               <Route
//                 path="/friends"
//                 exact
//                 render={(props) => (
//                   <FriendPage
//                     {...props}
//                     loogedInStatus={this.state.loogedInStatus}
//                     user={this.state.user}
//                     checkLoginStatus={this.checkLoginStatu}
//                     userLoading={this.state.userLoading}
//                   />
//                 )}
//               />
//             )}
//             <Route path="/" component={error} />
//           </Switch>
//           <Footer />
//         </div>
//       </Router>
//     );
//   }
// }

// export default App;
