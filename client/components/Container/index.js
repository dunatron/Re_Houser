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
    gap: props => ({
      display: 'inline-flex',
      flexWrap: 'wrap',
      marginRight: theme.spacing(props.gap ? -props.gap : 0),
      marginLeft: theme.spacing(props.gap ? -props.gap : 0),
      marginTop: theme.spacing(props.gap ? -props.gap * 2 : 0),
      marginBottom: theme.spacing(props.gap ? -props.gap * 2 : 0),
      paddingTop: theme.spacing(props.gap ? props.gap : 0),
      paddingBottom: theme.spacing(props.gap ? props.gap : 0),
      width: `calc(100% + ${theme.spacing(props.gap ? props.gap * 2 : 0)}px)`,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      position: 'relative',
      '& > *': {
        flex: '1 1 auto',
        margin: theme.spacing(props.gap ? props.gap : 0),
      },
    }),
  })
);

export default function Container({
  spacing = 0,
  topSpace,
  botSpace,
  elevation = 0,
  children,
  inline,
  padding = 0,
  full,
  flex,
  gap,
  ...rest
}) {
  const classes = useStyles({
    spacing: spacing,
    topSpace: topSpace,
    botSpace: botSpace,
    padding: padding,
    gap: gap,
  });
  const rootClasses = clsx(
    classes.root,
    inline && classes.inline,
    full && classes.full,
    flex && classes.flex
  );
  const layoutClasses = clsx(gap && classes.gap);
  return (
    <Paper elevation={elevation} {...rest} className={rootClasses}>
      <div className={layoutClasses}>{children}</div>
    </Paper>
  );
}
