import EditableDisplay from './index';
const EditableDisplayItems = ({ data, items, __typename, where }) => {
  return (
    <div>
      {items.map((item, idx) => {
        return (
          <EditableDisplay
            item={{ ...item, value: data[item.key], __typename, where }}
          />
        );
      })}
    </div>
  );
};
export default EditableDisplayItems;
