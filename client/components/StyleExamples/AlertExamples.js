import useStyles from './useStyles';
import Alert from '@/Components/Alert';
import { Typography } from '@material-ui/core';
import Container from '@/Components/Container';
import Section from '@/Components/Section';

const AlertExamples = () => {
  const classes = useStyles();
  return (
    <Section full>
      <Typography gutterBottom>Basic Alert Examples</Typography>
      <Container full flex elevation={1} gap={1} botSpace={5}>
        <Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert severity="warning">
          This is a warning alert — check it out!
        </Alert>
        <Alert severity="info">This is an info alert — check it out!</Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </Container>
      <Container full flex elevation={1} gap={5} botSpace={5}>
        <Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert severity="warning">
          This is a warning alert — check it out!
        </Alert>
        <Alert severity="info">This is an info alert — check it out!</Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </Container>
      <Container full flex elevation={1} gap={2} botSpace={5} padding={3}>
        <Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert severity="warning">
          This is a warning alert — check it out!
        </Alert>
        <Alert severity="info">This is an info alert — check it out!</Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </Container>
      <Typography>Basic Alert Examples</Typography>
      <Container botSpace={1} padding={1} botSpace={5}>
        <Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert severity="warning">
          This is a warning alert — check it out!
        </Alert>
        <Alert severity="info">This is an info alert — check it out!</Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>
      </Container>
    </Section>
  );
};

export { AlertExamples };
export default AlertExamples;
