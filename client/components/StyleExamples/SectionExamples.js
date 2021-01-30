import useStyles from './useStyles';
import Alert from '@/Components/Alert';
import { Typography } from '@material-ui/core';
import Section from '@/Components/Section';

const SectionExamples = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Section>
        <Typography>
          Here is a BAsic Section. You Might not be able to tell but I am
          atcually wrapped in a section
        </Typography>
      </Section>
      <Section elevation={1}>
        <Typography>Section With elevation set to 1</Typography>
      </Section>
      <Section elevation={2}>
        <Typography>Section With elevation set to 1</Typography>
      </Section>
      <Section elevation={3}>
        <Typography>Section With elevation set to 1</Typography>
      </Section>
      <Section elevation={2}>
        <Typography>I am A block COntainer</Typography>
      </Section>
      <Section elevation={2} spacing={2}>
        <Typography>I am A block COntainer with spacing set to 2</Typography>
      </Section>
      <Section elevation={2} spacing={2} topSpace={5} inline>
        <Typography>
          I am A inline COntainer with spacing set to 2 and then topSpace set to
          5
        </Typography>
      </Section>
      <Section elevation={1} spacing={1} padding={1}>
        <Typography>I am A simple Section with padding set to 1</Typography>
        <Typography>spacing 1</Typography>
        <Typography>padding: 1</Typography>
        <Typography>elevation: 1</Typography>
      </Section>
      <Section elevation={1} spacing={1} padding={1} inline>
        <Typography>I am a square container using inline layout</Typography>
        <Typography>spacing 1</Typography>
        <Typography>padding: 1</Typography>
        <Typography>elevation: 1</Typography>
        <Typography>inline</Typography>
      </Section>
      <Section elevation={1} spacing={1} padding={1} inline>
        <Typography>I am a square container using inline layout</Typography>
        <Typography>spacing 1</Typography>
        <Typography>padding: 1</Typography>
        <Typography>elevation: 1</Typography>
        <Typography>inline</Typography>
      </Section>
      <Section elevation={1} spacing={1} padding={1} square>
        <Typography>I am a square container using inline layout</Typography>
        <Typography>spacing 1</Typography>
        <Typography>padding: 1</Typography>
        <Typography>elevation: 1</Typography>
        <Typography>inline</Typography>
      </Section>
      <Section spacing={1} padding={1}>
        <Typography>I am a square container using inline layout</Typography>
        <Typography>spacing 1</Typography>
        <Typography>padding: 1</Typography>
        <Typography>elevation: 1</Typography>
        <Typography>inline</Typography>
      </Section>
      <Section spacing={1} padding={1}>
        <Typography>I am a square container using inline layout</Typography>
        <Typography>spacing 1</Typography>
        <Typography>padding: 1</Typography>
        <Typography>elevation: 1</Typography>
        <Typography>inline</Typography>
      </Section>
      <Section spacing={1} padding={1}>
        Section With spacing 1 and padding 1
        <Section spacing={1} padding={1}>
          <Typography>A Section within a Section</Typography>
          <Typography>spacing 1</Typography>
          <Typography>padding: 1</Typography>
          <Typography>elevation: 1</Typography>
          <Typography>inline</Typography>
        </Section>
      </Section>
    </div>
  );
};

export { SectionExamples };
export default SectionExamples;
