import React,{ useEffect } from "react"
import { Segment,Comment } from "semantic-ui-react"
import { Link, withRouter} from "react-router-dom";
import md5 from "md5"

const Topic = ({ info }) => {

  useEffect(() => {
    console.log(info)
    // console.log(md5(info.title))
  },[])

  return(
    <div className="topic">
      <Segment >
          <Comment>
            Title : {info.title}
          </Comment>
          <Comment>
            UserName : {info.createdUser}
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
    </div>
  )
}

export default withRouter(Topic);