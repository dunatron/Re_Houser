const TextGenerator = ({ config }) => {
  return (
    <div>
      I will recieve a pdf config and know how to render plain html text based
      on that config
      {config.map((item, idx) => {
        return <div>A config Item: {item.type}</div>;
      })}
    </div>
  );
};

export default TextGenerator;
