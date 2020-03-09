import React, { Component, useState } from 'react';
import { useQuery } from '@apollo/client';
import SuperTable from '../SuperTable/index';
import Button from '@material-ui/core/Button';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Modal from '../Modal/index';
import moment from 'moment';

const PaymentsTable = ({ payments, title }) => {
  const prettyPayments = payments.map(payment => {
    const prettifiedData = {
      ...payment,
      created: moment(payment.created).format('dddd, MMMM Do YYYY, h:mm:ss a'),
    };
    return prettifiedData;
  });
  const columnHeaders = () => {
    return [
      {
        id: 'leaseId',
        numeric: false,
        // disablePadding: true,
        label: 'leaseId',
        show: true,
        tableRenderKey: 'th',
        found: 'leaseId',
        searchable: true,
      },
      {
        id: 'propertyId',
        numeric: false,
        // disablePadding: true,
        label: 'propertyId',
        show: true,
        tableRenderKey: 'th',
        found: 'propertyId',
        searchable: true,
      },
      {
        id: 'stripePaymentId',
        numeric: false,
        // disablePadding: true,
        label: 'stripePaymentId',
        show: true,
        tableRenderKey: 'th',
        found: 'stripePaymentId',
        searchable: true,
      },
      {
        id: 'object',
        numeric: false,
        // disablePadding: true,
        label: 'object',
        show: true,
        tableRenderKey: 'th',
        found: 'object',
        searchable: true,
      },
      {
        id: 'amount',
        numeric: true,
        // disablePadding: true,
        label: 'amount',
        show: true,
        tableRenderKey: 'th',
        found: 'amount',
        searchable: false,
      },
      {
        id: 'amount_refunded',
        numeric: true,
        // disablePadding: true,
        label: 'amount_refunded',
        show: true,
        tableRenderKey: 'th',
        found: 'amount_refunded',
        searchable: false,
      },
      {
        id: 'balance_transaction',
        numeric: false,
        // disablePadding: true,
        label: 'balance_transaction',
        show: true,
        tableRenderKey: 'th',
        found: 'balance_transaction',
        searchable: true,
      },
      {
        id: 'captured',
        numeric: false,
        type: 'truthly',
        // disablePadding: true,
        label: 'captured',
        show: true,
        tableRenderKey: 'th',
        found: 'captured',
        searchable: true,
      },
      {
        id: 'created',
        numeric: false,
        type: 'date',
        // disablePadding: true,
        label: 'created',
        show: true,
        tableRenderKey: 'th',
        found: 'created',
        searchable: true,
      },
      {
        id: 'currency',
        numeric: true,
        label: 'currency',
        show: true,
        tableRenderKey: 'th',
        found: 'currency',
        searchable: true,
      },
      {
        id: 'customer',
        label: 'customer',
        show: true,
        tableRenderKey: 'th',
        found: 'customer',
        searchable: true,
      },
      {
        id: 'description',
        label: 'description',
        show: true,
        tableRenderKey: 'th',
        found: 'description',
        searchable: true,
      },
      {
        id: 'paid',
        label: 'paid',
        type: 'truthly',
        show: true,
        tableRenderKey: 'th',
        found: 'paid',
        searchable: true,
      },
      {
        id: 'payment_method',
        label: 'payment_method',
        show: true,
        tableRenderKey: 'th',
        found: 'payment_method',
        searchable: true,
      },
      {
        id: 'status',
        label: 'status',
        show: true,
        tableRenderKey: 'th',
        found: 'status',
        searchable: true,
      },
    ];
  };
  return (
    <div>
      <SuperTable
        columnHeaders={columnHeaders()}
        title={title}
        data={prettyPayments}
      />
    </div>
  );
};

export default PaymentsTable;
