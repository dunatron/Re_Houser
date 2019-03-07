import React from "react"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Signout from "../Signout/index"
import Avatar from "@material-ui/core/Avatar"
import Fab from "@material-ui/core/Fab"

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  sendRoute = route => {
    this.props.sendRoute(route)
  }

  render() {
    const { anchorEl } = this.state
    const { me } = this.props
    if (!me) return null
    const { id, firstName, lastName, email } = me

    return (
      <div>
        <Fab
          color="primary"
          aria-label="Add"
          onClick={this.handleClick}
          style={{ margin: 8 }}>
          {`${firstName.charAt(0)}${lastName.charAt(0)}`}
        </Fab>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}>
          {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem> */}
          <MenuItem onClick={() => this.sendRoute("/account")}>
            My account
          </MenuItem>
          <Signout fullWidth={true} label={`Logout`} />
        </Menu>
      </div>
    )
  }
}

export default SimpleMenu
