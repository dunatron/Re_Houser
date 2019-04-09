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
// tabs
import Tabs from "@material-ui/core/Tabs"
import Tab from "../../styles/Tab"
import TabContainer from "../TabContainer/index"
// tab components
import Details from "./Details"
import Apply from "./Apply"
import Rating from "./Rating"

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
  state = { expanded: false, value: 1 }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  render() {
    const { property } = this.props
    const { value } = this.state
    const {
      id,
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
        <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Apply" />
          <Tab label="Details" />
          <Tab label="Rating" />
        </Tabs>
        {value === 0 && (
          <TabContainer>
            <Apply property={property} />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>{<Details property={property} />}</TabContainer>
        )}
        {value === 2 && <TabContainer>{<Rating />}</TabContainer>}
      </PropertyCard>
    )
  }
}

export default PropertyCardComponent
