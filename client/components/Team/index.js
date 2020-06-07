import TEAM_CONFIG from '../../lib/configs/teamConfig';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import { useRouter } from 'next/router';

import {
  Grid,
  Paper,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    // display: 'flex',
  },
  teamGrid: {
    // maxWidth: '860px',
    // margin: 0, // ovverrider for negative margin
    margin: '0 -13px', // small bug for spacing 3 not
  },
  cardRoot: {
    // minWidth: 275,
    maxWidth: 250,
    marginRight: '8px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const TeamComponent = () => {
  const router = useRouter();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleMemberClick = ({ member }) => {
    router.push({
      pathname: `/info/team/member`,
      query: {
        name: member.subUrl,
      },
      //   query: router.query,
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Meet the team</Typography>
      <Typography variant="body1">
        Here are the people who make Re_Houser happen!
      </Typography>
      <div
        style={{
          padding: '16px',
        }}>
        <Grid
          container
          spacing={3}
          className={classes.teamGrid}
          alignItems="center"
          justify="left">
          {TEAM_CONFIG.map((member, idx) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                spacing={0}
                container
                container
                // alignItems="center"
                // justify="center"
              >
                {/* // <Grid item xs={3} md={3} lg={3} xl={2} spacing={0}> */}
                <Card className={classes.cardRoot} square>
                  <CardActionArea
                    onClick={() => handleMemberClick({ member: member })}>
                    <div
                      style={{
                        height: '260px',
                        width: '250px',
                      }}>
                      <Image src={member.imgPath} />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {member.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p">
                        {member.role}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default TeamComponent;
