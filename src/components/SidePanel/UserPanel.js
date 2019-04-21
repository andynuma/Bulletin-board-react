import React from "react"
import firebase from "../../firebase"

const UserPanel = () => {
  const handleClick = async() => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("signed out"))
  }

  return(
    <div>
      UserPanel
      <button onClick={handleClick} >Sign Out</button>
    </div>
  )
}

export default UserPanel;