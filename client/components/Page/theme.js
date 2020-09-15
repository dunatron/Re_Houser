// theme typography
import themeTypography from '@/Styles/_themeTypography';
import muiTheme from '@/Styles/_muiTheme';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
  },
  ...themeTypography,
});

export default theme;
