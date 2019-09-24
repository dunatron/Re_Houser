import Router from "next/router"
import Divider from "@material-ui/core/Divider"
import Badge from "@material-ui/core/Badge"
import PersonIcon from "../../styles/icons/PersonIcon"
import DashboardIcon from "../../styles/icons/DashboardIcon"
import LocationSearchingIcon from "../../styles/icons/LocationSearchingIcon"
import AccountCircleIcon from "../../styles/icons/AccountCircleIcon"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import { useCurrentUser } from "../User"
import { CURRENT_USER_QUERY } from "../User/index"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const NavigationConfig = me => {
  const [signOut, { data, loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  })
  const friendRequests = me ? me.friendRequests : []
  return [
    {
      key: "general",
      items: [
        {
          icon: <LocationSearchingIcon />,
          text: "Look",
          route: "/look",
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: "Dashboard",
          route: "/my/dashboard",
          canRender: () => true,
        },
        {
          icon: <AccountCircleIcon />,
          text: "Account",
          route: "/account",
          canRender: () => true,
        },
      ],
    },
    {
      key: "social",
      canRender: () => {
        if (me === null) return false
        return true
      },
      items: [
        {
          icon: (
            <Badge badgeContent={friendRequests.length}>
              <PersonIcon />
            </Badge>
          ),
          text: "Friend Manager",
          route: "/my/friends",
          canRender: () => {
            if (me === null) return false
            return true
          },
        },
      ],
    },
    {
      key: "landlord",
      canRender: () => {
        if (me === null) return false
        return true
      },
      items: [
        {
          icon: <DashboardIcon />,
          text: "Add Property",
          route: "/add/property",
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: "Applications",
          route: "/my/applications",
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: "Leases",
          route: "/my/leases",
          canRender: () => true,
        },
        {
          icon: <DashboardIcon />,
          text: "Properties",
          route: "/my/properties",
          canRender: () => true,
        },
      ],
    },
    {
      key: "account",
      items: [
        {
          icon: <AccountCircleIcon />,
          text: "Login",
          route: "/login",
          canRender: () => {
            if (me !== null) return false
            return true
          },
        },
        {
          icon: <AccountCircleIcon />,
          text: "Logout",
          route: "/logout",
          canRender: () => {
            if (me === null) return false
            return true
          },
          action: () => signOut(),
        },
      ],
    },
  ]
}

const Nav = () => {
  const user = useCurrentUser()
  const { data, loading, error } = user
  const me = data ? data.me : null
  const NAV_CONF = NavigationConfig(me)
  return (
    <div>
      {NAV_CONF.map((conf, index) => {
        if (conf.canRender) {
          if (!conf.canRender()) return null
        }
        return (
          <>
            <List key={conf.key}>
              {conf.items.map((item, i) => {
                if (!item.canRender()) return null
                return (
                  <ListItem
                    button
                    key={`${conf.key}${i}`}
                    onClick={() => {
                      if (item.action) {
                        item.action()
                      } else {
                        handleLink(item.route)
                      }
                    }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                )
              })}
            </List>
            <Divider />
          </>
        )
      })}
    </div>
  )
}

export default Nav
