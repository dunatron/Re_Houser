import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
}));

export default function ForeignLink({ item }) {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title={item.url}>
        <a href={item.url} target="_blank">
          <Typography gutterBottom>{item.name}</Typography>
        </a>
      </Tooltip>
      <Typography gutterBottom>{item.notes}</Typography>
    </div>
  );
}

// user: User @relation(name: "UserForeignLinks")
// property: Property @relation(name: "PropertyForeignLinks")
// name: String
// id: ID! @unique @id
// url: String!
// notes: String
