const RefereeListItem = ({
  referee: { id, name, email, phone, relationship },
}) => {
  return (
    <div>
      <div>id: {id}</div>
      <div>name: {name}</div>
      <div>email: {email}</div>
      <div>phone: {phone}</div>
      <div>relationship: {relationship}</div>
      <div>EDIT</div>
      <div>DELETE</div>
    </div>
  );
};

export default RefereeListItem;
