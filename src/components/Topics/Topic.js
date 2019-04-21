import React,{ useState, useCallback } from "react"
import Answer from "./Answer"

// TODO:Discriptionの下にさらに回答的なものを追加できるようにすること
const Topic = ({ title, discription }) => {
  const [answer, setAnswer] = useState("")
  const [answers, addAnswer] = useState([])

  const displayAnswer = (answerArray =>
    answerArray.map( ans => (
      <Answer
        answer={ans}
      />
    ))
  )

  const handleChange = useCallback((e) => setAnswer(e.target.value))

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    addAnswer([...answers,answer])
    setAnswer("")
  })

  return(
    <div>
      <br/>
      Tile is {title}
      <br/>
      Discription : {discription}
      <br/>
      <form onSubmit={handleSubmit}>
        <textarea type="text" value={answer} name="answer" onChange={handleChange} placeholder="Write your answer"/>
        <button type="submit" value="Submit" onSubmit={handleSubmit}>Submit</button>
      </form>
      {displayAnswer(answers)}
    </div>
  )
}

export default Topic;