import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';
import DeleteViewing from './DeleteViewing';
import EditViewing from './EditViewing';

// only render actions if they are a host for this viewing or an admin
const Actions = ({ viewing, me }) => {
  const { hosts } = viewing;
  const _canView = () => {
    if (!me) return false;
    if (hosts.filter(host => host.id === me.id)) return true;
    if (me.permissions.includes('ADMIN')) return true;
    return false;
  };

  if (!_canView()) return null;

  return (
    <div>
      <EditViewing viewing={viewing} me={me} />
      <DeleteViewing viewing={viewing} />
    </div>
  );
};

Actions.propTypes = {
  viewing: PropTypes.shape({
    dateTime: PropTypes.string,
    recurringType: PropTypes.string,
    minutesFor: PropTypes.number,
    onRequest: PropTypes.bool,
    hosts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
      })
    ),
  }),
  me: mePropTypes,
  propertyId: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default Actions;
