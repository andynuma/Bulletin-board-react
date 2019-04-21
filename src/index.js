import React,{ useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,Switch, Route, withRouter } from "react-router-dom"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import 'semantic-ui-css/semantic.min.css'
import firebase from "firebase"

// reducer
import { Provider, Store } from "./store"


const Root = (props) => {

  // const {state, dispatch} = useContext(Store)

  useEffect(() => {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        console.log(user)
        props.history.push("/")
        // dispatch({type:"SET_USER", payload:user})
        // console.log(state)
      } else {
        // dispatch({type:"CLEAR_USER"})
        console.log("not login")
      }
    })
  })

  return (
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
  )
}

const RootWithAuth = withRouter(Root)


ReactDOM.render(
  <Provider>
    <Router>
      <RootWithAuth/>
    </Router>
  </Provider>
,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
