import React,{ useState, useEffect,useCallback,useContext } from "react"
import { Button,Comment, Segment } from "semantic-ui-react"
import {  withRouter } from "react-router-dom"
import Answer  from "./Answer"
import {Store} from "../../store"

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
    addAnswerListener()
    console.log(answers)
  },[])

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
    const db =  await firebase.firestore()
    const snap = await db.collection("topics").doc(props.location.state.topicInfo.id).collection("answers").get()
    await snap.forEach((doc) => {
      console.log(doc)
      loadedAnswers.push(
        { id: `${doc.id}`, answer: `${doc.data().answer}`, user: `${doc.data().createdUser}` }
      )
    })
    addAnswer(loadedAnswers)
  }

  const handleChange = useCallback((e) => setAnswer(e.target.value))

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setAnswerId(answer => answer + 1)
    addAnswer([...answers,{ id : answerId, content : answer }])
    saveAnswer()
    setAnswer("")
  })

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
          <Button  style={{marginBottm:100}}  type="submit" value="Submit" onSubmit={handleSubmit}>Submit</Button>
      </form>

      {displayAnswer(answers)}

    </Segment>
  )
}

export default withRouter(TopicContent);