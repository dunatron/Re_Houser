import useStyles from './useStyles';
import { Typography, Button } from '@material-ui/core';

const TypographyExamples = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
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
      <Typography variant="h2" gutterBottom>
        Typography color variants
      </Typography>
      <Typography variant="body1" gutterBottom color="primary">
        body1.colorPrimary. For any Typography we can either give it a color
        value to override its deault color as defined above. it can be one of
        sevan values ["initial", "inherit", "primary", "secondary", "error",
        "textPrimary", "textSecondary"]. All but "initial", and "inherit" colors
        will need to be defined
      </Typography>
      <Typography variant="body1" gutterBottom color="secondary">
        body1.colorSecondary. We can override the color for any of these
        Typography fonts, useful possibly for the h tags in rare cases as I
        would like to carefully define the colors for each h tag and have it
        structred throught the app nicely
      </Typography>
      <Typography variant="h1" component="h2" gutterBottom color="initial">
        h1. with color initial
      </Typography>
      <Typography variant="h5" gutterBottom color="initial">
        h5. with color initial
      </Typography>
      <Typography variant="h5" gutterBottom color="inherit">
        h5. with color inherit
      </Typography>
      <Typography variant="h5" gutterBottom color="primary">
        h5. with color primary
      </Typography>
      <Typography variant="h5" gutterBottom color="secondary">
        h5. with color secondary
      </Typography>
      <Typography variant="h5" gutterBottom color="error">
        h5. with color error
      </Typography>
      <Typography variant="h5" gutterBottom color="textPrimary">
        h5. with color textPrimary
      </Typography>
      <Typography variant="h5" gutterBottom color="textSecondary">
        h5. with color textSecondary
      </Typography>
    </div>
  );
};

export { TypographyExamples };
export default TypographyExamples;
