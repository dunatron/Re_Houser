import Router from "next/router"

const BackButton = () => {
  console.log("Router => ", Router)
  return <div onClick={() => Router.back()}>Go Back</div>
}

export default BackButton
