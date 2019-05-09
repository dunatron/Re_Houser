import React, { useState } from "react"

import { useMutation } from "react-apollo-hooks"
import { UPLOAD_PHOTO_IDENTIFICATION } from "../../mutation/index"
import { CURRENT_USER_QUERY } from "../../query/index"
import encodeImage from "../../lib/encodeImage"

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
      console.log("payload => ", payload)
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
          <p>
            Hold up wait a second, yall thought I was second? shoot you in the
            head then just walk off like I did it
          </p>
          <img src={me.photoIdentification.url} />
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
            <div>
              <Button onClick={() => setFile({})}>Remove</Button>
              {file.content && (
                <div style={{ position: "relative" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                    src={contentAsSrc(file.content)}
                  />
                  <div
                    class="overlay"
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      top: 0,
                      left: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <TextInput
                      label="ID Number"
                      name="photoId"
                      value={photoId}
                      onChange={e => setPhotoId(e.target.value)}
                      style={{ marginBottom: "24px" }}
                    />
                    <Button
                      onClick={uploadPhotoId}
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ marginBottom: "24px" }}>
                      <EditIcon />
                      Upload Photo Identification
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </TabContainer>
      </SwipeableViews>
    </Card>
  )
}

const ShowUploaderButton = ({ show, file, onClick }) => {
  if (show || file) return null
  return <Button onClick={onClick}>Upload new PhotoId</Button>
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
