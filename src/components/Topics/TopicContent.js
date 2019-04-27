import React,{ useState, useEffect,useCallback,useContext } from "react"
import { Button,Comment, Segment } from "semantic-ui-react"
import {  withRouter } from "react-router-dom"
import Answer from "./Answer"
import { Store } from "../../store"

import firebase from "../../firebase"

const TopicContent = (props) => {

  const [answer, setAnswer] = useState("")
  const [answerId, setAnswerId] = useState(1)
  const [answers, addAnswer] = useState([])

  const { state } = useContext(Store)

  const displayAnswer = (answerArray =>
    answerArray.map( ans => (
      <Answer
        key={ans.id}
        answer={ans.answer}
        user={state.currentUser}
      />
    ))
  )

  useEffect(() => {
    // const db =  firebase.firestore()
    // if( db.collection("topics").doc(props.location.state.topicInfo.id).collection("answers") !== undefined){
      addAnswerListener()
    // }
    // console.log(db.collection("topics").doc(props.location.state.topicInfo.id).collection("answers"))
    return (() =>  {
      console.log("unmout")
      const db = firebase.firestore()
      const unsubscribe = db.collection("topics").onSnapshot(function () {});
      // ...
      // Stop listening to changes
      unsubscribe();
    })
  },[answers])

  const saveAnswer = async() => {
    const db =  await firebase.firestore()
    try{
      const res = await db.collection("topics").doc(props.location.state.topicInfo.id).collection("answers").add({
        answer:answer,
        createdUser: state.currentUser.displayName
      })
      console.log(res.id)
    } catch (error){
      console.log(error)
    }
  }

  const addAnswerListener = async() => {
    let loadedAnswers = []
    if(props.location.state.topicInfo.id !== undefined){
      const db =  await firebase.firestore()
      //TODO:props.location.state.topicInfo.idがundefinedになっているから、docの中が取れていない
      console.log(props.location.state.topicInfo.id)
      // console.log(db.collection("topics").doc(props.location.state.topicInfo.id))
      const snap = await db.collection("topics").doc(props.location.state.topicInfo.id).collection("answers").get()
      // console.log("snap",snap)
      await snap.forEach((doc) => {
        loadedAnswers.push(
          { id: `${doc.id}`, answer: `${doc.data().answer}`, user: `${doc.data().createdUser}` }
        )
      })
      addAnswer(loadedAnswers)
    }
  }

  const handleChange = useCallback((e) => setAnswer(e.target.value),[])

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(answer !== ""){
      await setAnswerId(answerId => answerId + 1)
      await addAnswer([...answers,{ id : answerId, content : answer }])
      console.log(answer)
      console.log(answers)
      await saveAnswer()
      await setAnswer("")
    }
  }
  // const handleSubmit = useCallback((e) => {
  //   e.preventDefault()
  //   setAnswerId(answer => answer + 1)
  //   addAnswer([...answers,{ id : answerId, content : answer }])
  //   saveAnswer()
  //   setAnswer("")
  // })
  
  return(
    <Segment>
      <Comment>
        Title : {props.location.state.topicInfo.title}
      </Comment>
      <Comment>
        UserName : {state.currentUser.displayName}
      </Comment>
      <Comment>
        Discription : {props.location.state.topicInfo.discription}
      </Comment>
      <form onSubmit={handleSubmit}>
          <textarea type="text" value={answer} name="answer" onChange={handleChange} placeholder="Write your answer"/>
          <Button  style={{marginBottm:100}} onSubmit={handleSubmit}>Submit</Button>
      </form>

      {displayAnswer(answers)}

    </Segment>
  )
}

export default withRouter(TopicContent);