import React, { Component } from "react"
import PropertyCard from "../../styles/PropertyCard"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import red from "@material-ui/core/colors/red"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import classnames from "classnames"
import Map from "../Map/index"

class PropertyCardComponent extends Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { property } = this.props
    console.log("The Property => ", property)
    return (
      <PropertyCard>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={"avatar"}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={property.location}
          subheader={property.rent + " => " + property.rooms}
        />
        <CardMedia
          className={"media"}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          {property.locationLat && (
            <Map
              center={{
                lat: property.locationLat,
                lng: property.locationLng,
              }}
              zoom={15}
              // initialCenter={{
              //   lat: property.locationLat,
              //   lng: property.locationLng,
              // }}
              // zoom={this._getZoom(this.state.desc)}
            />
          )}
          <Typography component="p">
            A description about this lot of land/dwelling
          </Typography>
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
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </PropertyCard>
    )
  }
}

export default PropertyCardComponent
