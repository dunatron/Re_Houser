import { atom } from 'recoil';
import themeBase from '@/Themes/main';
// palettes
import mainPalette from '@/Themes/palettes/mainPalette';
// overrides
import mainOverrides from '@/Themes/overrides/mainOverride';
// typographys
import dyslexiaTypography from '@/Themes/typographys/dyslexiaTypography';
import nexaTypography from '@/Themes/typographys/nexaTypography';

const mainTheme = {
  ...themeBase,
  ...mainPalette,
  ...mainOverrides,
  ...nexaTypography,
  // ...dyslexiaTypography,
};

const themeState = atom({
  key: 'themeState',
  default: {
    ...mainTheme,
  },
});

export { themeState, mainTheme };
