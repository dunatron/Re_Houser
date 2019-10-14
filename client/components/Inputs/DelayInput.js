import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  searchField: {
    margin: theme.spacing.unit * 2,
  },
});

/*
const NumberDelayInput = props => {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     lastTyped: false,
  //     lastTypedVal: null,
  //   }
  // }
  const [lastTyped, setLastTyped] = useState(false)
  const [lastTypedVal, setLastTypedVal] = useState("")

  const { classes, id, label, defaultValue, handleChange } = props

  const showDone = v => {
    if (v === lastTypedVal) {
      props.handleChange(lastTypedVal)
      alert("This is fine too")
    }
    alert("ALmost")
  }

  const sendValue = async v => {
    await setLastTypedVal(v)
    var wait = ms => new Promise((r, j) => setTimeout(r, ms))
    // var prom = wait(props.waitLength) // prom, is a promise
    var promWithWait = wait(props.waitLength) // prom, is a promise
    var promWithWait = wait(2000) // prom, is a promise

    promWithWait.then(showDone(v))
  }

  return (
    <TextField
      id={id}
      label={label}
      className={classes.searchField}
      // value={value}
      defaultValue={defaultValue}
      onChange={e => sendValue(e.target.value)}
      margin="normal"
    />
  )
}

NumberDelayInput.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  waitLength: PropTypes.number.isRequired,
}

export default withStyles(styles)(NumberDelayInput)
*/

class NumberDelayInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTyped: false,
      lastTypedVal: null,
    };
  }

  sendValue = async v => {
    await this.setState({
      lastTypedVal: v,
    });

    var wait = ms => new Promise((r, j) => setTimeout(r, ms));
    var prom = wait(this.props.waitLength); // prom, is a promise
    var showdone = () => {
      if (v === this.state.lastTypedVal) {
        this.props.handleChange(this.state.lastTypedVal);
      }
    };
    prom.then(showdone);
  };

  render() {
    const { classes, id, label, defaultValue, handleChange } = this.props;
    return (
      <TextField
        id={id}
        label={label}
        className={classes.searchField}
        // value={value}
        defaultValue={defaultValue}
        onChange={e => this.sendValue(e.target.value)}
        margin="normal"
      />
    );
  }
}

NumberDelayInput.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  waitLength: PropTypes.number.isRequired,
};

export default withStyles(styles)(NumberDelayInput);
