import { atom } from 'recoil';
import theme from '@/Styles/_muiTheme';
import themeTypography from '@/Styles/_themeTypography';

import { mainTheme } from '@/Components/ThemeSettings';

const themeState = atom({
  key: 'themeState',
  default: {
    ...mainTheme,
    // ...theme,
    // palette: {
    //   ...theme.palette,
    // },
    // ...themeTypography,
  },
});

export { themeState };
