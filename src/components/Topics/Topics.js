import React,{ useState, useCallback,useContext,useEffect } from "react"
import Topic from "./Topic.js"
import firebase from "firebase"
import { Store } from "../../store"
import { Header } from "semantic-ui-react"
import { withRouter } from "react-router-dom";

const Topics = () => {
  const [title, setTitle] = useState("")
  const [discription, setDiscription] = useState("")
  const [topics,setTopics] = useState([])

  const { state } = useContext(Store)

  useEffect(() => {
      addTopicListener()
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    if(title !=="" && discription !== ""){
      setTopics(
        [...topics,
          { title: title, discription: discription }
        ]
      )
    }
    saveTopic()
    setTitle("")
    setDiscription("")
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
        { id: `${doc.id}`, title: `${doc.data().title}`, discription: `${doc.data().discription}` }
      )
      console.log(doc.id)
    })
    setTopics(loadedTopics)
  }

  const onTitleChange = useCallback((e) => setTitle(e.target.value),[])
  const onDiscriptionChange = useCallback((e) => setDiscription(e.target.value),[])

  const displayTopics = (topicsArray) => (
    topicsArray.map(topicInfo => (
        <Topic
          info={topicInfo}
          key={topicInfo.id}
          title={topicInfo.title}
          discription={topicInfo.discription}
        />
        )
  ))

  return(
    <div style={{marginLeft:200}}>
      <Header as="h2">
        Topics
      </Header>
      <form onSubmit={handleSubmit} className="topic_form">
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

      {displayTopics(topics)}
    </div>
  )
}

export default withRouter(Topics);