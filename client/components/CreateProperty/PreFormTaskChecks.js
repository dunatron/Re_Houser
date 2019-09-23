import React, { useState, useEffect } from "react";
import CreditCardTab from "../Account/CreditCardTab";

const collectionsConf = me => {
  return [
    {
      message: "You must have a primary credit card when creating a property",
      valid: () => {
        if (!me.primaryCreditCard) {
          return false;
        }
      },
      action: () => (
        <div>
          <CreditCardTab me={me} />
        </div>
      )
    }
  ];
};

const PreFormTaskChecks = ({ me }) => {
  const collections = collectionsConf(me);
  return (
    <div>
      {collections.map((collection, i) => {
        if (!collection.valid) {
          return (
            <div>
              <h1>I am a requirement that has not been met</h1>
              <p>{collection.message}</p>
              <p>{collection.action}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default PreFormTaskChecks;
