import useViewStyles from './useViewStyles';

import MUIRichTextEditor from 'mui-rte';

const ReadOnly = ({ item }) => {
  return (
    <MUIRichTextEditor
      defaultValue={item.value ? item.value : ''}
      readOnly={true}
      controls={[]}
      inlineToolbar={false}
      inlineToolbarControls={[]}
      controls={[]}
    />
  );
};

const RichTextDisplay = ({ item }) => {
  const classes = useViewStyles();
  return (
    <div>
      <ReadOnly item={item} />
    </div>
  );
};

export default RichTextDisplay;
