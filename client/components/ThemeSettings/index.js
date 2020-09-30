import { useRecoilState } from 'recoil';
import { themeState, mainTheme } from '@/Recoil/themeState';
import { Typography, ButtonGroup, Button } from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';
// mui theme base + custom root variables shared with all
import themeBase from '@/Themes/main';
import originalMuiTheme from '@/Themes/originalMui';
// palettes
import mainPalette from '@/Themes/palettes/mainPalette';
import darkPalette from '@/Themes/palettes/darkPalette';
// overrides
import mainOverrides from '@/Themes/overrides/mainOverride';
// typographys
import mainTypography from '@/Themes/typographys/mainTypography';
import dyslexiaTypography from '@/Themes/typographys/dyslexiaTypography';

const ThemeSettings = () => {
  const [themeObj, setThemeObj] = useRecoilState(themeState);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Theme Overview
      </Typography>
      <Button
        onClick={() => setThemeObj({ ...themeBase, ...originalMuiTheme })}>
        Reset to MUI Base
      </Button>
      <RehouserPaper>
        <Typography variant="h6" gutterBottom>
          Palette slices
        </Typography>
        <ButtonGroup size="small" orientation="vertical">
          <Button onClick={() => setThemeObj({ ...themeObj, ...mainPalette })}>
            Apply main Palette
          </Button>
          <Button onClick={() => setThemeObj({ ...themeObj, ...darkPalette })}>
            Apply dark Palette
          </Button>
        </ButtonGroup>
      </RehouserPaper>
      <RehouserPaper>
        <Typography variant="h6" gutterBottom>
          Overrides slices
        </Typography>
        <ButtonGroup size="small" orientation="vertical">
          <Button
            onClick={() => setThemeObj({ ...themeObj, ...mainOverrides })}>
            Apply main overrides
          </Button>
        </ButtonGroup>
      </RehouserPaper>
      <RehouserPaper>
        <Typography variant="h6" gutterBottom>
          Typography slices
        </Typography>
        <ButtonGroup size="small" orientation="vertical">
          <Button
            onClick={() => setThemeObj({ ...themeObj, ...mainTypography })}>
            Apply main typography
          </Button>
          <Button
            onClick={() => setThemeObj({ ...themeObj, ...dyslexiaTypography })}>
            Apply dyslexia typography
          </Button>
        </ButtonGroup>
      </RehouserPaper>
      <RehouserPaper>
        <Typography variant="h6" gutterBottom>
          Set Full Themes
        </Typography>
        <ButtonGroup size="small" orientation="vertical">
          <Button onClick={() => setThemeObj(mainTheme)}>set main theme</Button>
        </ButtonGroup>
      </RehouserPaper>
    </>
  );
};

export default ThemeSettings;
