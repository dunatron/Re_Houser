// import dynamic from 'next/dynamic';

// const DynamicWidget = dynamic('./Widget', {
//   // ssr: false,
//   // loading: () => {
//   //   return <div>LOading CLoudinary widget</div>;
//   // },
// });

// export default DynamicWidget;

import dynamic from 'next/dynamic';

const DynamicComponentWithCustomLoading = dynamic(() => import('./Widget'), {
  loading: () => <p>...</p>,
});

export default DynamicComponentWithCustomLoading;
