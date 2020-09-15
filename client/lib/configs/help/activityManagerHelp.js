// export individual objects from here to use
import { Box, Typography } from '@material-ui/core';
import YouTube from 'react-youtube';

const youTubeOptions = {
  height: '390',
  width: '100%',
  maxWidth: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const ACTIVITY_MANAGER_HELP = {
  title: 'Activity Manager Helper',
  components: [
    <Typography key={1}>
      You will be able to see activity you have made across the platform{' '}
    </Typography>,
    <Typography key={2}>Can put anything we want in these</Typography>,
    <Typography key={3}>
      Like maybe a Youtube video explaining how to do things
    </Typography>,
    <Box key={4} component="div" style={{ maxWidth: '640px' }}>
      <YouTube
        videoId="KBaGm-EqpF4"
        opts={youTubeOptions}
        //   onReady={this._onReady}
      />
    </Box>,
  ],
};

export { ACTIVITY_MANAGER_HELP };
