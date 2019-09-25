import Router from 'next/router';

const BackButton = () => {
  return <div onClick={() => Router.back()}>Go Back</div>;
};

export default BackButton;
