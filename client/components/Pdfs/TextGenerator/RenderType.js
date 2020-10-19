const RenderType = ({ item }) => {
  const {
    type,
    value,
    fieldProps,
    layoutProps,
    inners,
    listStyle,
    listNum,
    title,
  } = item;

  switch (type) {
    case 'Section':
      // return <HandleInners inners={inners} />;
      return (
        <div>
          Section
          <HandleInners inners={inners} />
        </div>
      );
    case 'List':
      return (
        <div>
          LIST
          <HandleInners inners={inners} />
        </div>
      );
    case 'Li':
      return (
        <div>
          List Item: {value}
          <HandleInners inners={inners} />
        </div>
      );
    case 'Text':
      return <div>Text {value}</div>;
    default:
      return (
        <Text style={{ ...styles.h1, ...styles.center }}>
          IMPORTANT: No Type was specified or is not a valid type: {type}
        </Text>
      );
  }
};

const HandleInners = ({ inners }) => {
  if (!inners) return null;
  if (inners.length === 0) return null;
  return inners.map((inner, idx) => {
    return <RenderType key={idx} item={inner} />;
  });
};

export default RenderType;
