import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from '@material-ui/core/styles';

const CustomRecaptcha = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.type === 'dark' ? true : false;
  return (
    <ReCAPTCHA
      ref={ref}
      sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
      theme={isDarkTheme ? 'dark' : 'light'}
      {...props}
    />
  );
});

export default CustomRecaptcha;
