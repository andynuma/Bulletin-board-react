import React from "react"
import UserPanel from "./UserPanel";
import {Header, Menu} from "semantic-ui-react"

const SidePanel = () => {
  return(
    <Menu
      fixed="left"
      vertical
      style={{fontsize:"1.2rem" }}
    >
      <Header as="h2">
        Tipping board
      </Header>
        <UserPanel/>
    </Menu>
  )
}

export default SidePanel;