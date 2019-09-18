import green from "@material-ui/core/colors/green";
// const theme = {
//   direction: "ltr",
//   maxWidth: 1200,
//   red: "#FF0000",
//   black: "#393939",
//   grey: "#3A3A3A",
//   lightgrey: "#E1E1E1",
//   offWhite: "#EDEDED",
//   maxWidth: "1000px",
//   bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
//   palette: {
//     common: {
//       black: "#393939",
//       white: "#fff",
//       grey: "#8B949C",
//       lightGrey: "#E1E1E1",
//     },
//     type: "light",
//     // primary: {
//     //   light: "#6d6d6d",
//     //   main: "#424242",
//     //   dark: "#1b1b1b",
//     //   contrastText: "#ffffff",
//     // },
//     primary: green,
//     secondary: {
//       light: "#ff5bb1",
//       main: "#dd1482",
//       dark: "#a60056",
//       contrastText: "#ffffff",
//     },
//     error: {
//       light: "#e57373",
//       main: "#f44336",
//       dark: "#d32f2f",
//       contrastText: "#fff",
//     },
//     grey: {
//       50: "#fafafa",
//       100: "#f5f5f5",
//       200: "#eeeeee",
//       300: "#e0e0e0",
//       400: "#bdbdbd",
//       500: "#9e9e9e",
//       600: "#757575",
//       700: "#616161",
//       800: "#424242",
//       900: "#212121",
//       A100: "#d5d5d5",
//       A200: "#aaaaaa",
//       A400: "#303030",
//       A700: "#616161",
//     },
//     shades: {
//       dark: {
//         text: {
//           primary: "rgba(255, 255, 255, 1)",
//           secondary: "rgba(255, 255, 255, 0.7)",
//           disabled: "rgba(255, 255, 255, 0.5)",
//           hint: "rgba(255, 255, 255, 0.5)",
//           icon: "rgba(255, 255, 255, 0.5)",
//           divider: "rgba(255, 255, 255, 0.12)",
//           lightDivider: "rgba(255, 255, 255, 0.075)",
//         },
//         input: {
//           bottomLine: "rgba(255, 255, 255, 0.7)",
//           helperText: "rgba(255, 255, 255, 0.7)",
//           labelText: "rgba(255, 255, 255, 0.7)",
//           inputText: "rgba(255, 255, 255, 1)",
//           disabled: "rgba(255, 255, 255, 0.5)",
//         },
//         action: {
//           active: "rgba(255, 255, 255, 1)",
//           disabled: "rgba(255, 255, 255, 0.3)",
//         },
//         background: {
//           default: "#303030",
//           paper: "#424242",
//           appBar: "#212121",
//           contentFrame: "#212121",
//         },
//         line: {
//           stepper: "#bdbdbd",
//         },
//       },
//       light: {
//         text: {
//           primary: "rgba(0, 0, 0, 0.87)",
//           secondary: "rgba(0, 0, 0, 0.54)",
//           disabled: "rgba(0, 0, 0, 0.38)",
//           hint: "rgba(0, 0, 0, 0.38)",
//           icon: "rgba(0, 0, 0, 0.38)",
//           divider: "rgba(0, 0, 0, 0.12)",
//           lightDivider: "rgba(0, 0, 0, 0.075)",
//         },
//         input: {
//           bottomLine: "rgba(0, 0, 0, 0.42)",
//           helperText: "rgba(0, 0, 0, 0.54)",
//           labelText: "rgba(0, 0, 0, 0.54)",
//           inputText: "rgba(0, 0, 0, 0.87)",
//           disabled: "rgba(0, 0, 0, 0.42)",
//         },
//         action: {
//           active: "rgba(0, 0, 0, 0.54)",
//           disabled: "rgba(0, 0, 0, 0.26)",
//         },
//         background: {
//           default: "#fafafa",
//           paper: "#fff",
//           appBar: "#f5f5f5",
//           contentFrame: "#eeeeee",
//         },
//         line: {
//           stepper: "#bdbdbd",
//         },
//       },
//     },
//     text: {
//       primary: "rgba(0, 0, 0, 0.87)",
//       secondary: "rgba(0, 0, 0, 0.54)",
//       // primary: "rgba(255, 255, 255, 1)",
//       // secondary: "rgba(255, 255, 255, 1)",
//       disabled: "rgba(0, 0, 0, 0.38)",
//       hint: "rgba(0, 0, 0, 0.38)",
//       icon: "rgba(0, 0, 0, 0.38)",
//       divider: "rgba(0, 0, 0, 0.12)",
//       lightDivider: "rgba(0, 0, 0, 0.075)",
//     },
//     input: {
//       bottomLine: "rgba(0, 0, 0, 0.42)",
//       helperText: "rgba(0, 0, 0, 0.54)",
//       labelText: "rgba(0, 0, 0, 0.54)",
//       inputText: "rgba(0, 0, 0, 0.87)",
//       disabled: "rgba(0, 0, 0, 0.42)",
//     },
//     action: {
//       active: "rgba(0, 0, 0, 0.54)",
//       disabled: "rgba(0, 0, 0, 0.26)",
//     },
//     background: {
//       default: "#fafafa",
//       paper: "#fff",
//       appBar: "#f5f5f5",
//       contentFrame: "#eeeeee",
//     },
//     line: {
//       stepper: "#bdbdbd",
//     },
//   },
//   typography: {
//     useNextVariants: true,
//     fontFamily: "GustanMedium",
//     fontSize: "1.5rem",
//     fontWeightLight: 300,
//     fontWeightRegular: 400,
//     fontWeightMedium: 500,
//     sectionIntro: {
//       fontSize: "2rem",
//       fontWeight: 100,
//       fontFamily: "GustanLight",
//       letterSpacing: "-.04em",
//       lineHeight: "1.14286em",
//       marginLeft: "-.06em",
//       color: "rgba(0, 0, 0, 0.54)",
//     },
//     display4: {
//       fontSize: "7rem",
//       fontWeight: 300,
//       fontFamily: "GustanLight",
//       letterSpacing: "-.04em",
//       lineHeight: "1.14286em",
//       marginLeft: "-.06em",
//       color: "rgba(0, 0, 0, 0.54)",
//     },
//     display3: {
//       fontSize: "3.5rem",
//       fontWeight: 400,
//       fontFamily: "GustanLight",
//       letterSpacing: "-.02em",
//       lineHeight: "1.30357em",
//       marginLeft: "-.04em",
//       color: "rgba(0, 0, 0, 0.54)",
//     },
//     display2: {
//       fontSize: "2.8125rem",
//       fontWeight: 400,
//       fontFamily: "GustanLight",
//       lineHeight: "1.06667em",
//       marginLeft: "-.04em",
//       color: "rgba(0, 0, 0, 0.54)",
//     },
//     display1: {
//       fontSize: "2.125rem",
//       fontWeight: 400,
//       fontFamily: "GustanLight",
//       lineHeight: "1.20588em",
//       marginLeft: "-.04em",
//       color: "rgba(0, 0, 0, 0.54)",
//     },
//     headline: {
//       fontSize: "1.5rem",
//       fontWeight: 400,
//       fontFamily: "GustanLight",
//       lineHeight: "1.35417em",
//       color: "rgba(0, 0, 0, 0.87)",
//     },
//     title: {
//       fontSize: "1.3125rem",
//       fontWeight: 500,
//       fontFamily: "GustanLight",
//       lineHeight: "1.16667em",
//       color: "rgba(0, 0, 0, 0.87)",
//     },
//     subheading: {
//       fontSize: "1.2rem",
//       fontWeight: 400,
//       fontFamily: "GustanMedium",
//       lineHeight: "1.5em",
//       color: "rgba(0, 0, 0, 0.87)",
//     },
//     body2: {
//       fontSize: "0.875rem",
//       fontWeight: 500,
//       fontFamily: "GustanLight",
//       lineHeight: "1.71429em",
//       color: "rgba(0, 0, 0, 0.87)",
//     },
//     body1: {
//       fontSize: "1rem",
//       fontWeight: 100,
//       fontFamily: "GustanLight",
//       lineHeight: "1.46429em",
//       color: "rgba(0, 0, 0, 0.87)",
//     },
//     caption: {
//       fontSize: "0.75rem",
//       fontWeight: 400,
//       fontFamily: "GustanLight",
//       lineHeight: "1.375em",
//       color: "rgba(0, 0, 0, 0.54)",
//     },
//     button: {
//       fontSize: "0.875rem",
//       textTransform: "uppercase",
//       fontWeight: 500,
//       fontFamily: "GustanMedium",
//     },
//   },
//   mixins: {
//     toolbar: {
//       minHeight: 56,
//       "@media (min-width:0px) and (orientation: landscape)": {
//         minHeight: 48,
//       },
//       "@media (min-width:600px)": {
//         minHeight: 64,
//       },
//     },
//   },
//   breakpoints: {
//     keys: ["xs", "sm", "md", "lg", "xl"],
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 960,
//       lg: 1280,
//       xl: 1920,
//     },
//   },
//   shadows: [
//     "none",
//     "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
//     "0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
//     "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
//     "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
//     "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
//     "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
//     "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
//     "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
//     "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
//     "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
//     "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
//     "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
//     "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
//     "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
//     "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
//     "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
//     "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
//     "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
//     "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
//     "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
//     "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
//     "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
//     "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
//     "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
//   ],
//   transitions: {
//     easing: {
//       easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
//       easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
//       easeIn: "cubic-bezier(0.4, 0, 1, 1)",
//       sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
//     },
//     duration: {
//       shortest: 150,
//       shorter: 200,
//       short: 250,
//       standard: 300,
//       complex: 375,
//       enteringScreen: 225,
//       leavingScreen: 195,
//     },
//   },
//   spacing: {
//     unit: 8,
//   },
//   zIndex: {
//     mobileStepper: 900,
//     menu: 1000,
//     appBar: 1100,
//     drawerOverlay: 1200,
//     navDrawer: 1300,
//     dialogOverlay: 1400,
//     dialog: 1500,
//     layer: 2000,
//     popover: 2100,
//     snackbar: 2900,
//     tooltip: 3000,
//   },
//   // Additionals
// form: {
//   fields: {
//     marginTop: "16px",
//     // fontSize: "2rem",
//     minWidth: "120px",
//     maxWidth: "300px",
//   },
// },
// }

