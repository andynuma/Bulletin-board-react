import React,{ useState, useCallback } from "react"
import Topic from "./Topic.js"
import Linkfy from "react-linkify"

const Topics = () => {
  const [id,setId] = useState(0)
  const [title, setTitle] = useState("")
  const [discription, setDiscription] = useState("")
  const [topics,addTopics] = useState([])

  const handleSubmit = (event) => {
    // setTopic(event.target.value)
    event.preventDefault()
    setId(id => id + 1)
    if(title !=="" && discription !== ""){
      addTopics(
        [...topics,
          { id: id, title: title, discription: discription }
        ]
      )
    }
    setTitle("")
    setDiscription("")
    console.log(topics)
  }

  const onTitleChange = useCallback((e) => setTitle(e.target.value),[])
  const onDiscriptionChange = useCallback((e) => setDiscription(e.target.value),[])

  const displayTopics = (topicsArray) => (
    topicsArray.map(topicInfo => (
      <Topic
        key={topicInfo.id}
        title={topicInfo.title}
        discription={topicInfo.discription}
      />
    ))
  )

  return(
    <div>
      <form onSubmit={handleSubmit} className="topic_form">
      Topics
      <ul>
        <li>
          <label>Title : </label>
          <input type="text" value={title}  name="title" onChange={onTitleChange} placeholder="Topic Name"/>
        </li>
        <li>
          <label>Discription : </label>
          <textarea type="text" value={discription}  onChange={onDiscriptionChange} placeholder="Topic discription"/>
        </li>
        <li>
          <input type="submit" value="Submit"/>
        </li>
      </ul>
      </form>
      {/* //TODO:ページ遷移をさせる */}
      {displayTopics(topics)}
    </div>
  )
}

export default Topics;