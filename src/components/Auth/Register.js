import React,{ useState, useCallback, useContext} from "react"
import {Form, Segment, Grid, Header, Button} from "semantic-ui-react"
import firebase from "../../firebase"
import md5 from "md5"
import { Store } from "../../store"


const Register = () => {
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errors, setError] = useState([])

  const {dispatch, state } = useContext(Store)

  // useEffect(() => {
  //   console.log("mounted")
  //   // console.log(db)
  // },[])

  const handleNameChange = useCallback((e) => setName(e.target.value))
  const handleMailChange = useCallback((e) => setMail(e.target.value))
  const handlePassWordChange = useCallback((e) => setPassword(e.target.value))
  const handlePCChange = useCallback((e) => setPasswordConfirm(e.target.value))


  const isPasswordValid = (password, passwordConfirm) => {
    if(password.length < 6 || passwordConfirm.length < 6){
      return false;
    } else if (password !== passwordConfirm){
      return false;
    } else {
      return true;
    }
  }

  const isFormEmpty = (name,mail,password,passwordConfirm) => {
    return !name.length || !mail.length || !password.length || !passwordConfirm.length;
  }

  const isFormValid = () => {
    let error;
    if(isFormEmpty(name,mail,password,passwordConfirm)){
      error = "fill all fields"
      setError(errors.concat(error))
      return false
    } else if(!isPasswordValid(password,passwordConfirm)){
      error = "PassWord is not valid"
      setError(errors.concat(error))
      return false
    } else {
      return true
    }
  }

  const saveUser = (user) => {
    const db = firebase.firestore()
    console.log(user)
    db.collection("users").doc(name).set({
      name : user.displayName,
      avator: user.photoURL
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      if(isFormValid()){
        const { user } = await firebase.auth().createUserWithEmailAndPassword(mail, password)
        await user.updateProfile({
          displayName : name,
          photoURL: `http://gravatar.com/avatar/${md5(mail)}?d=identicon`
        })
        await saveUser(user)
        dispatch({type:"SET_USER", payload:user })
        console.log("user saved")
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
          Register
        </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input type="text" value={name} onChange={handleNameChange} placeholder="name"/>
              <Form.Input type="email" value={mail} onChange={handleMailChange} placeholder="email"/>
              <Form.Input type="password" value={password} onChange={handlePassWordChange} placeholder="password"/>
              <Form.Input type="password" value={passwordConfirm} onChange={handlePCChange} placeholder="password Confirm"/>
              <Button fluid>Submit</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Register;