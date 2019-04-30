import React,{useState,useContext,useEffect} from "react"
import firebase from "../../firebase"
import { Store } from "../../store"
import {Image, Segment } from "semantic-ui-react"

const UserPanel = (props) => {

  const {state} = useContext(Store)

  const [name,setName] = useState("")
  const [photoURL, setPhotoUrl] = useState("")

  useEffect(
    () =>  {
      // if(state.currentUser !== null){
        // console.log(state)
        // console.log(state.currentUser)
        console.log(state.currentUser.displayName)
        // console.log(state.currentUser.photoURL)
        // setName(state.currentUser.displayName)
        // setPhotoUrl(state.currentUser.photoURL)
      firebase.auth().onAuthStateChanged(user => {
        console.log("in userpanel",user)
        console.log("in userpanel",user.displayName)
        console.log("in userpanel",user.photoURL)
      })
      // }
      getUserData()
      return () => {
        // console.log("unmount")
      }
    },[])


  const getUserData = async() => {

      const db = await firebase.firestore()
      if(state.currentUser.displayName !== null) {
        const snap = await db.collection("users").doc(state.currentUser.displayName).get()
        console.log(snap)
        console.log(snap.id)
        console.log(snap.data())
        console.log(snap.data().name)
        console.log(snap.data().avator)
        if(snap.data().name !== null && snap.data().avator){
          const name = await snap.data().name
          const avator = await snap.data().avator
          setName(name)
          setPhotoUrl(avator)
        }
      }
      // const snap = await db.collection("users").doc(state.currentUser.uid).get()
      // snap.idがfirestoreのnameと一致し
      console.log(state.currentUser)
      // await snap.forEach((doc) =>  {
      //   console.log(doc.data())
      //   console.log(doc.data().name)
      //   console.log(doc.data().avatar)
    // })

    // firebase.auth().onAuthStateChanged(user => {
    //   console.log("in userpanel",user)
    //   console.log("in userpanel",user.displayName)
    //   console.log("in userpanel",user.photoURL)
    //   const name = user.displayName
    //   const avatar = user.displayName

    //   if(user.displayName !== null && user.photoURL !== null) {
    //     setName(user.displayName)
    //     setPhotoUrl(user.photoURL)
    //   }
    // })
  }


  const handleClick = async() => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("signed out"))
  }

  return(
    <Segment.Group>
      <Segment>
          <Image src={photoURL} avatar/>
          {name}
        <button onClick={handleClick} style={{marginLeft:10}}>Sign Out</button>
      </Segment>
    </Segment.Group>
  )
}

export default UserPanel;