import React,{useState,useContext,useEffect} from "react"
import firebase from "../../firebase"
import { Store } from "../../store"
import { Grid,Image } from "semantic-ui-react"

const UserPanel = (props) => {

  const {state} = useContext(Store)

  const [name,setName] = useState("")
  const [photoURL, setPhotoUrl] = useState("")

  useEffect(
    () =>  {
      if(state.currentUser !== null){
        console.log(state)
        console.log(state.currentUser)
        console.log(state.currentUser.displayName)
        console.log(state.currentUser.photoURL)
        setName(state.currentUser.displayName)
        setPhotoUrl(state.currentUser.photoURL)
      }
      return () => {
        console.log("unmount")
      }
    },[state.currentUser])

  const handleClick = async() => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("signed out"))
  }

  return(
    <Grid>
      <Grid.Column>
        <Image src={photoURL} avatar/>
           {name}
          <button onClick={handleClick}>Sign Out</button>
      </Grid.Column>
    </Grid>
  )
}

export default UserPanel;