import React, { useState, useEffect, Component, memo, useMemo } from "react"
import encodeImage from "../../lib/encodeImage"

const contentAsSrc = content => {
  const src = "data:image/png;base64," + encodeImage(content)
  return src
}

/**
 * Could optimize further, in the parent wrap it in a memo with dateStamp,
 * i.e when they change the image change the datestamp to now
 */
const PreUploadImage = ({ file }) => {
  const memoizedContent = useMemo(() => contentAsSrc(file.content), [
    file.content,
  ])
  return <img className="preUpload__image" src={memoizedContent} />
}

export default PreUploadImage

// const PreUploadImage = ({ file }) => {
//   const [content, setContent] = useState(file.content)

//   // const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])

//   useEffect(() => {
//     console.log("HAs the file changed?")
//   }, [file.content])
//   console.log("PreUploadImage => file => ", file)
//   return <img className="preUpload__image" src={contentAsSrc(content)} />
// }

// export default PreUploadImage

// const Button = memo(props => {
//   // your component
//   return <PreUploadImage {...props} />
// })

// export default Button

// class PreUploadImage extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     content: props.file.content,
  //   }
  // }
  // componentDidMount() {
  //   console.log("PreUploadImage Mounted")
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("PreUploadImage shuld updater")
  //   console.group("shouldComponentUpdate PreUploadImage")
  //   console.log("nextState => ", nextState)
  //   console.log("nextProps => ", nextProps)
  //   console.groupEnd()
  //   if (nextProps.file.content !== this.props.file.content) {
  //     return true
  //   }
  //   return false
  // }
//   render() {
//     return (
//       <img
//         className="preUpload__image"
//         src={contentAsSrc(this.state.content)}
//       />
//     )
//   }
// }

// export default PreUploadImage
