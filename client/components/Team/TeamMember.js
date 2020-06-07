import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';

const useStyles = makeStyles(theme => ({
  root: {},
  descPanel: {
    display: 'flex',
    marginTop: '32px',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
  imageWrapper: {
    width: '50%',
    maxWidth: '550px', // maybe we should have this
    minWidth: '320px',
    margin: 'auto',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      width: '50%',
      maxWidth: 'unset',
    },
  },
  description: {
    // padding: '0 16px 16px 16px',
    padding: '32px 16px',
    width: '100%',
    maxWidth: '750px',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      padding: '0 32px 32px 32px',
      width: 'unset',
      margin: 'unset',
    },
  },
}));

const TeamMember = ({ member }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1} variant="elevation" square>
      <Typography align="center" variant="h1" component="h1">
        {member.name}
      </Typography>
      <Typography align="center" variant="h2" component="h2">
        {member.role}
      </Typography>
      <div className={classes.descPanel}>
        <div className={classes.imageWrapper}>
          <Image src={member.imgPath} />
        </div>
        <div className={classes.description}>{member.description}</div>
      </div>
    </Paper>
  );
};

export default TeamMember;
