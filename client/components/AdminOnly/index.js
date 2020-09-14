import PropTypes from 'prop-types';
import _isAdmin from '../../lib/isAdmin';
import { Typography } from '@material-ui/core';
import OpenSuperLoginButton from '../SuperLogin/OpenSuperLoginButton';
import ContactForm from '../Contact/ContactForm';
/**
 *
 * Maybe we make this a direct query for the user and use network only.
 * Making all admin sections check for user data
 */
const AdminOnly = ({ me, children }) => {
  const isAdmin = _isAdmin(me);

  if (!me)
    return (
      <>
        <Typography variant="h5">
          This is an admin only section and you are not logged in
        </Typography>
        <OpenSuperLoginButton />
      </>
    );

  if (!me.permissions)
    return (
      <>
        <Typography variant="h5">
          You are signed in but have no permissions. This is a mistake. Please
          contact support
        </Typography>
        <ContactForm />
      </>
    );

  if (!isAdmin)
    return (
      <Typography variant="h5">
        This is an admin only section, and you are not an Admin
      </Typography>
    );

  return children ? children : null;
};

AdminOnly.propTypes = {
  children: PropTypes.any.isRequired,
  me: PropTypes.shape({
    permissions: PropTypes.any,
  }).isRequired,
};

export default AdminOnly;
