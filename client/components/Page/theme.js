// // theme typography
// import themeTypography from '@/Styles/_themeTypography';
// import muiTheme from '@/Styles/_muiTheme';
// import { createMuiTheme } from '@material-ui/core/styles';

// //https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react
// //https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes
// const theme = createMuiTheme({
//   ...muiTheme,
//   palette: {
//     ...muiTheme.palette,
//   },
//   ...themeTypography,
// });

// export default theme;

// theme typography
// import { useState } from 'React';
// import themeTypography from '@/Styles/_themeTypography';
// import muiTheme from '@/Styles/_muiTheme';
// import { createMuiTheme } from '@material-ui/core/styles';

// //https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react
// //https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes
// const tronTheme = () => {
//   const [typography, setTypography] = useState('');

//   const theme = createMuiTheme({
//     ...muiTheme,
//     palette: {
//       ...muiTheme.palette,
//     },
//     ...themeTypography,
//   });
//   return theme;
// };

// export default tronTheme;

// import { useState } from 'React';
// import themeTypography from '@/Styles/_themeTypography';
// import muiTheme from '@/Styles/_muiTheme';
// import { createMuiTheme } from '@material-ui/core/styles';

// import { useQuery } from '@apollo/client';
// import PropTypes from 'prop-types';
// import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

// //https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react
// //https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes
// const useTronTheme = () => {
//   // const [typography, setTypography] = useState('');
//   const { data, error, loading } = useQuery(CURRENT_USER_QUERY);

//   if (loading) return {};
//   // return {
//   //   data,
//   //   error,
//   //   loading,
//   // };

//   const theme = createMuiTheme({
//     ...muiTheme,
//     palette: {
//       ...muiTheme.palette,
//     },
//     ...themeTypography,
//   });
//   return theme;
// };

// export default useTronTheme;

import { useState } from 'React';
import themeTypography from '@/Styles/_themeTypography';
import muiTheme from '@/Styles/_muiTheme';
import { createMuiTheme } from '@material-ui/core/styles';

import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

//https://www.58bits.com/blog/2020/05/27/material-ui-theme-switcher-react
//https://egghead.io/lessons/react-create-a-react-hook-to-toggle-between-light-and-dark-mode-inside-of-material-ui-themes
const useTronTheme = () => {
  const theme = createMuiTheme({
    ...muiTheme,
    palette: {
      ...muiTheme.palette,
    },
    ...themeTypography,
  });
  return theme;
};

export default useTronTheme;
