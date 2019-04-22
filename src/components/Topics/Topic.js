import React,{ useState, useCallback,useContext } from "react"
import Answer from "./Answer"
import {Store} from "../../store"
import { Segment, Button } from "semantic-ui-react"

const Topic = ({ title, discription }) => {
  const [answer, setAnswer] = useState("")
  const [answerId, setAnswerId] = useState(1)
  const [answers, addAnswer] = useState([])

  const { state } = useContext(Store)

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
    addAnswer([...answers,{ id:answerId, content:answer }])
    setAnswer("")
  })

  return(
    <Segment>
      <h4>
        Title : {title}
      </h4>
      <h4>
        UserName : {state.currentUser.displayName}
      </h4>
      <p>
        Discription : {discription}
      </p>
      <br/>
      <form onSubmit={handleSubmit}>
        <textarea type="text" value={answer} name="answer" onChange={handleChange} placeholder="Write your answer"/>
        <Button  style={{marginBottm:100}}  type="submit" value="Submit" onSubmit={handleSubmit}>Submit</Button>
      </form>
      {displayAnswer(answers)}
    </Segment>
  )
}

export default Topic;