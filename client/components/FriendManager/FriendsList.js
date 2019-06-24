const FriendsList = props => {
  const {
    me: { friends },
  } = props
  return (
    <div>
      <h1>Friends:</h1>
      {friends.map(friend => {
        return (
          <div>
            <p>
              Friend => {friend.firstName} {friend.lastName}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default FriendsList
