import React,{useState,useContext,useEffect} from "react"
import firebase from "../../firebase"
import { Store } from "../../store"
import {Image, Segment } from "semantic-ui-react"
import Spinner from "../../Spinner";

const UserPanel = (props) => {

  const {state} = useContext(Store)

  const handleClick = async() => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("signed out"))
  }

  return(
    (state.currentUser.displayName === null || state.currentUser.photoURL === null) ? <Spinner/>:
    <Segment.Group>
      <Segment>
          <Image src={state.currentUser.photoURL} avatar/>
          {state.currentUser.displayName}
        <button onClick={handleClick} style={{marginLeft:10}}>Sign Out</button>
      </Segment>
    </Segment.Group>
  )
}

export default UserPanel;