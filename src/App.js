import React,{ useEffect } from 'react';
import "./App.css";
import Topics from "./components/Topics/Topics"
import SidePanel from "./components/SidePanel/SidePanel"
import { Grid } from "semantic-ui-react"


const App = () => {

  useEffect(() => {
    
  },[])

  return (
    <div>
      <Grid columns="equal" >
        {/* <Grid.Column> */}
          <SidePanel />
          <Topics style={{marginLeft:300}}/>
        {/* </Grid.Column> */}
      </Grid>
    </div>
  )
}

export default App;
