import React, { Component } from "react"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import ImageSlider from "../ImageSlider/index"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"

import Map from "../Map/index"

//icons
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import HomeIcon from "@material-ui/icons/Home"
import MoneyIcon from "@material-ui/icons/AttachMoney"

export default class Details extends Component {
  state = { expanded: false, value: 0 }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }
  render() {
    const {
      rooms,
      rent,
      moveInDate,
      onTheMarket,
      location,
      locationLat,
      locationLng,
      owners,
      creator,
      images,
    } = this.props.property
    return (
      <div>
        <CardContent>
          <Typography component="p">rooms: {rooms}</Typography>
          <Typography component="p">rent: {rent}</Typography>
          <Typography component="p">moveInDate: {moveInDate}</Typography>
          <Typography component="p">onTheMarket: {onTheMarket}</Typography>
          <Typography component="p">locationLat: {locationLat}</Typography>
          <Typography component="p">locationLng: {locationLng}</Typography>
        </CardContent>

        <ImageSlider images={images} />
        <CardContent>
          <Typography component="p">
            A description about this lot of land/dwelling
          </Typography>
          {owners &&
            owners.map((owner, i) => {
              return (
                <Typography key={i} component="p">
                  Owner: {owner.firstName}
                </Typography>
              )
            })}
        </CardContent>
        <CardActions className={"actions"} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Map
              center={{
                lat: locationLat,
                lng: locationLng,
              }}
              zoom={15}
            />
          </CardContent>
        </Collapse>
      </div>
    )
  }
}
