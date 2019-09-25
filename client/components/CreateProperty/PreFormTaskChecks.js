import React, { useState, useEffect } from 'react';
import CreditCardTab from '../Account/CreditCardTab';
import { Button } from '@material-ui/core';

const collectionsConf = me => {
  const [showCards, setShowCards] = useState(false);
  return [
    {
      message:
        'Dont know how you are here but you must be signed in to create property',
      valid: () => {
        if (!me) return false;
        return true;
      },
      action: () => (
        <div>
          <p>ToDo: implement reroute to PleaseSignIn</p>
        </div>
      ),
    },
    {
      message: 'You must have a primary credit card when creating a property',
      valid: () => {
        if (!me.primaryCreditCard) {
          return false;
        }
        return true;
      },
      action: () => (
        <div>
          <Button
            onClick={e => {
              e.preventDefault();
              setShowCards(!showCards);
            }}>
            Toggle Card Creator
          </Button>
          {showCards && <CreditCardTab me={me} />}
        </div>
      ),
    },
  ];
};

const PreFormTaskChecks = ({ me }) => {
  const collections = collectionsConf(me);
  console.log('The collections => ', collections);
  return (
    <div>
      {collections.map((collection, i) => {
        if (!collection.valid()) {
          return (
            <div>
              <h1>I am a requirement that has not been met</h1>
              <p>{collection.message}</p>
              <p>{collection.action()}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default PreFormTaskChecks;
