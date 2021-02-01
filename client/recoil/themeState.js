import { atom } from 'recoil';
import themeBase from '@/Themes/main';
// palettes
import mainPalette from '@/Themes/palettes/mainPalette';
// typographys
import azoSansTypography from '@/Themes/typographys/azoSansTypography';
import robotoTypography from '@/Themes/typographys/robotoTypography';

const mainTheme = {
  ...themeBase,
  ...robotoTypography,
  ...mainPalette,
};

const themeState = atom({
  key: 'themeState',
  default: {
    ...mainTheme,
  },
});

export { themeState, mainTheme };
