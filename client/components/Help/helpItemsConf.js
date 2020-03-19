// export individual objects from here to use
import { Typography } from '@material-ui/core';
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
    <Typography>
      You will be able to see activity you have made across the platform{' '}
    </Typography>,
    <Typography>Can put anything we want in these</Typography>,
    <Typography>
      Like maybe a Youtube video explaining how to do things
    </Typography>,
    <div style={{ maxWidth: '640px' }}>
      <YouTube
        videoId="KBaGm-EqpF4"
        opts={youTubeOptions}
        //   onReady={this._onReady}
      />
    </div>,
  ],
};

export { ACTIVITY_MANAGER_HELP };
