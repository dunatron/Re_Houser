import RehouserPaper from '../../styles/RehouserPaper';
import { Typography } from '@material-ui/core';
import Head from 'next/head';

const PagerHeader = ({
  title,
  titleOverride,
  titleVariant,
  intro,
  children,
  metaData,
}) => {
  return (
    <div style={{ maxWidth: '800px' }}>
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

export default PagerHeader;
