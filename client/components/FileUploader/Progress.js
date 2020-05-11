import React, { useState } from 'react';
// import './progress.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import useProgressStyles from './ProgressStyles';

const Progress = props => {
  const classes = useProgressStyles();
  const [state, setState] = useState({});
  return (
    <div className={classes.progressBar}>
      <div
        className={classes.progress}
        style={{ width: props.progress + '%' }}
      />
    </div>
  );
};
// class Progress extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     return (
//       <div className="ProgressBar">
//         <div
//           className="Progress"
//           style={{ width: this.props.progress + '%' }}
//         />
//       </div>
//     );
//   }
// }

export default Progress;
