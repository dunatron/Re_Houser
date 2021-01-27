import MUIRichTextEditor from 'mui-rte';

const RichTextEdit = ({ item, onChange }) => {
  return (
    <div>
      <MUIRichTextEditor label="Start typing..." />
    </div>
  );
};

export default RichTextEdit;
