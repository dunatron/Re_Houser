import PropTypes from 'prop-types';
import SetPrimaryCreditCardButton from '@/Components/MutationButtons/SetPrimaryCreditCardButton';

import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const CreditCardItemStyles = styled(Paper)`
  width: 260px;
  margin: 16px;

  && {
    /* margin: ${props => props.theme.spacing(3)}px 0 0 0; */
  }
  .credit-card-display {
    border: 1px solid black;
    display: flex;
    flex-direction: column;
  }
  .credit-card-display--row-1 {
    border: 1px solid red;
  }
  .credit-card-display--row-2 {
    border: 1px solid green;
  }
  .credit-card-display--row-3 {
    border: 1px solid blue;
  }
`;

const CreditCardItem = ({ card, isPrimary }) => {
  return (
    <CreditCardItemStyles>
      <div className="credit-card-display">
        <div className="credit-card-display credit-card-display--row-1">
          <div className="credit-card-display__type">{card.type}</div>
        </div>
        <div className="credit-card-display credit-card-display--row-2">
          <div className="credit-card-display__number">
            XXX XXXX XXXX {card.last4}
          </div>
        </div>
        <div className="credit-card-display credit-card-display--row-3">
          <div className="credit-card-display__name">{card.name}</div>
          <div className="credit-card-display__expiry">
            <div className="credit-card-display__expiry-label">Exp:</div>
            <div className="credit-card-display__expiry-date">
              {card.exp_month}/{card.exp_year}
            </div>
          </div>
        </div>
      </div>
      <SetPrimaryCreditCardButton cardId={card.id} isPrimary={isPrimary} />
    </CreditCardItemStyles>
  );
};

CreditCardItem.propTypes = {
  card: PropTypes.shape({
    exp_month: PropTypes.any,
    exp_year: PropTypes.any,
    id: PropTypes.any,
    last4: PropTypes.any,
    name: PropTypes.any,
    type: PropTypes.any,
  }).isRequired,
  isPrimary: PropTypes.any.isRequired,
};

export default CreditCardItem;
