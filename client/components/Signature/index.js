import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, IconButton } from '@material-ui/core';

import SignatureCanvas from 'react-signature-canvas';
import { useMutation } from '@apollo/client';
import { useCurrentUser } from '../User';
import { UPLOAD_SIGNATURE_FILE } from '../../graphql/mutations/index';
import Error from '../ErrorMessage';
import { StyledButton, ButtonLoader } from '../Loader/ButtonLoader';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import Image from 'material-ui-image';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  canvas: {
    border: '2px solid grey',
  },
}));

const SignatureComponent = () => {
  const classes = useStyles();

  // canvas pen settings
  // const [velocityFilterWeight, setVelocityFilterWeight] = useState(0.7); // default: 0.7
  // const [minWidth, setMinWidth] = useState(0.5); // default: 0.5
  // const [maxWidth, setMaxWidth] = useState(2.5); // default: 2.5
  // const [minDistance, setMinDistance] = useState(5); // default: 5
  // const [dotSize, setDotSize] = useState(0.7); // default: () => (this.minWidth + this.maxWidth) / 2
  // const [penColor, setPenColor] = useState('black'); // default: 'black'
  // const [throttle, setThrottle] = useState(16); // default: 16
  const velocityFilterWeight = 0.7; // default: 0.7
  const minWidth = 0.5; // default: 0.5
  const maxWidth = 2.5; // default: 2.5
  const minDistance = 5; // default: 5
  const dotSize = 0.7; // default: () => (this.minWidth + this.maxWidth) / 2
  const penColor = 'black'; // default: 'black'
  const throttle = 16; // default: 16

  const currentUser = useCurrentUser();

  const me = currentUser.data ? currentUser.data.me : null;
  const [isEditing, setIsEditing] = useState(me.signature ? false : true);

  const handleCompleted = data => {
    setIsEditing(false);
    toast.success(
      <div>
        <p>
          <Typography>Signature has been set</Typography>
          <img
            src={
              data.uploadSignature ? data.uploadSignature.signature.url : null
            }
          />
        </p>
      </div>,
      {
        autoClose: 3000,
        className: css({
          // background: 'black',
          width: '500px',
        }),
      }
    );
  };
  const [uploadSignature, { loading, error, called }] = useMutation(
    UPLOAD_SIGNATURE_FILE,
    {
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
      onCompleted: handleCompleted,
      update: (cache, { data }) => {
        console.log('The data after sig update => ', data);
        cache.modify({
          fields: {
            me(existingMeRef = {}, { readField }) {
              console.log('The data for a signin => ', data.data);
              console.log(
                'WIll this even work => existingRefs ',
                existingMeRef
              );
              console.log('WIll this even work => readField ', existingMeRef);
              return { ...data.uploadSignature };
            },
          },
        });
      },
    }
  );
  const canvasRef = useRef();
  const clear = () => {
    canvasRef.current.clear();
  };
  const urltoFile = async (url, filename, mimeType) => {
    return fetch(url)
      .then(function(res) {
        return res.arrayBuffer();
      })
      .then(function(buf) {
        return new File([buf], filename, {
          type: mimeType,
        });
      });
  };
  const toDataURL = url =>
    fetch(url)
      .then(response => response.blob())
      .then(
        blob =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  const trim = async () => {
    const dataUrl = canvasRef.current.getCanvas().toDataURL('image/png');

    //Usage example:
    urltoFile(dataUrl, `${me.id}_signature.png`, 'image/png').then(function(
      file
    ) {
      uploadSignature({
        variables: {
          file: file,
          where: {
            id: me.id,
          },
        },
      });
    });
  };

  useEffect(() => {
    if (me.signature && isEditing) {
      toDataURL(me.signature.url).then(dataUrl => {
        canvasRef.current.fromDataURL(dataUrl, {
          ratio: 1,
        });
      });
    }
  }, [me.signature, isEditing]);

  if (!me) {
    return null;
  }

  if (!isEditing) {
    return (
      <div>
        {me.signature && (
          <Image
            style={{
              paddingTop: '200px',
            }}
            src={me.signature.url}
            imageStyle={{
              height: '200px',
              width: '500px',
            }}
          />
        )}
        <Button onClick={() => setIsEditing(true)}>Edit Signature</Button>
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: '100%', overflow: 'auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {me.signature && (
            <IconButton onClick={() => setIsEditing(false)}>
              <CloseIcon />
            </IconButton>
          )}
          <Typography>
            {me.firstName} {me.lastName} Signature
          </Typography>
        </div>

        <SignatureCanvas
          ref={canvasRef}
          // penColor="green"
          velocityFilterWeight={velocityFilterWeight}
          minWidth={minWidth}
          maxWidth={maxWidth}
          minDistance={minDistance}
          dotSize={dotSize}
          penColor={penColor}
          throttle={throttle}
          backgroundColor="rgba(0,0,0,0)"
          canvasProps={{
            width: 500,
            height: 200,
            className: classes.canvas,
          }}
        />
        <Typography>
          This Signature will be used accross documents you sign. e.g. clicking
          sign Lease button
        </Typography>
      </div>
      <Error error={error} />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <StyledButton onClick={clear} variant="outlined">
          Clear
        </StyledButton>
        <ButtonLoader
          // variant="filled"
          onClick={trim}
          loading={loading}
          text="Set Signature"
          successText="Signature is set"
          style={{
            marginTop: '16px',
          }}
          color="secondary"
          disabled={loading}
          success={!error && !loading && called}></ButtonLoader>
      </div>
      {!me.signature && (
        <Typography variant="body1" color="error">
          You have not set a signature. We require it for the system before you
          can progress any further
        </Typography>
      )}
    </>
  );
};

export default SignatureComponent;
