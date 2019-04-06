import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import SwipeableViews from "react-swipeable-views"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
// Forms
import Signup from "../Signup/index"
import Signin from "../Signin/index"
import RequestReset from "../RequestReset/index"
// icons
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import PersonIcon from "@material-ui/icons/Person"
import ResetIcon from "@material-ui/icons/Build"

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: `16px 0` }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 800,
    margin: "auto",
  },
})

class LoginPage extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth">
            <Tab label="Sign Up " icon={<PersonAddIcon />} />
            <Tab label="Sign In" icon={<PersonIcon />} />
            <Tab label="Request Reset" icon={<ResetIcon />} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}>
          <TabContainer dir={theme.direction}>
            <Signup />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Signin />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <RequestReset />
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(LoginPage)
