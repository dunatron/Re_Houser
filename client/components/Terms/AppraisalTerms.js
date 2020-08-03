import { Typography } from '@material-ui/core';

const AppraisalTerms = () => {
  return (
    <div>
      <Typography gutterBottom>
        I authorise the Rehouser Property Management to:
      </Typography>
      <ul>
        <Typography component="li" gutterBottom>
          <Typography gutterBottom>
            collect, retain and use this information for the purpose of
            assessing a fair rental appraisal.
          </Typography>
        </Typography>
        <Typography component="li" gutterBottom>
          <Typography gutterBottom>
            use this information to contact you in relation to creating new
            business relationships in relation to Property Management.
          </Typography>
        </Typography>
      </ul>
    </div>
  );
};

export default AppraisalTerms;
