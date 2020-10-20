import HandleInners from './HandleInners';
import useStyles from '../useStyles';
import { Typography, Link as MDLink } from '@material-ui/core';

import Link from 'next/link';

const LinkItem = ({ item }) => {
  const classes = useStyles();
  const {
    type,
    value,
    href,
    target,
    internal = true,
    fieldProps,
    layoutProps,
    inners,
    listStyle,
    listNum,
    title,
  } = item;

  return (
    <Link href={href}>
      <MDLink
        gutterBottom
        variant={fieldProps.variant}
        className={classes.link}
        target={internal ? '_self' : '_blank'}
        rel={internal ? 'opener' : 'noopener'}
        href={href}>
        {value}
      </MDLink>
    </Link>
  );
};

export default LinkItem;
