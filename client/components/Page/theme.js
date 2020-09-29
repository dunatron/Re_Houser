// theme typography
import themeTypography from '@/Styles/_themeTypography';
import muiTheme from '@/Styles/_muiTheme';
import { createMuiTheme } from '@material-ui/core/styles';

//https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react
//https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes
const theme = createMuiTheme({
  ...muiTheme,
  palette: {
    ...muiTheme.palette,
  },
  ...themeTypography,
});

export default theme;
