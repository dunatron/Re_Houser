import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const useStyles = makeStyles(theme => {
  const defaultBg = {
    // backgroundColor: theme.palette.secondary.main,
    // color: theme.palette.secondary.contrastText,
  };
  return createStyles({
    root: {
      ...defaultBg,
    },
    standardSuccess: {},
    standardInfo: {
      // ...defaultBg,
    },
    standardWarning: {},
    standardError: {},
    outlinedSuccess: {
      color: `rgb(183, 223, 185)`,
      border: `2px solid #4caf50`,
    },
    outlinedInfo: {
      // border: `1px solid #2196f3`
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    outlinedWarning: {},
    outlinedError: {},
    filledSuccess: {},
    filledInfo: {},
    filledWarning: {},
    filledError: {},
    icon: {
      color: theme.palette.secondary.main,
      fontSize: '32px',
    },
    message: {},
    action: {},
  });
});

const iconMapping = {
  // error: <AcUnitIcon />,
  info: '',
  success: '',
  warning: '',
};

export default function CustomAlert({ variant = 'standard', icon, ...rest }) {
  const classes = useStyles();
  const rootClasses = clsx(classes.root);
  return (
    <Alert
      variant={variant}
      icon={icon}
      classes={{
        root: classes.root,
        standardError: classes.standardError,
        standardSuccess: classes.standardSuccess,
        standardInfo: classes.standardInfo,
        standardWarning: classes.standardWarning,
        standardError: classes.standardError,
        outlinedSuccess: classes.outlinedSuccess,
        outlinedInfo: classes.outlinedInfo,
        outlinedWarning: classes.outlinedWarning,
        outlinedError: classes.outlinedError,
        filledSuccess: classes.filledSuccess,
        filledInfo: classes.filledInfo,
        filledWarning: classes.filledWarning,
        filledError: classes.filledError,
        icon: classes.icon,
        message: classes.message,
        action: classes.action,
      }}
      {...rest}
      iconMapping={iconMapping}
    />
  );
}

CustomAlert.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  classes: PropTypes.object,
  closeText: PropTypes.string,
  color: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  icon: PropTypes.node,
  // iconMapping,
  onClose: PropTypes.func,
  role: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

// action	node		The action to display. It renders after the message, at the end of the alert.
// children	node		The content of the component.
// classes	object		Override or extend the styles applied to the component. See CSS API below for more details.
// closeText	string	'Close'	Override the default label for the close popup icon button.
// For localization purposes, you can use the provided translations.
// color	'error'
// | 'info'
// | 'success'
// | 'warning'		The main color for the alert. Unless provided, the value is taken from the severity prop.
// icon	node		Override the icon displayed before the children. Unless provided, the icon is mapped to the value of the severity prop.
// iconMapping	{ error?: node, info?: node, success?: node, warning?: node }		The component maps the severity prop to a range of different icons, for instance success to <SuccessOutlined>. If you wish to change this mapping, you can provide your own. Alternatively, you can use the icon prop to override the icon displayed.
// onClose	func		Callback fired when the component requests to be closed. When provided and no action prop is set, a close icon button is displayed that triggers the callback when clicked.

// Signature:
// function(event: object) => void
// event: The event source of the callback.
// role	string	'alert'	The ARIA role attribute of the element.
// severity	'error'
// | 'info'
// | 'success'
// | 'warning'	'success'	The severity of the alert. This defines the color and icon used.
// variant	'filled'
// | 'outlined'
// | 'standard'	'standard'	The variant to use.
