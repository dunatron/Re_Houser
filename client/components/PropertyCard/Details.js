import React, { Component, useState } from "react"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import ImageSlider from "../ImageSlider/index"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import CameraIcon from "../../styles/icons/CameraIcon"
import DetailItem from "./DetailItem"

import Map from "../Map/index"

//icons
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import HomeIcon from "@material-ui/icons/Home"
import MoneyIcon from "@material-ui/icons/AttachMoney"

/*
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
      type,
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
      imageUrls, // for algolia
      carportSpaces,
      garageSpaces,
      offStreetSpaces,
      outdoorFeatures,
      indoorFeatures,
    } = this.props.property
    console.log("imageUrls  Right here=> ", imageUrls)
    return (
      <div>
        <CardContent>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography component="p">
              indoorFeatures:{" "}
              {indoorFeatures &&
                indoorFeatures.map((feature, i) => `${feature}, `)}
            </Typography>
            <Typography component="p">
              outdoorFeatures:{" "}
              {outdoorFeatures &&
                outdoorFeatures.map((feature, i) => `${feature},`)}
            </Typography>
            <DetailItem
              icon={<CameraIcon />}
              label="offStreetSpaces"
              value={offStreetSpaces}
            />
            <DetailItem
              icon={<CameraIcon />}
              label="garageSpaces"
              value={garageSpaces}
            />
            <DetailItem
              icon={<CameraIcon />}
              label="onTheMarket"
              value={onTheMarket}
            />
            <DetailItem
              icon={<CameraIcon />}
              label="carportSpaces"
              value={carportSpaces}
            />
            <DetailItem icon={<CameraIcon />} label="type" value={type} />
            <DetailItem icon={<CameraIcon />} label="rent" value={rent} />
            <DetailItem
              icon={<CameraIcon />}
              label="moveInDate"
              value={moveInDate}
            />
            <DetailItem
              icon={<CameraIcon />}
              label="onTheMarket"
              value={onTheMarket}
            />
            <DetailItem
              icon={<CameraIcon />}
              label="locationLat"
              value={locationLat}
            />
            <DetailItem
              icon={<CameraIcon />}
              label="locationLng"
              value={locationLng}
            />
          </div>
        </CardContent>

        {images && <ImageSlider images={images} />}
        {imageUrls && <ImageSlider imageUrls={imageUrls} />}
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
*/

const Details = props => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const {
    type,
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
    imageUrls, // for algolia
    carportSpaces,
    garageSpaces,
    offStreetSpaces,
    outdoorFeatures,
    indoorFeatures,
  } = props.property
  console.log("imageUrls  Right here=> ", imageUrls)
  return (
    <div>
      <CardContent>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* <Typography component="p">
            indoorFeatures:{" "}
            {indoorFeatures &&
              indoorFeatures.map((feature, i) => `${feature}, `)}
          </Typography>
          <Typography component="p">
            outdoorFeatures:{" "}
            {outdoorFeatures &&
              outdoorFeatures.map((feature, i) => `${feature},`)}
          </Typography> */}
          <DetailItem
            icon={<CameraIcon />}
            label="offStreetSpaces"
            value={offStreetSpaces}
          />
          <DetailItem
            icon={<CameraIcon />}
            label="garageSpaces"
            value={garageSpaces}
          />
          <DetailItem
            icon={<CameraIcon />}
            label="onTheMarket"
            value={onTheMarket}
          />
          <DetailItem
            icon={<CameraIcon />}
            label="carportSpaces"
            value={carportSpaces}
          />
          <DetailItem icon={<CameraIcon />} label="type" value={type} />
          <DetailItem icon={<CameraIcon />} label="rent" value={rent} />
          <DetailItem
            icon={<CameraIcon />}
            label="moveInDate"
            value={moveInDate}
          />
          <DetailItem
            icon={<CameraIcon />}
            label="onTheMarket"
            value={onTheMarket}
          />
          <DetailItem
            icon={<CameraIcon />}
            label="locationLat"
            value={locationLat}
          />
          <DetailItem
            icon={<CameraIcon />}
            label="locationLng"
            value={locationLng}
          />
        </div>
      </CardContent>

      {/* {images && <ImageSlider images={images} />}
      {imageUrls && <ImageSlider imageUrls={imageUrls} />} */}
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
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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

export default Details
