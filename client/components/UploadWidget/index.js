import dynamic from 'next/dynamic';

const NoSSRUploadWidget = dynamic(
  () => {
    return import('./Widget');
  },
  { ssr: false }
);

export default NoSSRUploadWidget;
