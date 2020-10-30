import { atom } from 'recoil';
import themeBase from '@/Themes/main';
// palettes
import mainPalette from '@/Themes/palettes/mainPalette';
import darkPalette from '@/Themes/palettes/darkPalette';
// overrides
import mainOverrides from '@/Themes/overrides/mainOverride';
// typographys
import dyslexiaTypography from '@/Themes/typographys/dyslexiaTypography';
import nexaTypography from '@/Themes/typographys/nexaTypography';
import azoSansTypography from '@/Themes/typographys/azoSansTypography';

const mainTheme = {
  ...themeBase,
  ...mainPalette,
  // ...darkPalette,
  ...mainOverrides,
  ...azoSansTypography,
  // ...nexaTypography,
  // ...dyslexiaTypography,
};

const themeState = atom({
  key: 'themeState',
  default: {
    ...mainTheme,
  },
});

export { themeState, mainTheme };
