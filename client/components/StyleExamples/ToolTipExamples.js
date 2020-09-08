import useStyles from './useStyles';
import { Typography, Button } from '@material-ui/core';
import RToolTip from '../../styles/RToolTip';

const ToolTipExamples = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Tooltips
      </Typography>
      <RToolTip title="The text for the tooltip is called title which is amuzing">
        <Button>Test Tooltip with Button</Button>
      </RToolTip>
    </>
  );
};

export { ToolTipExamples };
export default ToolTipExamples;
