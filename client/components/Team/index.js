import TEAM_CONFIG from '@/Lib/configs/teamConfig';
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
    margin: '0 -13px', // small bug for spacing 3 not
  },
  gridItem: {
    justifyContent: 'center',
  },
  cardRoot: {
    // minWidth: 275,
    maxWidth: 250,
    marginRight: '8px',
    justifyContent: 'center',
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
      pathname: `/about-us/${member.subUrl}`,
      //   query: router.query,
    });
  };

  return (
    <div className={classes.root}>
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
                key={member.id}
                className={classes.gridItem}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                spacing={0}
                container>
                <Card className={classes.cardRoot}>
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
