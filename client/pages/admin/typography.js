import PropTypes from 'prop-types';
import React from 'react';

import PageHeader from '../../components/PageHeader';
import AdminOnly from '../../components/AdminOnly';

// examples
import {
  TypographyExamples,
  ButtonExamples,
  ToolTipExamples,
  RenderInputExamples,
  ExamplePdfExamples,
} from '../../components/StyleExamples';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const EXAMPLES_CONF = [
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
