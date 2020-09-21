/**
 * Will accept a config, and also data  as props
 * will display data from the config using supplied data keys
 */
import {
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  details: {
    maxWidth: '100%',
    display: 'block',
  },
  val: {
    marginLeft: '16px',
  },
}));

const FormDetails = ({ title, config, data }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        maxWidth: '100%',
      }}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          {title}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.details}>
            <DisplayKeyVals config={config} data={data} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

const DisplayKeyVals = ({ config, data }) => {
  const classes = useStyles();
  return config.map((item, idx) => {
    return (
      <div
        style={
          {
            //   padding: '16px',
          }
        }>
        {item.fieldProps && (
          <Typography>
            {item.fieldProps.label}
            <Typography component="span" variant="caption">
              {' '}
              {item.type}
            </Typography>
          </Typography>
        )}
        {item.key && (
          <pre className={classes.val}>
            {item.key}: {JSON.stringify(data[item.key], null, 2)}
          </pre>
        )}
        {item.inners && (
          <div
            style={{
              padding: '16px',
            }}>
            <DisplayKeyVals config={item.inners} data={data} />
          </div>
        )}
      </div>
    );
  });
};

export default FormDetails;
