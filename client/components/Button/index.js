import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: props => ({
      margin: theme.spacing(props.spacing, 0),
      ...(props.topSpace && { marginTop: theme.spacing(props.topSpace) }),
      ...(props.botSpace && { marginBottom: theme.spacing(props.botSpace) }),
      //   padding: theme.spacing(props.padding),
      ...(props.padding && { padding: theme.spacing(props.padding) }),
    }),
  })
);

export default function CustomButton({
  children,
  spacing = 0,
  topSpace,
  botSpace,
  padding,
  ...rest
}) {
  const classes = useStyles({
    spacing: spacing,
    topSpace: topSpace,
    botSpace: botSpace,
    padding: padding,
  });
  return (
    <Button classes={{ root: classes.root }} {...rest}>
      {children}
    </Button>
  );
}
