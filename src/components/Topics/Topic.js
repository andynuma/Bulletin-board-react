import React,{ useContext,useEffect } from "react"
import { Store } from "../../store"
import { Segment,Comment } from "semantic-ui-react"
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import TopicContent from "./TopicContent"

const Topic = ({ title, discription,info }, props) => {

  const { state } = useContext(Store)

  useEffect(()  => {
    // console.log(props.history)
    // console.log(info)
  },[])

  const handleClick = () => {
    console.log(`${info.id}`)  //firebase側のid
    props.history.push(`/topics/${info.id}`)
    console.log(props.history)
  }

  return(
    <Segment>
        <Comment>
          Title : {title}
        </Comment>
        <Comment>
          UserName : {state.currentUser.displayName}
        </Comment>
        <Comment>
          Discription : {discription}
        </Comment>
        <br/>

        <Link to={`/topics/${info.id}`} onClick={handleClick} >Go topic page</Link>
        <Route path={`/topics/:id`} render={info => <TopicContent info={info} />} />

        {/* <Link to={`/topics/${info.id}`} >Go topic page</Link> */}
        {/* <Route path="/>topics" component={Tocics}/> */}
        {/* <Route path={`/topics/:id`}  component={TopicContent} /> */}
    </Segment>
  )
}

export default Topic;