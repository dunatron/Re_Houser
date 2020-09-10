import PropTypes from "prop-types";
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Tooltip } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Modal from '../Modal';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Help = ({ toolTip, helpConf }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Modal
        title={helpConf ? helpConf.title : 'Help'}
        open={isModalOpen}
        close={() => setIsModalOpen(false)}>
        {helpConf ? helpConf.components : null}
      </Modal>
      <Tooltip title={toolTip ? toolTip : 'Help'}>
        <IconButton
          onClick={() => setIsModalOpen(true)}
          aria-label="delete"
          className={classes.margin}
          size="small">
          <InfoOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  );
};

Help.propTypes = {
  helpConf: PropTypes.shape({
    components: PropTypes.any,
    title: PropTypes.any
  }).isRequired,
  toolTip: PropTypes.any.isRequired
}

export default Help;
