import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme } from '@material-ui/core/styles';
import ChatsBar from '@/Components/RehouserChat/ChatsBar';
import useStyles from './useStyles';

import AppMenuBar from './AppMenuBar';
import Footer from '@/Components/Footer';
import LoginModal from './LoginModal';
import AppDrawer from './AppDrawer';
import { store } from '@/Store/index';
import Announcements from '@/Components/Announcements';
import IsOnline from './IsOnline';
/**
 *
 * This CUNT IS RERENDERING LIKE EVERYTHING WHEN WE OPEN THE FUCKEN SIDEBAR
 * ALSO WHEN WE CLICK ON THINGS IT SHOULD JUST BE THE MIDDLE CONTENT RERENDERING plus like the url etc
 */
function MaterialPage(props) {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const theme = useTheme();
  const classes = useStyles();

  console.log('Props in Material Page => ', props);
  const { container, appData } = props;
  const { currentUser } = appData;

  const me = currentUser.data ? currentUser.data.me : null;

  // hmm not entireyy sure why this all rerenders when we open the sidebar
  // could be the fact that we are. I have no idea clutching at strawa here. cloning and putting data into children
  // using context global state. material, changing the layout essentially. could be a flag. assuming it would push content to the side etc.
  // but then you would assume the sheet just gets offset.
  // maybe memo the children. but into a function that depends on the children key changing ony...
  // I actually have no idea
  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        appData: {
          ...props.appData, // has other shit we dont want
        },
      });
    }
    return child;
  });

  useEffect(() => {
    console.log('render: Material Page useEffect');
    return () => {
      console.log('render: Material Page useEffect cleanup');
    };
  }, []);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        {/* Header */}
        <AppMenuBar
          {...props}
          handleDrawerToggle={() => {
            dispatch({
              type: 'updateState',
              payload: {
                sideBarOpen: !state.sideBarOpen,
              },
            });
          }}
        />
        <AppDrawer me={me} />

        <main className={classes.content} id="main-content">
          <div className={classes.toolbar} />
          <div
            style={{
              maxWidth: '1080px',
              margin: 'auto',
            }}>
            <Announcements bannerRoutes={['/']} me={me} />
            {children}
          </div>
          <IsOnline />
          <Footer />
        </main>
        {me && <ChatsBar me={me} />}
        <LoginModal />
      </div>
    </>
  );
}

MaterialPage.propTypes = {
  appData: PropTypes.any,
  children: PropTypes.any,
  container: PropTypes.any,
};

export default MaterialPage;
