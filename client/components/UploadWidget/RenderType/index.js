import RenderImage from './RenderImage';
import RenderVideo from './RenderVideo';

/**
 * pdfs resource type is image. You will need to use the config used in @lib/configs/fileCOnfigs
 * @param {*} param0
 */
const RenderType = ({ file }) => {
  if (!file) return null;
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
