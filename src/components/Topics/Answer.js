import React,{ useEffect } from "react"
import {Message,Button,Segment} from "semantic-ui-react"

const Answer = ({ answer, user }) => {

  const handleClick = () => sendEth()

  useEffect(() =>  {
    console.log(answer)
    // console.log(user)
    // console.log(ans.answer)
  },[])

  const sendEth = () => {
    //TODO:ここにweb3呼び出し
    console.log("Send 1 ETH")
  }

  return(
    <Segment>
      user : {user}
      <Message>
        {answer.answer}
      </Message>
      <Button onClick={handleClick}>
        Send
      </Button>
    </Segment>
  )
}

export default Answer;