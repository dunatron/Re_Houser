import PropTypes from "prop-types";
import RehouserPaper from '../../styles/RehouserPaper';
import { Typography } from '@material-ui/core';
import Head from 'next/head';

const PagerHeader = ({
  title,
  id,
  titleOverride,
  titleVariant,
  intro,
  children,
  metaData,
}) => {
  return (
    <div style={{ maxWidth: '800px' }} id={id}>
      {metaData && (
        <Head>
          <meta name="description" content={metaData.content} />
          <title>{metaData.title}</title>
        </Head>
      )}
      {titleOverride && titleOverride}
      {title && (
        <Typography
          variant={titleVariant ? titleVariant : 'h1'}
          // color="primary"
          component="h1"
          gutterBottom={intro ? false : true}>
          {title}
        </Typography>
      )}

      {intro && <Typography gutterBottom>{intro}</Typography>}
      {children}
    </div>
  );
};

PagerHeader.propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  intro: PropTypes.any.isRequired,
  metaData: PropTypes.shape({
    content: PropTypes.any,
    title: PropTypes.any
  }).isRequired,
  title: PropTypes.any.isRequired,
  titleOverride: PropTypes.any.isRequired,
  titleVariant: PropTypes.any.isRequired
}

export default PagerHeader;
