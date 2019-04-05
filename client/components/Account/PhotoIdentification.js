import React, { Component } from "react"
import DragDropUploader from "../DragDropUploader/index"
import { Mutation } from "react-apollo"
import { UPDATE_USER_MUTATION } from "../../mutation/index"
import { CURRENT_USER_QUERY } from "../../query/index"
import Error from "../ErrorMessage/index"
// styles
import PhotoID from "../../styles/PhotoID"

export default class PhotoIdentification extends Component {
  setFileInState = file => {
    console.log("The PhotoIdentification FIle => ", file)
  }
  _updateUserPhotoIdFile = async (file, updateUser) => {
    console.log("file => ", file)
    const res = await updateUser({
      variables: {
        data: {},
        photoFile: file.raw,
      },
    })
    console.log("The Upload Res => ", res)
    // this.closeModal()
    // console.log("res => ", res)
  }
  render() {
    const { photoIdentification } = this.props
    console.log("photoIdentification => ", photoIdentification)
    // if (photoIdentification) {
    //   return <div>

    //   </div>
    // }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Mutation
          mutation={UPDATE_USER_MUTATION}
          // variables={this._variables()}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          update={this.update}>
          {(updateUser, { error, loading }) => (
            <>
              {photoIdentification && (
                <PhotoID>
                  <img src={photoIdentification.url} />
                </PhotoID>
              )}
              <Error error={error} />
              {loading && <p>Please wait...</p>}
              <DragDropUploader
                // disabled={loading}
                style={{ padding: "40px" }}
                disabled={loading}
                externalLoading={loading}
                dropStyles={{ padding: "40px", minWidth: "300px" }}
                addText="Drop Photo Identification"
                addBtnText="Or Click to Browse"
                multiple={true}
                types={["image"]}
                extensions={[".jpg", ".png"]}
                // receiveFile={file => this.setFileInState(file)}
                receiveFile={file =>
                  this._updateUserPhotoIdFile(file, updateUser)
                }
              />
            </>
          )}
        </Mutation>
      </div>
    )
  }
}
