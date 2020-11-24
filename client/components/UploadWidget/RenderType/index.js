import RenderImage from './RenderImage';
import RenderVideo from './RenderVideo';

const RenderType = ({ file }) => {
  switch (file.resource_type) {
    case 'image':
      return <RenderImage file={file} />;
    case 'video':
      return <RenderVideo file={file} />;
    default:
      return <div>Cannot display</div>;
  }
};

export default RenderType;
