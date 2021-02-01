import useStyles from './useStyles';
import Alert from '@/Components/Alert';
import { Typography } from '@material-ui/core';
import Container from '@/Components/Container';

const ContainerExamples = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container spacing={4} elevation={2} padding={2} gap={2}>
        <Typography>
          Here is a container example. On its Own it does nothing. Its Outer div
          is just a section while its inner div will make a layout
        </Typography>
        <Typography>spacing: 2</Typography>
        <Typography>elevation: 2</Typography>
        <Typography>gap: 2</Typography>
      </Container>
    </div>
  );
};

export { ContainerExamples };
export default ContainerExamples;
