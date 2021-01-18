// import DynamicWidget from './DynamicWidget';
import Widget from './Widget';
import { useApolloClient } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { CREATE_FILE_MUTATION } from '@/Gql/mutations';
import RenderType from './RenderType';
import RehouserCard from '@/Styles/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { NoSsr } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RenderFiles = ({ files }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start',
        padding: '16px',
        paddingRight: 0,
      }}>
      {files.map((f, i) => {
        return <RenderType key={f.id} file={f} />;
      })}
    </div>
  );
};

const WidgetWithSaveToDB = ({
  title,
  files,
  folder,
  withConnections,
  onCompleted,
  defaultExpand = false,
}) => {
  const client = useApolloClient();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(defaultExpand);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUploadToDbCompleted = data => {
    if (onCompleted) {
      onCompleted(client, data.createFile);
    }
  };

  const [createFile, { data, loading, error }] = useMutation(
    CREATE_FILE_MUTATION,
    {
      onCompleted: handleUploadToDbCompleted,
    }
  );

  const handleUploadCompleted = result => {
    createFile({
      variables: {
        data: {
          public_id: result.info.public_id,
          type: result.info.type,
          resource_type: result.info.resource_type,
          url: result.info.url,
          secure_url: result.info.secure_url,
          access_mode: result.info.access_mode,
          ...(withConnections && { ...withConnections }),
        },
      },
    });
  };

  return (
    <RehouserCard
      attrs={{
        disablePadding: true,
      }}>
      <CardHeader
        avatar={<PhotoLibraryIcon aria-label="recipe" />}
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </IconButton>
        }
        title={title}
        // subheader="September 14, 2016"
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <RenderFiles files={files} />
        <CardActions disableSpacing>
          <NoSsr>
            <Widget onUploadCompleted={handleUploadCompleted} />
          </NoSsr>
        </CardActions>
      </Collapse>
    </RehouserCard>
  );
};

export default WidgetWithSaveToDB;
