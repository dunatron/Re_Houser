import useStyles from './useStyles';
import { Typography, Button } from '@material-ui/core';

const ButtonExamples = () => {
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
      <Typography variant="h6" gutterBottom>
        Button Sizes
      </Typography>
      <Button
        variant="contained"
        className={classes.button}
        size="small"
        color="primary">
        small contained
      </Button>
      <Button
        color="primary"
        variant="outlined"
        className={classes.button}
        size="small">
        small outlined
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        className={classes.button}
        size="small">
        small outlined
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        className={classes.button}
        size="medium">
        medium outlined
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        className={classes.button}
        size="large">
        large outlined
      </Button>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        size="medium">
        medium contained
      </Button>
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        size="large">
        large contained
      </Button>
    </div>
  );
};

export { ButtonExamples };
export default ButtonExamples;
