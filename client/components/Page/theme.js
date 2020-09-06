// theme typography
import themeTypography from '../../styles/_themeTypography';
import muiTheme from '../../styles/_muiTheme';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
  },
  ...themeTypography,
});

export default theme;
