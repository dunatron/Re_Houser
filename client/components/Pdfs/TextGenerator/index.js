import RenderType from './RenderType';

const TextGenerator = ({ config }) => {
  return (
    <div>
      I will recieve a pdf config and know how to render plain html text based
      on that config
      {config.map((item, idx) => {
        return <RenderType key={idx} item={item} />;
      })}
    </div>
  );
};

export default TextGenerator;
