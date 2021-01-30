export const overrides = {
  MuiAppBar: {
    colorPrimary: {},
    colorSecondary: {},
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
    root: {},
    contained: {},
    containedPrimary: {},
    containedSecondary: {},
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
  MUIRichTextEditor: {
    root: {},
    container: {},
    editor: {},
    toolbar: {},
    placeHolder: {
      position: 'relative',
    },
    anchorLink: {},
  },
  MuiAlert: {
    root: {
      marginBottom: '16px',
    },
    standardInfo: {
      // color: 'red !important',
    },
  },
};

export default overrides;
