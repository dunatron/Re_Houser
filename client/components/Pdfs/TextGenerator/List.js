import HandleInners from './HandleInners';
import useStyles from '../useStyles';

const List = ({ item }) => {
  const classes = useStyles();
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

  const CustomTag = fieldProps.variant === 'ol' ? 'ol' : 'ul';

  return (
    <CustomTag
      className={classes[fieldProps.variant]}
      type={fieldProps.type}
      start={fieldProps.start}
      reversed={fieldProps.reversed}
      //   style={{
      //     paddingLeft: '16px',
      //   }}
    >
      <HandleInners inners={inners} />
    </CustomTag>
  );
};

export default List;
