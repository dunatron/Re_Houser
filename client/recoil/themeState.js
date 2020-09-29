import { atom } from 'recoil';
import theme from '@/Styles/_muiTheme';
import themeTypography from '@/Styles/_themeTypography';

const themeState = atom({
  key: 'themeState',
  default: {
    ...theme,
    palette: {
      ...theme.palette,
    },
    ...themeTypography,
  },
});

export { themeState };
