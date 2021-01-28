import MUIRichTextEditor from 'mui-rte';
import { is, isEmpty } from 'ramda';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import TableChartIcon from '@material-ui/icons/TableChart';
import { useTheme } from '@material-ui/core/styles';

const MyBlock = props => {
  const theme = useTheme();
  return (
    <div
      style={{
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
      }}>
      {props.children}
    </div>
  );
};

const RichTextEdit = ({ defaultValue, onSave, viewOnly }) => {
  const theme = useTheme();
  return (
    <div>
      <MUIRichTextEditor
        defaultValue={defaultValue}
        label="Rehouser WYSYWYG Editor..."
        onSave={onSave}
        readOnly={viewOnly ? true : false}
        // "title", "bold", "italic", "underline", "strikethrough", "highlight", "undo", "redo", "link", "media", "numberList", "bulletList", "quote", "code", "clear", "save"
        controls={
          viewOnly
            ? []
            : [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'highlight',
                'undo',
                'redo',
                'link',
                // 'media',
                'numberList',
                'bulletList',
                'quote',
                'code',
                'clear',
                'invertColor',
                'section',
                'save',
              ]
        }
        customControls={[
          {
            name: 'invertColor',
            icon: <InvertColorsIcon />,
            type: 'inline',
            inlineStyle: {
              backgroundColor:
                theme.palette.type === 'light' ? 'black' : 'white',
              color: theme.palette.type === 'light' ? 'white' : 'black',
            },
          },
          {
            name: 'section',
            icon: <TableChartIcon />,
            type: 'block',
            blockWrapper: <MyBlock />,
          },
        ]}
      />
    </div>
  );
};

export default RichTextEdit;
