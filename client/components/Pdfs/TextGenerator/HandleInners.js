import RenderType from './RenderType';

const HandleInners = ({ inners }) => {
  if (!inners) return null;
  if (inners.length === 0) return null;
  return inners.map((inner, idx) => {
    return <RenderType key={idx} item={inner} />;
  });
};

export default HandleInners;
