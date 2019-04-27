import React, { useState } from "react"

import { Mutation } from "react-apollo"
import { CREATE_RENTAL_APPLICATION } from "../../mutation/index"
import encodeImage from "../../lib/encodeImage"

import Card from "@material-ui/core/Card"
import DragDropUploader from "../DragDropUploader/index"

import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"

// Icons
import EditIcon from "../../styles/icons/EditIcon"

const PhotoIdUploader = ({ me }) => {
  const [file, setFile] = useState({})
  const [showUploader, setShowUploader] = useState(!me.photoIdentification)

  const handleSetFile = file => {
    console.log("file => ", file)
    setFile(file)
    setShowUploader(0)
  }
  return (
    <Card>
      {showUploader && (
        <DragDropUploader
          // disabled={loading}
          multiple={false}
          types={["image"]}
          extensions={[".jpg", ".png"]}
          receiveFile={file => handleSetFile(file)}
        />
      )}

      {file.content && (
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
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
            <input value="esr6z" style={{ marginBottom: "24px" }} />
            <Button
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
    </Card>
  )
}

const contentAsSrc = content => {
  const src = "data:image/png;base64," + encodeImage(content)
  return src
}

export default PhotoIdUploader
