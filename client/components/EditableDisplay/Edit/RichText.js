import MUIRichTextEditor from 'mui-rte';
import { is, isEmpty } from 'ramda';

const RichTextEdit = ({ item, onChange }) => {
  const defaultValue = isEmpty(item.value) ? `` : item.value;
  return (
    <div>
      <MUIRichTextEditor
        defaultValue={defaultValue}
        label="Start typing..."
        onSave={onChange}
      />
    </div>
  );
};

export default RichTextEdit;
