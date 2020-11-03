import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Head from 'next/head';
import Card from '@/Styles/Card';

/**
 * Superstar will you make it ? the rise : or the fall
 * I feel like the world is falling, and I am rising
 * https://www.youtube.com/watch?v=Xiv6j6T7R6Q&ab_channel=LilWayne-Topic
 * https://www.youtube.com/watch?v=a6Kg-Upfqio&ab_channel=BlueRose102223
 *
 * @param {*} param0
 */
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
  if (!title) return null; // hidden dont work
  // if (hidden) return null; // hidden dont work
  return (
    <Card id={id} elevation={hidden ? 0 : 2}>
      {metaData && (
        <Head>
          <meta name="description" content={metaData.content} />
          <title>{metaData.title}</title>
        </Head>
      )}
      {titleOverride && !hidden && titleOverride}
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
        <Typography gutterBottom={false} hidden={hidden}>
          {intro}
        </Typography>
      )}
      {!hidden && children}
    </Card>
    // <Card id={id}>
    //   {metaData && (
    //     <Head>
    //       <meta name="description" content={metaData.content} />
    //       <title>{metaData.title}</title>
    //     </Head>
    //   )}
    //   {titleOverride && !hidden && titleOverride}
    //   {title && (
    //     <Typography
    //       display="block" // initial, block, inline
    //       hidden={hidden}
    //       variant={titleVariant ? titleVariant : 'h1'}
    //       // color="primary"
    //       component="h1"
    //       gutterBottom={intro ? false : true}>
    //       {title}
    //     </Typography>
    //   )}

    //   {intro && (
    //     <Typography gutterBottom={false} hidden={hidden}>
    //       {intro}
    //     </Typography>
    //   )}
    //   {!hidden && children}
    // </Card>
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
