const theme = {
  overrides: {
    // .MuiAppBar-colorPrimary
    MuiAppBar: {
      colorPrimary: {
        // color: mainPrimaryColor,
        // backgroundColor: '#ffffff',
      },
      colorSecondary: {
        // backgroundColor: '#ffffff',
        // color: mainPrimaryColor,
      },
    },
    MuiTooltipPopper: {
      border: '2px solid red',
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1.0em',
      },
    },
    MuiTooltipTooltip: {},
    MuiButton: {
      root: {
        // fontSize: '1rem',
        // backgroundColor: 'inherit',
      },
      contained: {
        // color: mainPrimaryColor,
        // backgroundColor: '#fff',
      },
      containedPrimary: {
        // color: '#fff',
      },
      containedSecondary: {
        // color: '#fff',
      },
    },
    MuiButtonBase: {
      root: {
        color: 'inherit',
      },
    },
    MuiIconButton: {
      root: { color: 'inherit' },
      label: { color: 'inherit' },
    },
    MuiInputBase: {
      root: {
        color: 'inherit',
      },
    },
    MuiListItem: {},
    MuiListItemIcon: {
      root: {
        minWidth: '56px', // originally 56px // and so it should be, u used wrong component
      },
      alignItemsFlexStart: {},
    },
    // MuiDrawer: {
    //   // root: {
    //   //   width: '120px',
    //   // },
    //   // paper: {
    //   //   width: '120px',
    //   // },
    // },
    // // PICKERS override
    // MuiPickersToolbar: {
    //   toolbar: {
    //     // backgroundColor: lightBlue.A200,
    //     // backgroundColor: lightBlue.A200,
    //   },
    // },
    // MuiPickersCalendarHeader: {
    //   switchHeader: {
    //     // backgroundColor: lightBlue.A200,
    //     // color: "white",
    //   },
    // },
    // MuiPickersDay: {
    //   day: {
    //     // color: lightBlue.A700,
    //     // color: lightBlue.A700,
    //   },
    //   daySelected: {
    //     // backgroundColor: lightBlue['400'],
    //     // backgroundColor: lightBlue['400'],
    //   },
    //   dayDisabled: {
    //     // color: lightBlue['100'],
    //     // color: lightBlue['100'],
    //   },
    //   current: {
    //     // color: lightBlue['900'],
    //     // color: lightBlue['900'],
    //   },
    // },
    // MuiPickersModal: {
    //   dialogAction: {
    //     // color: lightBlue['400'],
    //     // color: lightBlue['400'],
    //   },
    // },
  },
};
export default theme;
