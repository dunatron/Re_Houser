import NavStyles from "../../styles/NavStyles"
import NavButton from "../../styles/NavButton"
import Router from "next/router"
import User from "../User/index"
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
            Home
          </NavButton>
        </NavStyles>
      )
    }}
  </User>
)

export default Nav
