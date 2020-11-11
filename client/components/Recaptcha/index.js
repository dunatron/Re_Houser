import ReCAPTCHA from 'react-google-recaptcha';
import { useTheme } from '@material-ui/core/styles';

const CustomRecaptcha = props => {
  const theme = useTheme();
  const isDarkTheme = theme.palette.type === 'dark' ? true : false;
  return (
    <ReCAPTCHA
      sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
      theme={isDarkTheme ? 'dark' : 'light'}
      {...props}
    />
  );
};

export default CustomRecaptcha;
// data-cy="signup-recaptcha-component"
// ref={recaptchaRef}
// sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
// onChange={token =>
//   setState({
//     ...state,
//     captchaToken: token,
//   })
// }

// make some PropTypes
