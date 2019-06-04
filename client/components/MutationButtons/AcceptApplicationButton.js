import React, { Component } from "react";
import { useMutation } from "react-apollo-hooks";
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from "../../mutation/acceptRentalApplication";

import { Button } from "@material-ui/core";
import { openSnackbar } from "../Notifier/index";

const AcceptApplicationButton = ({ application, property }) => {
  const acceptApplication = useMutation(ACCEPT_RENTAL_APPLICATION_MUTATION, {
    // variables: {
    //   data: {
    //     applicationId: application.id,
    //     propertyId: property.id,
    //   },
    // },
    variables: {
      applicationId: application.id,
      propertyId: property.id
    },
    update: (proxy, payload) => {
      console.group("AcceptApplicationButton update ToDo");
      console.log("proxy => ", proxy);
      console.log("payload => ", proxy);
      console.groupEnd();
    }
    // optimisticResponse: {},
  });
  return (
    <Button
      variant="outlined"
      onClick={() => {
        acceptApplication();
      }}
    >
      Accept application
    </Button>
  );
};

export default AcceptApplicationButton;
