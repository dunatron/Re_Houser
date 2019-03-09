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
import Map from "../Map/index"
import Slider from "react-slick"
//icons
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import HomeIcon from "@material-ui/icons/Home"
import MoneyIcon from "@material-ui/icons/AttachMoney"

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    const { images } = this.props
    return (
      <Slider {...settings}>
        {images &&
          images.map((image, i) => (
            <div>
              <img
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
                src={image.url}
              />
            </div>
          ))}
      </Slider>
    )
  }
}

class PropertyCardComponent extends Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { property } = this.props
    console.log("The Property => ", property)
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
    } = property
    return (
      <PropertyCard>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={"avatar"}>
              H
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={location}
          subheader={
            <div style={{ display: "flex" }}>
              <HomeIcon />
              {rooms}
              <MoneyIcon />
              {rent} = {Math.ceil(rent / rooms)} per person
            </div>
          }
        />

        <CardMedia
          className={"media"}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">rooms: {rooms}</Typography>
          <Typography component="p">rent: {rent}</Typography>
          <Typography component="p">moveInDate: {moveInDate}</Typography>
          <Typography component="p">onTheMarket: {onTheMarket}</Typography>
          <Typography component="p">locationLat: {locationLat}</Typography>
          <Typography component="p">locationLng: {locationLng}</Typography>
        </CardContent>
        <SimpleSlider images={images} />
        <CardContent>
          <Typography component="p">
            A description about this lot of land/dwelling
          </Typography>
          {owners &&
            owners.map((owner, i) => {
              return (
                <Typography component="p">Owner: {owner.firstName}</Typography>
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
                lat: property.locationLat,
                lng: property.locationLng,
              }}
              zoom={15}
            />
          </CardContent>
        </Collapse>
      </PropertyCard>
    )
  }
}

export default PropertyCardComponent
