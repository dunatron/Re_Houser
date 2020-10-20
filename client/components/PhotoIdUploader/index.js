import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';

import { UPLOAD_PHOTO_IDENTIFICATION } from '@/Gql/mutations/index';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';
import encodeImage from '@/Lib/encodeImage';

import { DetailStyles, UploaderStyles } from './styles';
import PreUploadImage from './PreUploadImage';

import Card from '@material-ui/core/Card';
import DragDropUploader from '@/Components/DragDropUploader/index';
import TextInput from '@/Styles/TextInput';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Icons
import EditIcon from '@/Styles/icons/EditIcon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import Error from '@/Components/ErrorMessage';

import { isEmpty } from 'ramda';

const PhotoIdUploader = ({ me }) => {
  const [file, setFile] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [photoId, setPhotoId] = useState('');
  const [showUploader, setShowUploader] = useState(!me.photoIdentification);

  // ToDo: Mutation Props
  const [uploadPhotoId, { data, error, loading }] = useMutation(
    UPLOAD_PHOTO_IDENTIFICATION,
    {
      variables: {
        file: file.raw,
        photoId: photoId,
      },
      update: (proxy, payload) => {
        setFile({});
        // i.e here just find the {me} and update the profile image url with the new one from cloudinary
        const userData = proxy.readQuery({ query: CURRENT_USER_QUERY });
        userData.me = {
          ...userData.me,
          identificationNumber: payload.data.uploadPhotoId.identificationNumber,
          photoIdentification: {
            ...userData.me.photoIdentification,
            ...payload.data.uploadPhotoId.photoIdentification,
          },
        };
        setTabIndex(0);
        toast.info(
          <p>
            <strong>upload new photo id please</strong>
          </p>
        );
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  useEffect(() => {}, []);

  const handleSetFile = file => {
    setFile(file);
    setShowUploader(0);
  };

  return (
    <Card>
      <Error error={error} />
      <Tabs
        value={tabIndex}
        onChange={setTabIndex}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth">
        <Tab
          label="Photo Id Tab"
          icon={<PersonAddIcon />}
          onClick={() => setTabIndex(0)}
        />
        <Tab
          label="Upload New Photo Id"
          icon={<PersonIcon />}
          onClick={() => setTabIndex(1)}
        />
      </Tabs>
      <SwipeableViews index={tabIndex}>
        <TabContainer>
          <DetailStyles>
            <h2 className="details__title">Current Photo Id details</h2>
            {me.photoIdentification && (
              <img
                className="details__image"
                src={me.photoIdentification.url}
              />
            )}
          </DetailStyles>
        </TabContainer>
        <TabContainer>
          {isEmpty(file) && (
            <DragDropUploader
              // disabled={loading}
              multiple={false}
              types={['image']}
              extensions={['.jpg', '.png']}
              receiveFile={file => handleSetFile(file)}
            />
          )}
          {!isEmpty(file) && (
            <UploaderStyles>
              {file.content && (
                <div className="preUpload">
                  <PreUploadImage file={file} />
                  <div className="preUpload__overlay">
                    <Button
                      color="error"
                      className="preUpload__remove"
                      onClick={() => setFile({})}>
                      Remove
                    </Button>
                    <TextInput
                      label="ID Number"
                      color="secondary"
                      name="photoId"
                      className="preUpload__id-number"
                      value={photoId}
                      onChange={e => setPhotoId(e.target.value)}
                    />
                    <Button
                      onClick={uploadPhotoId}
                      className="preUpload__upload-btn"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      size="large">
                      <EditIcon />

                      {loading
                        ? 'Uploading Identification Please Wait'
                        : 'Upload Photo Identification'}
                    </Button>
                  </div>
                </div>
              )}
            </UploaderStyles>
          )}
        </TabContainer>
      </SwipeableViews>
    </Card>
  );
};

PhotoIdUploader.propTypes = {
  me: PropTypes.shape({
    photoIdentification: PropTypes.shape({
      url: PropTypes.any
    })
  }).isRequired
};

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: `16px 0` }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.any,
  dir: PropTypes.any
};

const contentAsSrc = content => {
  const src = 'data:image/png;base64,' + encodeImage(content);
  return src;
};

export { PhotoIdUploader };

export default PhotoIdUploader;
