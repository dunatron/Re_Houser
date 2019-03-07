import NavStyles from "../../styles/NavStyles"
import NavButton from "../../styles/NavButton"
import Router from "next/router"
import User from "../User/index"
import AccountIcon from "../AccountIcon/index"
import Signout from "../Signout/index"

const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null
      return (
        <NavStyles>
          <NavButton color="secondary" onClick={() => handleLink("/")}>
            Look
          </NavButton>
          <NavButton
            color="secondary"
            onClick={() => handleLink("/add/property")}>
            Add Housing
          </NavButton>
          <NavButton color="secondary" onClick={() => handleLink("/")}>
            Home
          </NavButton>
          {me ? (
            <AccountIcon
              name={"Account"}
              me={me}
              sendRoute={route => handleLink(route)}
            />
          ) : (
            <NavButton color="secondary" onClick={() => handleLink("/login")}>
              Login
            </NavButton>
          )}
        </NavStyles>
      )
    }}
  </User>
)

export default Nav
