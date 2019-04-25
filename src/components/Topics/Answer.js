import React from "react"
import {Message,Button,Segment} from "semantic-ui-react"

const Answer = ({ answer, user }) => {

  const handleClick = () => sendEth()

  const sendEth = () => {
    //TODO:ここにweb3呼び出し
    console.log("Send 1 ETH")
  }

  return(
    <Segment>
      user : {user.displayName}
      <Message>
        {answer}
      </Message>
      <Button onClick={handleClick}>
        Send
      </Button>
    </Segment>
  )
}

export default Answer;