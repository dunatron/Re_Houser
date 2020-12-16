import useStyles from '../useStyles';
import HandleInners from './HandleInners';

const Section = ({ item }) => {
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
  return (
    <div className={classes.section}>
      <HandleInners inners={inners} />
    </div>
  );
};

export default Section;
