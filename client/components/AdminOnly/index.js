import PropTypes from 'prop-types';
import _isAdmin from '@/Lib/isAdmin';
import _isWizard from '@/Lib/_isWizard';
import { Typography } from '@material-ui/core';
import OpenSuperLoginButton from '@/Components/SuperLogin/OpenSuperLoginButton';
import ContactForm from '@/Components/Contact/ContactForm';
/**
 *
 * Maybe we make this a direct query for the user and use network only.
 * Making all admin sections check for user data
 */
const AdminOnly = ({ me, children, mustBeWizard }) => {
  const isAdmin = _isAdmin(me);
  const isWizard = _isWizard(me);

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

  if (mustBeWizard && !isWizard) {
    return <Typography variant="h5">This is an Wizard only section</Typography>;
  }

  return children ? children : null;
};

AdminOnly.propTypes = {
  children: PropTypes.any,
  me: PropTypes.shape({
    permissions: PropTypes.any,
  }).isRequired,
};

export default AdminOnly;
