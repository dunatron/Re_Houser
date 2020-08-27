import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  button: {
    margin: '8px',
  },
});

const ButtonsExample = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Buttons
      </Typography>
      <Typography variant="h6" gutterBottom>
        default buttons
      </Typography>
      <Button className={classes.button}>Default Button</Button>
      <Button color="primary" className={classes.button}>
        Primary Button
      </Button>
      <Button color="secondary" className={classes.button}>
        Secondary Button
      </Button>

      <Typography variant="h6" gutterBottom>
        contained buttons
      </Typography>
      <Button variant="contained" className={classes.button}>
        Default contained Button
      </Button>
      <Button color="primary" variant="contained" className={classes.button}>
        Primary Contained Button
      </Button>
      <Button color="secondary" variant="contained" className={classes.button}>
        Secondary contained Button
      </Button>
      <Typography variant="h6" gutterBottom>
        outlined buttons
      </Typography>
      <Button variant="outlined" className={classes.button}>
        Default outlined Button
      </Button>
      <Button color="primary" variant="outlined" className={classes.button}>
        Primary outlined Button
      </Button>
      <Button color="secondary" variant="outlined" className={classes.button}>
        Secondary outlined Button
      </Button>
      <Typography variant="h6" gutterBottom>
        text buttons
      </Typography>
      <Button variant="text" className={classes.button}>
        Default text Button
      </Button>
      <Button color="primary" variant="text" className={classes.button}>
        Primary text Button
      </Button>
      <Button color="secondary" variant="text" className={classes.button}>
        Secondary text Button
      </Button>
    </div>
  );
};

const TypographyTypesPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6. Heading
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Quos blanditiis tenetur
      </Typography>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2" gutterBottom>
        body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        button text
      </Typography>
      <Typography variant="caption" display="block" gutterBottom>
        caption text
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        overline text
      </Typography>
      <ButtonsExample />
    </div>
  );
};

export default TypographyTypesPage;
