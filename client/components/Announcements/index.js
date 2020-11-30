import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import List from '@material-ui/core/List';
import ResendConfrimEmail from '@/Components/MutationButtons/ResendConfirmEmail';
import AnnouncementItem from './AnnouncementItem';

import { announcementStore, AnnouncementProvider } from './store';

const Announcements = ({ me, bannerRoutes }) => {
  const router = useRouter();
  const store = useContext(announcementStore);
  const { dispatch, state } = store;

  useEffect(() => {
    if (me) {
      if (!me.emailValidated) {
        dispatch({
          type: 'addAnnouncement',
          payload: {
            key: 'validate-email',
            text: `Email validation has not been completed. Please check your email for an account confirmation email`,
            type: 'todo',
            actions: [
              <ResendConfrimEmail color="inherit" variant="outlined">
                Resend Email
              </ResendConfrimEmail>,
            ],
          },
        });
      } else if (me.emailValidated === true) {
        dispatch({
          type: 'rmAnnouncementByKey',
          payload: 'validate-email',
        });
      }
    }
  }, [me]);

  const beDisabled = bannerRoutes.includes(router.pathname);

  const removeItem = rmIndex =>
    dispatch({ type: 'rmAnnouncement', payload: rmIndex });

  if (state.length === 0) return null;

  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      style={{
        marginLeft: '-8px',
        marginRight: '-8px',
        paddingTop: 0,
        paddingBottom: 0,
        ...(beDisabled && { marginTop: '64px' }),
      }}>
      {state.map((a, i) => (
        <AnnouncementItem
          key={i}
          item={a}
          index={i}
          remove={() => removeItem(i)}
        />
      ))}
    </List>
  );
};

const AnnouncementsConnectedWithProvider = ({ me, ...rest }) => {
  return (
    <AnnouncementProvider>
      <Announcements me={me} {...rest} />
    </AnnouncementProvider>
  );
};

export default AnnouncementsConnectedWithProvider;
