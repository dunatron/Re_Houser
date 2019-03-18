import NavStyles from "../../styles/NavStyles"
import NavButton from "../../styles/NavButton"
import Router from "next/router"
import User from "../User/index"
import AccountIcon from "../AccountIcon/index"

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
          <NavButton color="secondary" onClick={() => handleLink("/look")}>
            Look
          </NavButton>
          {me && (
            <>
              <NavButton
                color="secondary"
                onClick={() => handleLink("/properties")}>
                Properties
              </NavButton>
            </>
          )}
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
            <>
              <NavButton color="secondary" onClick={() => handleLink("/login")}>
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
