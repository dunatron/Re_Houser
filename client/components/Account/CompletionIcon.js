import React, { Component } from 'react';
// Icons
import SvgIcon from '@material-ui/core/SvgIcon';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import ResetIcon from '@material-ui/icons/Build';
import DetailsIcon from '@material-ui/icons/Details';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import TabContainer from './TabContainer';

export default class CompletionIcon extends Component {
  render() {
    const val = this.props.val;
    if (val === '' || val === null) {
      return <ClearIcon color="secondary" style={{ margin: '8px' }} />;
    }
    if (val === undefined) {
      return <ClearIcon color="secondary" style={{ margin: '8px' }} />;
    }
    return <DoneIcon color="primary" style={{ margin: '8px' }} />;
  }
}
