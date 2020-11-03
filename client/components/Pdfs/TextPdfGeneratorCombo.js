import { useState } from 'react';

import { Typography, Button } from '@material-ui/core';

import PdfTextGenerator from './TextGenerator';
import PdfGenerator from './PdfGenerator';
import Card from '@/Styles/Card';

const TextPdfGeneratorCombo = ({ config, docConf }) => {
  const [open, setOpen] = useState(false);
  const title = docConf.title;

  const handleToggleOpen = () => setOpen(!open);

  return (
    <Card>
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
    </Card>
  );
};

export default TextPdfGeneratorCombo;
