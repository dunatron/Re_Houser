import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Head from 'next/head';

const PageHeader = ({
  title,
  id,
  titleOverride,
  titleVariant,
  intro,
  children,
  metaData,
  hidden,
}) => {
  return (
    <div id={id}>
      {metaData && (
        <Head>
          <meta name="description" content={metaData.content} />
          <title>{metaData.title}</title>
        </Head>
      )}
      {titleOverride && titleOverride}
      {title && (
        <Typography
          display="block" // initial, block, inline
          hidden={hidden}
          variant={titleVariant ? titleVariant : 'h1'}
          // color="primary"
          component="h1"
          gutterBottom={intro ? false : true}>
          {title}
        </Typography>
      )}

      {intro && (
        <Typography gutterBottom hidden={hidden}>
          {intro}
        </Typography>
      )}
      {!hidden && children}
    </div>
  );
};

PageHeader.propTypes = {
  children: PropTypes.any,
  id: PropTypes.any,
  hidden: PropTypes.bool,
  intro: PropTypes.any,
  metaData: PropTypes.shape({
    content: PropTypes.any,
    title: PropTypes.any,
  }),
  title: PropTypes.any,
  titleOverride: PropTypes.any,
  titleVariant: PropTypes.any,
};

export default PageHeader;
