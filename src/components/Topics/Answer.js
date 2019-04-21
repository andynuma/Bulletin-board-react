import React,{ useCallback} from "react"

const Answer = ({ answer }) => {

  const handleClick = () => sendEth()

  const sendEth = () => {
    console.log("Send 1 ETH")
  }

  return(
    <div>
      {answer}
      <button onClick={handleClick}>
        Send
      </button>
    </div>
  )
}

export default Answer;