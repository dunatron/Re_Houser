// import MUIRichTextEditor from 'mui-rte';
// import MUIRichTextEditor from '@/Components/MuiRichTextEditor/mui-rte';
import RichTextEditor from '@/Components/RichTextEditor';
import { is, isEmpty } from 'ramda';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const RichTextEdit = ({ item, onChange }) => {
  console.log('Item for edit => ', item);
  const defaultValue = isEmpty(item.value) ? `` : item.value;
  return (
    <div>
      <RichTextEditor
        defaultValue={defaultValue}
        label="Start typing..."
        onSave={onChange}
        addingCustomControls={[{ id: 'once', type: 'block' }]}
        customControls={[
          {
            name: 'my-style',
            icon: <InvertColorsIcon />,
            type: 'inline',
            inlineStyle: {
              backgroundColor: 'black',
              color: 'white',
            },
          },
        ]}
      />
    </div>
  );
};

export default RichTextEdit;
