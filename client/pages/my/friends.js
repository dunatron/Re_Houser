// import PropertyDetails from "../../components/PropertyDetails/index"
import FriendManager from "../../components/FriendManager/index"
import PleaseSignIn from "../../components/PleaseSignIn"

const MyLeasePage = props => (
  <div>
    <PleaseSignIn message="You must be signed in to manager your friends">
      <FriendManager />
    </PleaseSignIn>
  </div>
)

export default MyLeasePage
