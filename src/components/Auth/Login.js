import React,{ useState, useCallback, useEffect } from "react"
import {Form, Segment, Grid, Header, Button,Message} from "semantic-ui-react"
import firebase from "../../firebase"
import {Link} from "react-router-dom"

const Login = () => {
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setError] = useState([])

  useEffect(() => {
    console.log("mounted")
    // console.log(db)
  })

  const handleMailChange = useCallback((e) => setMail(e.target.value))
  const handlePassWordChange = useCallback((e) => setPassword(e.target.value))


  const isFormValid = (mail, password) => mail && password


  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      if(isFormValid(mail, password)){
        const { user } = await firebase.auth().signInWithEmailAndPassword(mail, password)
        console.log(user)
        console.log("user logined")
      }
    } catch(error){
      console.log(error)
    }
  }

  return(
    <div>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth:450}}>
        <Header as="h1">
          Login
        </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input type="email" value={mail} onChange={handleMailChange} placeholder="email"/>
              <Form.Input type="password" value={password} onChange={handlePassWordChange} placeholder="password"/>
              <Button fluid>Submit</Button>
            </Segment>
          </Form>
          <Message>
            You Don't have Account ? <Link to="/register">Register</Link>
            </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Login;