const theme = {
  direction: "ltr",
  maxWidth: 1200,
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }
  },

  form: {
    fields: {
      marginTop: "16px",
      fontSize: "2rem",
      minWidth: "120px",
      maxWidth: "300px"
    }
  },
  direction: "ltr",
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:0px) and (orientation: landscape)": { minHeight: 48 },
      "@media (min-width:600px)": { minHeight: 64 }
    }
  },
  overrides: {},
  palette: {
    common: { black: "#000", white: "#fff" },
    type: "light",
    // primary: {
    //   light: "#7986cb",
    //   main: "#3f51b5",
    //   dark: "#303f9f",
    //   contrastText: "#fff",
    // },
    // secondary: {
    //   light: "#ff4081",
    //   main: "#f50057",
    //   dark: "#c51162",
    //   contrastText: "#fff",
    // },
    // primary: {
    //   light: "#6d6d6d",
    //   main: "#424242",
    //   dark: "#1b1b1b",
    //   contrastText: "#ffffff",
    // },
    // primary: green,
    // primary: {
    //   light: "#000",
    //   main: "#000",
    //   dark: "#000",
    //   contrastText: "#ffffff",
    // },
    // secondary: {
    //   light: "#000",
    //   main: "#000",
    //   dark: "#000",
    //   contrastText: "#ffffff",
    // },
    // Black on black below
    primary: {
      light: "#000",
      main: "#000",
      dark: "#000",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#000",
      main: "#000",
      dark: "#000",
      contrastText: "#ffffff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: { paper: "#fff", default: "#fafafa" },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(0, 0, 0, 0.14)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)"
    }
  },
  props: {},
  shadows: [
    "none",
    "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    "0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)",
    "0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
  ],
  typography: {
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontFamily: "GustanMedium",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    display4: {
      fontSize: "7rem",
      fontWeight: 300,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: "-.04em",
      lineHeight: "1.14286em",
      marginLeft: "-.04em",
      color: "rgba(0, 0, 0, 0.54)"
    },
    display3: {
      fontSize: "3.5rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      letterSpacing: "-.02em",
      lineHeight: "1.30357em",
      marginLeft: "-.02em",
      color: "rgba(0, 0, 0, 0.54)"
    },
    display2: {
      fontSize: "2.8125rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.13333em",
      marginLeft: "-.02em",
      color: "rgba(0, 0, 0, 0.54)"
    },
    display1: {
      fontSize: "2.125rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.20588em",
      color: "rgba(0, 0, 0, 0.54)"
    },
    headline: {
      fontSize: "1.5rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.35417em",
      color: "rgba(0, 0, 0, 0.87)"
    },
    title: {
      fontSize: "1.3125rem",
      fontWeight: 500,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.16667em",
      color: "rgba(0, 0, 0, 0.87)"
    },
    subheading: {
      fontSize: "1rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.5em",
      color: "rgba(0, 0, 0, 0.87)"
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.71429em",
      color: "rgba(0, 0, 0, 0.87)"
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.46429em",
      color: "rgba(0, 0, 0, 0.87)"
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: "1.375em",
      color: "rgba(0, 0, 0, 0.54)"
    },
    button: {
      fontSize: "0.875rem",
      textTransform: "uppercase",
      fontWeight: 500,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      color: "rgba(0, 0, 0, 0.87)"
    },
    h1: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: "6rem",
      lineHeight: 1,
      letterSpacing: "-0.01562em"
    },
    h2: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 300,
      fontSize: "3.75rem",
      lineHeight: 1,
      letterSpacing: "-0.00833em"
    },
    h3: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "3rem",
      lineHeight: 1.04,
      letterSpacing: "0em"
    },
    h4: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "2.125rem",
      lineHeight: 1.17,
      letterSpacing: "0.00735em"
    },
    h5: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.33,
      letterSpacing: "0em"
    },
    h6: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.6,
      letterSpacing: "0.0075em"
    },
    subtitle1: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      letterSpacing: "0.00938em"
    },
    subtitle2: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.57,
      letterSpacing: "0.00714em"
    },
    body1Next: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em"
    },
    body2Next: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.01071em"
    },
    buttonNext: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "1.375rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase"
    },
    captionNext: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em"
    },
    overline: {
      color: "rgba(0, 0, 0, 0.87)",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase"
    },
    useNextVariants: true
  },
  shape: { borderRadius: 4 },
  spacing: { unit: 8 },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  },
  zIndex: {
    mobileStepper: 1000,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  }
};
export default theme;
