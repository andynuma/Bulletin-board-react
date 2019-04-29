import React,{ useState,useContext, useEffect } from "react"
import { Store } from "../../store"
import { Segment,Comment } from "semantic-ui-react"
import { Link, withRouter} from "react-router-dom";

const Topic = ({ info }) => {

  const { state } = useContext(Store)

  return(
    <Segment>
        <Comment>
          Title : {info.title}
          {/* {info.id} */}
        </Comment>
        <Comment>
          UserName : {state.currentUser.displayName}
        </Comment>
        <Comment>
          Discription : {info.discription}
        </Comment>
        <br/>

        <Link
          to={{
            pathname:`/${info.id}`,
            state:{
              topicInfo:info
            } }}
          >
          Go topic page
        </Link>
    </Segment>
  )
}

export default withRouter(Topic);