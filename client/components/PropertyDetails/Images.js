import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { InsulationStatementForm } from '@/Components/Forms/index';
import { SINGLE_OWNER_PROPERTY_QUERY } from '@/Gql/queries/index';

import Map from '@/Components/Map/index';
import CarouselSlider from '@/Components/CarouselSlider';
import DetailItem from '@/Components/PropertyCard/DetailItem';
import {
  IconButton,
  Button,
  Switch,
  Typography,
  Paper,
} from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';
//icons
import EditIcon from '@/Styles/icons/EditIcon';
import MoreIcon from '@/Styles/icons/MoreIcon';
import DetailsIcon from '@/Styles/icons/DetailsIcon';
import CameraIcon from '@/Styles/icons/CameraIcon';
import CloseIcon from '@/Styles/icons/CloseIcon';
import CheckIcon from '@/Styles/icons/CheckIcon';
// Update variable components ToDo: move to own file
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import InputModal from '@/Components/Modal/InputModal';
import TextInput from '@/Styles/TextInput';
import DateInput from '@/Components/Inputs/DateInput';
import Error from '@/Components/ErrorMessage/index';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
import UpdatePropertyVariable from './UpdatePropertyVariable';

import { UPDATE_PROPERTY_MUTATION } from '@/Gql/mutations/index';
import { OWNER_PROPERTIES_QUERY } from '@/Gql/queries/index';
import useKeyPress from '@/Lib/useKeyPress';
import EditProperty from './Edit';

import {
  NowToDate,
  LongDatePretty,
  LeaseLength,
} from '@/Components/LeaseManager/LeaseLengthInfo';

import FileUploader from '@/Components/FileUploader';

const PropertyImages = ({ property, updateProperty }) => {
  return (
    <div>
      <FileUploader
        title="Property Images"
        files={property.images ? property.images : []}
        fileParams={{
          type: 'upload',
          folder: `properties/${property.placeId}/images`, // reasons for id and placeId. hmm.....
        }}
        updateCacheOnRemovedFile={(cache, result) => {
          updateProperty({
            variables: {
              id: property.id,
              data: {
                images: {
                  disconnect: [
                    {
                      id: result.data.deleteFile.id,
                    },
                  ],
                },
              },
            },
          });
        }}
        recieveFile={file => {
          updateProperty({
            variables: {
              id: property.id,
              data: {
                images: {
                  connect: [
                    {
                      id: file.id,
                    },
                  ],
                },
              },
            },
          });
        }}
      />
      <CarouselSlider
        slides={property.images.map(imgObj => ({ ...imgObj, img: imgObj.url }))}
      />
    </div>
  );
};

export default PropertyImages;
