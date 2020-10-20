import { Typography } from '@material-ui/core';

import HandleInners from './HandleInners';
import useStyles from '../useStyles';

import List from './List';
import Li from './Li';
import LinkItem from './Link';

const RenderType = ({ item }) => {
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

  switch (type) {
    case 'Section':
      // return <HandleInners inners={inners} />;
      return (
        <div className={classes.section}>
          <HandleInners inners={inners} />
        </div>
      );
    case 'List':
      return <List item={item} />;
    case 'Li':
      return <Li item={item} />;
    case 'Text':
      return (
        <Typography
          className={classes.paragraph}
          gutterBottom
          variant={fieldProps.variant}
          {...fieldProps}>
          {value}
        </Typography>
      );
    case 'Link':
      return <LinkItem item={item} />;
    default:
      return (
        <Text className={classes.paragraph}>
          IMPORTANT: No Type was specified or is not a valid type: {type}
        </Text>
      );
  }
};

export default RenderType;
