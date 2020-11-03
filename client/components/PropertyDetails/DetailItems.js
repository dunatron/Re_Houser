import UpdatePropertyVariable from './UpdatePropertyVariable';
import DetailItem from '@/Components/PropertyCard/DetailItem';
import RehouserPaper from '@/Styles/RehouserPaper';
import { Box, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  detailsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
  detailItem: {
    padding: '0 16px 16px 0',
    display: 'flex',
    alignItems: 'center',
  },
  variablesHeader: {
    marginTop: '16px',
    marginLeft: '16px',
  },
}));

const DetailItems = ({ title, property, items }) => {
  const classes = useStyles();
  return (
    <RehouserPaper>
      {title && (
        <Typography
          variant="h5"
          // color="primary"
          gutterBottom={true}
          className={classes.variablesHeader}>
          {title}
        </Typography>
      )}
      <div className={classes.detailsWrapper} square>
        {items &&
          items.map((item, idx) => {
            const itemVal = property[item.name];
            return (
              <Box component="div" className={classes.detailItem}>
                <DetailItem
                  icon={item.icon}
                  label={item.label}
                  value={itemVal}
                  type={item.type}
                />
                <UpdatePropertyVariable
                  propertyId={property.id}
                  name={item.name}
                  label={item.label}
                  type={item.type}
                  cy={item.name}
                  value={itemVal}
                />
              </Box>
            );
          })}
      </div>
    </RehouserPaper>
  );
};

export default DetailItems;
