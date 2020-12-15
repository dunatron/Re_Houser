import React from 'react';

import dynamic from 'next/dynamic';

const DynamicPdfGenerator = dynamic(() => import('./Generator'), {
  loading: props => <div>Pdf Generator will download last</div>,
  ssr: false,
});

export default DynamicPdfGenerator;
