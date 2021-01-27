import PropTypes from 'prop-types';
import { Box, Typography, Chip, Icon } from '@material-ui/core';
import useStyles from './useStyles';
import MUIRichTextEditor from 'mui-rte';

export default function RichText({ value, gutterBottom }) {
  const classes = useStyles({ gutterBottom });
  // return (
  //   <MUIRichTextEditor
  //     label="fffere..."
  //     // onSave={save}
  //     inlineToolbar={true}
  //     readOnly={true}
  //     inlineToolbarControls={[]}
  //     controls={[]}
  //   />
  // );
  return (
    <MUIRichTextEditor
      defaultValue={value}
      controls={[]}
      inlineToolbar={false}
      readOnly={true}
      inlineToolbarControls={[]}
      controls={[]}
    />
  );
}

RichText.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  iconProps: PropTypes.shape({
    color: PropTypes.oneOf([
      'inherit',
      'primary',
      'secondary',
      'action',
      'error',
      'disabled',
    ]),
    fontSize: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
  }),
};
