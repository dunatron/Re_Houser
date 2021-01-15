import EditableDisplay from './index';
const EditableDisplayItems = ({
  data,
  items,
  __typename,
  where,
  disableEdit,
}) => {
  return (
    <div>
      {items.map((item, idx) => {
        return (
          <EditableDisplay
            item={{
              ...item,
              value: data[item.key],
              __typename,
              where,
              ...(disableEdit && { editable: false }),
            }}
          />
        );
      })}
    </div>
  );
};
export default EditableDisplayItems;
