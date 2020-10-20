import { useState } from 'react';

import { Typography, Button } from '@material-ui/core';

import PdfTextGenerator from './TextGenerator';
import PdfGenerator from './PdfGenerator';

const TextPdfGeneratorCombo = ({ config, docConf }) => {
  const [open, setOpen] = useState(false);
  const title = docConf.title;

  const handleToggleOpen = () => setOpen(!open);

  return (
    <>
      <PdfTextGenerator config={config} />
      <Button
        onClick={handleToggleOpen}
        variant="contained"
        style={{
          margin: '16px 0',
        }}>
        {open ? `Close ${title} Pdf` : `View ${title} as Pdf`}
      </Button>
      {open && <PdfGenerator config={config} docConf={docConf} />}
    </>
  );
};

export default TextPdfGeneratorCombo;
