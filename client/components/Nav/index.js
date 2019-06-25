import NavStyles from "../../styles/NavStyles"
import NavButton from "../../styles/NavButton"
import Router from "next/router"
import User from "../User/index"
import AccountIcon from "../AccountIcon/index"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Badge from "@material-ui/core/Badge"
import MailIcon from "@material-ui/icons/Mail"
import PersonIcon from "../../styles/icons/PersonIcon"
import DashboardIcon from "../../styles/icons/DashboardIcon"
import LocationSearchingIcon from "../../styles/icons/LocationSearchingIcon"
import AccountCircleIcon from "../../styles/icons/AccountCircleIcon"
import Tooltip from "@material-ui/core/Tooltip"

const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const SocialNav = props => {
  const { me } = props
  const { friendRequests } = me
  console.log("THE RED BANDANA => ", me)
  return (
    <>
      <Tooltip
        title={`Manage friends ${friendRequests.length >= 1 && "You have "}${
          friendRequests.length
        } pending friend requests`}
        interactive>
        <NavButton
          size="large"
          aria-label="Delete"
          onClick={() => handleLink("/my/friends")}>
          <Badge badgeContent={friendRequests.length}>
            <PersonIcon className="nav-btn__icon" />
          </Badge>
          Social
        </NavButton>
      </Tooltip>
    </>
  )
}

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null
      return (
        <NavStyles>
          <NavButton
            size="large"
            color="secondary"
            onClick={() => handleLink("/look")}>
            <LocationSearchingIcon className="nav-btn__icon" />
            Look
          </NavButton>
          {me && (
            <>
              <SocialNav me={me} />
              <Tooltip title="" interactive>
                <NavButton
                  size="large"
                  aria-label="Dashboard"
                  onClick={() => handleLink("/my/dashboard")}>
                  <DashboardIcon className="nav-btn__icon" />
                  Dashboard
                </NavButton>
              </Tooltip>
            </>
          )}
          {me ? (
            <AccountIcon
              name={"Account"}
              me={me}
              sendRoute={route => handleLink(route)}
            />
          ) : (
            <>
              <NavButton
                size="large"
                color="primary"
                onClick={() => handleLink("/login")}>
                <AccountCircleIcon className="nav-btn__icon" />
                Login
              </NavButton>
            </>
          )}
        </NavStyles>
      )
    }}
  </User>
)

export default Nav
