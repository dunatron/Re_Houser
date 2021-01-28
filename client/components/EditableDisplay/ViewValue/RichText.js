import useViewStyles from './useViewStyles';

// import MUIRichTextEditor from 'mui-rte';
import RichTextEditor from '@/Components/RichTextEditor';

const ReadOnly = ({ item }) => {
  return (
    <RichTextEditor
      viewOnly={true}
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
