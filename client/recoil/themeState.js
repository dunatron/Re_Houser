import { atom } from 'recoil';
import themeBase from '@/Themes/main';
// palettes
import mainPalette from '@/Themes/palettes/mainPalette';
// overrides
import mainOverrides from '@/Themes/overrides/mainOverride';
// typographys
import azoSansTypography from '@/Themes/typographys/azoSansTypography';
import robotoTypography from '@/Themes/typographys/robotoTypography';

const mainTheme = {
  ...themeBase,
  ...mainPalette,
  ...mainOverrides,
  ...robotoTypography,
  // ...azoSansTypography,
};

const themeState = atom({
  key: 'themeState',
  default: {
    ...mainTheme,
  },
});

export { themeState, mainTheme };
