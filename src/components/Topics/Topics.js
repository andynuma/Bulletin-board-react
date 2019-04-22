import React,{ useState, useCallback,useContext,useEffect } from "react"
import Topic from "./Topic.js"
import Linkfy from "react-linkify"
import firebase from "firebase"
import { Store } from "../../store"


const Topics = () => {
  // const [id,setId] = useState(0)
  const [title, setTitle] = useState("")
  const [discription, setDiscription] = useState("")
  const [topics,addTopics] = useState([])

  const { state } = useContext(Store)

  useEffect(() => {
      addTopicListener()
  },[])

  const handleSubmit = (event) => {
    // setTopic(event.target.value)
    event.preventDefault()
    // setId(id => id + 1)
    if(title !=="" && discription !== ""){
      addTopics(
        [...topics,
          { title: title, discription: discription }
        ]
      )
    }
    setTitle("")
    setDiscription("")
    saveTopic()
    console.log(topics)
  }

  const saveTopic = async() => {
    const db =  await firebase.firestore()
    try{
      const res = await db.collection("topics").add({
        title:title,
        discription:discription,
        createdUser: state.currentUser.displayName
      })
      console.log(res.id)
    } catch (error){
      console.log(error)
    }
  }

  const addTopicListener = async() => {
    let loadedTopics = []
    const db =  await firebase.firestore()
    const snap = await db.collection("topics").get()
    await snap.forEach((doc) => {
      loadedTopics.push(
        { id: `${doc.data().id}`, title: `${doc.data().title}`, discription: `${doc.data().discription}` }
      )
    })
    addTopics(loadedTopics)
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
    <div style={{marginLeft:200}}>
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