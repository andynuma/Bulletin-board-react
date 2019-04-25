import React,{ useState,useEffect, useCallback,useContext } from "react"
import { Button,Comment, Segment } from "semantic-ui-react"
import {  withRouter } from "react-router-dom"
import Answer  from "./Answer"
import {Store} from "../../store"

// propsにはtopicの情報が入っている（としている）
const TopicContent = (info,props) => {

  const [answer, setAnswer] = useState("")
  const [answerId, setAnswerId] = useState(1)
  const [answers, addAnswer] = useState([])

  const { state } = useContext(Store)


  useEffect(() => {
    console.log("Mounted")
    console.log(props)
    console.log(props.match.params.id)
  },[])

  const displayAnswer = (answerArray =>
    answerArray.map( ans => (
      <Answer
        key={ans.id}
        answer={ans.content}
        user={state.currentUser}
      />
    ))
  )


  const handleChange = useCallback((e) => setAnswer(e.target.value))

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setAnswerId(answer => answer + 1)
    addAnswer([...answers,{ id : answerId, content : answer }])
    setAnswer("")
  })

  return(
    <Segment>
      <Comment>
        Title : {props.title}
      </Comment>
      <Comment>
        UserName : {state.currentUser.displayName}
      </Comment>
      <Comment>
        Discription : {props.discription}
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