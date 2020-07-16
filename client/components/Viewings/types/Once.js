// if viewing is Once then we just render the one  off viewing
// if they are a host they will have a button that be clickable to edit, remove, save that will bubble up
// can just be a modal that allows the editing of it
import moment from 'moment';
import { Typography } from '@material-ui/core';

const OnceViewing = ({ viewing, ...rest }) => {
  console.log('Viewing for Once OFF => ', viewing);

  const viewingDate = moment(viewing.dateTime).format(
    'dddd MMMM Do YYYY, h:mm:ss a'
  );

  return (
    <div>
      <Typography>ONCE</Typography>
      <Typography component="ul">
        <Typography component="li">{viewingDate}</Typography>
      </Typography>
    </div>
  );
};

export default OnceViewing;
