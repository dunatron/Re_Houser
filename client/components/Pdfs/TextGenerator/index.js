import RenderType from './RenderType';
import useStyles from '../useStyles';

const TextGenerator = ({ config }) => {
  const classes = useStyles();
  return (
    <div className={classes.webPdfDoc}>
      {config.map((item, idx) => {
        return <RenderType key={idx} item={item} />;
      })}
    </div>
  );
};

export default TextGenerator;
