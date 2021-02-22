import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '@/Components/PageHeader';
import AdminOnly from '@/Components/AdminOnly';

// examples
import {
  TypographyExamples,
  ButtonExamples,
  ToolTipExamples,
  RenderInputExamples,
  ExamplePdfExamples,
  AlertExamples,
  SectionExamples,
  ContainerExamples,
} from '@/Components/StyleExamples';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RichTextEditor from '@/Components/RichTextEditor';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const EXAMPLES_CONF = [
  {
    label: 'COntainer Examples',
    component: <ContainerExamples />,
  },
  {
    label: 'Section Examples',
    component: <SectionExamples />,
  },

  {
    label: 'Typography Examples',
    component: <TypographyExamples />,
  },
  {
    label: 'Buttons Examples',
    component: <ButtonExamples />,
  },
  {
    label: 'Tooltip Examples',
    component: <ToolTipExamples />,
  },
  {
    label: 'Render Input Examples',
    component: <RenderInputExamples />,
  },
  {
    label: 'Pdf Examples',
    component: <ExamplePdfExamples />,
  },
  {
    label: 'Alert Examples',
    component: <AlertExamples />,
  },
  {
    label: 'Toast/Notifiction',
    component: (
      <div>
        <a
          target="_blank"
          href="https://fkhadra.github.io/react-toastify/introduction/?fbclid=IwAR0oopCjlLHWyUVYdYy7XFu6Lk9qKdCaW_3HFtYQP-hY9Yz--GxNb_ut1_w">
          Just CLICK ME, a demo speaks a thousand words. Let me know what conf
          you guys think
        </a>
      </div>
    ),
  },
  {
    label: 'Rich Text =)',
    component: <RichTextEditor />,
  },
];

const ExpansionExampleItem = ({ item }) => {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{item.label}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{item.component}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const ConnectedTypographyPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Rehouser Brand Styles"
        intro="Here are our global styles we have defined. I will try to expand on this collection, but the main parts are typography and buttons"
        metaData={{
          title: 'Admin Settings',
          content: 'Admin settings for subscriptions',
        }}
      />
      <AdminOnly me={me}>
        {EXAMPLES_CONF.map((item, i) => (
          <ExpansionExampleItem key={i} item={item} />
        ))}
      </AdminOnly>
    </>
  );
};

ExpansionExampleItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    component: PropTypes.elementType,
  }),
};

ConnectedTypographyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default ConnectedTypographyPage;
