import React,{ useState, useEffect,useCallback,useContext } from "react"
import { Button,Comment, Segment } from "semantic-ui-react"
import {  withRouter } from "react-router-dom"
import Answer from "./Answer"
import { Store } from "../../store"
import md5 from "md5"

import firebase from "../../firebase"

const TopicContent = (props) => {

  const [answer, setAnswer] = useState("")
  // const [answerId, setAnswerId] = useState(1)
  const [answers, addAnswer] = useState([])

  const { state } = useContext(Store)

  const displayAnswer = (answerArray) =>(
    answerArray.map( ans => (
      <Answer
        key={ans.id}
        answer={ans}
        user={ans.user}
      />
    ))
  )

  useEffect(
    () => {
        addAnswerListener()
        console.log("useEffect:",answer)
        console.log(props.location.state.topicInfo)
        console.log(Date.now())
    },[])

  const saveAnswer = async() => {
    const db =  await firebase.firestore()
    try{
      const timestamp = Date.now()
      const res = await db.collection("topics").doc(props.location.state.topicInfo.id).collection("answers").doc(md5(answer)).set({
        id: md5(answer),
        answer:answer,
        createdUser: state.currentUser.displayName,
        createdAt:timestamp
      })
      console.log(res)
    } catch (error){
      console.log(error)
    }
  }

  const addAnswerListener = async() => {
    let loadedAnswers = []
    if(props.location.state.topicInfo.id !== undefined){
      const db =  await firebase.firestore()
      const snap = await db.collection("topics").doc(props.location.state.topicInfo.id).collection("answers").orderBy("createdAt").get()
      await snap.forEach((doc) => {
        loadedAnswers.push(
          { id: `${doc.id}`, answer: `${doc.data().answer}`, user: `${doc.data().createdUser}` , createdAt: `${doc.data().createdAt}`}
        )
      })
      addAnswer(loadedAnswers)
      console.log(loadedAnswers)
    }
  }

  const handleChange = useCallback((e) => setAnswer(e.target.value),[])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if(answer !== ""){
      // setAnswerId(answerId => answerId + 1)
      addAnswer([...answers,{ id:md5(answer) ,answer : answer, user:state.currentUser.displayName }])
      console.log("submit",answer)
      console.log(answers)
      saveAnswer()
      setAnswer("")
    }
  })


  return(
    <div>
      <Comment>
        Title : {props.location.state.topicInfo.title}
      </Comment>
      <Comment>
        UserName : {props.location.state.topicInfo.createdUser}
      </Comment>
      <Comment>
        Discription : {props.location.state.topicInfo.discription}
      </Comment>
      <form onSubmit={handleSubmit}>
          <textarea type="text" value={answer} name="answer" onChange={handleChange} placeholder="Write your answer"/>
          <Button  style={{marginBottm:100}} onSubmit={handleSubmit}>Submit</Button>
      </form>

      {displayAnswer(answers)}

    </div>
  )
}

export default withRouter(TopicContent);