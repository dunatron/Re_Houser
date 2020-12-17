import { Typography } from '@material-ui/core';

import HandleInners from './HandleInners';
import useStyles from '../useStyles';

import Section from './Section';
import List from './List';
import Li from './Li';
import LinkItem from './Link';

import Chip from '@material-ui/core/Chip';

const RenderType = ({ item }) => {
  const classes = useStyles();
  if (!item) return null; // making sure items with bool checks that dont pass dont fuck shit up
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
      return <Section item={item} />;
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
    case 'Image':
      return (
        <img
          src={item.src}
          style={{
            height: layoutProps.height,
            width: layoutProps.width,
          }}
        />
      );
    case 'Link':
      return <LinkItem item={item} />;
    case 'Spacer':
      return (
        <div
          style={{
            border: `1px solid lightgrey`,
            marginBottom: `${8 * item.value}px`,
          }}></div>
      );
    case 'ChipList':
      return (
        <div className={classes.chipList}>
          {item.value.map((chip, idx) => {
            return (
              <Chip
                size="small"
                color="secondary"
                className={classes.chip}
                key={idx}
                label={chip}
              />
            );
          })}
        </div>
      );
    case 'Chip':
      return <div>I am a chip</div>;
    default:
      return (
        <Text className={classes.paragraph}>
          IMPORTANT: No Type was specified or is not a valid type: {type}
        </Text>
      );
  }
};

export default RenderType;
