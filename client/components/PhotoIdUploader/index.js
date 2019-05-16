import React, { useState } from "react"

import { useMutation } from "react-apollo-hooks"

import { UPLOAD_PHOTO_IDENTIFICATION } from "../../mutation/index"
import { CURRENT_USER_QUERY } from "../../query/index"
import encodeImage from "../../lib/encodeImage"

import { DetailStyles, UploaderStyles } from "./styles"

import Card from "@material-ui/core/Card"
import DragDropUploader from "../DragDropUploader/index"
import TextInput from "../../styles/TextInput"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import SwipeableViews from "react-swipeable-views"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
// Icons
import EditIcon from "../../styles/icons/EditIcon"
import PersonAddIcon from "@material-ui/icons/PersonAdd"
import PersonIcon from "@material-ui/icons/Person"
import ResetIcon from "@material-ui/icons/Build"
import { openSnackbar } from "../Notifier/index"

import { isEmpty } from "ramda"

/**
 * ToDo: currently when updated will refresh the me query
 * can do stuff with that, like reset the component position to the photo tab instead upload tab
 * also implement those tabs
 * we should check mutations
 */
const PhotoIdUploader = ({ me }) => {
  const [file, setFile] = useState({})
  const [tabIndex, setTabIndex] = useState(0)
  const [photoId, setPhotoId] = useState("")
  const [showUploader, setShowUploader] = useState(!me.photoIdentification)

  const uploadPhotoId = useMutation(UPLOAD_PHOTO_IDENTIFICATION, {
    variables: {
      file: file.raw,
      photoId: photoId,
    },
    update: (proxy, payload) => {
      console.log("uploadPhotoId Cache not implemented yet: Harass Dunatron")
      // i.e here just find the {me} and update the profile image url with the new one from cloudinary
      const userData = proxy.readQuery({ query: CURRENT_USER_QUERY })
      // console.log("userData => ", userData)
      // console.log("payload => ", payload)
      // console.log("userData.me => ", userData.me)
      // userData.me = {
      //   ...userData.me,
      //   // ...payload.data.uploadPhotoId,
      // }
      // proxy.writeQuery({ query: CURRENT_USER_QUERY, userData })
      // NOTE: Its not going to let you update the me object when we need it in the current instance!
      // setShowUploader(0)
      setTabIndex(0)
      openSnackbar({
        message: `uploadeed new photo id please prceed`,
        duration: 6000,
      })
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    optimisticResponse: {},
  })

  const handleSetFile = file => {
    console.log("file => ", file)
    setFile(file)
    setShowUploader(0)
  }

  // useEffect(() => {
  //   return () => {
  //     effect
  //   }
  // }, [input])
  return (
    <Card>
      <Tabs
        value={tabIndex}
        onChange={setTabIndex}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth">
        <Tab
          label="Photo Id Tab"
          icon={<PersonAddIcon />}
          onClick={() => setTabIndex(0)}
        />
        <Tab
          label="Upload New Photo Id"
          icon={<PersonIcon />}
          onClick={() => setTabIndex(1)}
        />
      </Tabs>
      <SwipeableViews index={tabIndex}>
        <TabContainer>
          <DetailStyles>
            <h2 className="details__title">Current Photo Id details</h2>
            {me.photoIdentification && (
              <img
                className="details__image"
                src={me.photoIdentification.url}
              />
            )}
          </DetailStyles>
        </TabContainer>
        <TabContainer>
          {isEmpty(file) && (
            <DragDropUploader
              // disabled={loading}
              multiple={false}
              types={["image"]}
              extensions={[".jpg", ".png"]}
              receiveFile={file => handleSetFile(file)}
            />
          )}
          {!isEmpty(file) && (
            <UploaderStyles>
              {file.content && (
                <div className="preUpload">
                  <img
                    className="preUpload__image"
                    src={contentAsSrc(file.content)}
                  />
                  <div className="preUpload__overlay">
                    <Button
                      color="error"
                      className="preUpload__remove"
                      onClick={() => setFile({})}>
                      Remove
                    </Button>
                    <TextInput
                      label="ID Number"
                      color="secondary"
                      name="photoId"
                      className="preUpload__id-number"
                      value={photoId}
                      onChange={e => setPhotoId(e.target.value)}
                    />
                    <Button
                      onClick={uploadPhotoId}
                      className="preUpload__upload-btn"
                      variant="contained"
                      color="primary"
                      size="large">
                      <EditIcon />
                      Upload Photo Identification
                    </Button>
                  </div>
                </div>
              )}
            </UploaderStyles>
          )}
        </TabContainer>
      </SwipeableViews>
    </Card>
  )
}

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: `16px 0` }}>
      {children}
    </Typography>
  )
}

const contentAsSrc = content => {
  const src = "data:image/png;base64," + encodeImage(content)
  return src
}

export { PhotoIdUploader }

export default PhotoIdUploader