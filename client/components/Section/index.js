import { Paper } from '@material-ui/core';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: props => ({
      margin: theme.spacing(props.spacing, 0),
      ...(props.topSpace && { marginTop: theme.spacing(props.topSpace) }),
      ...(props.botSpace && { marginBottom: theme.spacing(props.botSpace) }),
      padding: theme.spacing(props.padding),
    }),
    inline: {
      display: 'inline-block',
    },
    full: {
      width: '100%',
    },
    flex: {
      display: 'flex',
    },
  })
);

export default function Section({
  spacing = 0,
  topSpace,
  botSpace,
  elevation = 0,
  children,
  inline,
  padding = 0,
  full,
  flex,
  ...rest
}) {
  const classes = useStyles({
    spacing: spacing,
    topSpace: topSpace,
    botSpace: botSpace,
    padding: padding,
  });
  const rootClasses = clsx(
    classes.root,
    inline && classes.inline,
    full && classes.full,
    flex && classes.flex
  );
  return (
    <Paper elevation={elevation} {...rest} className={rootClasses}>
      {children}
    </Paper>
  );
}
