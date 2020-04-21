import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';

import SignatureCanvas from 'react-signature-canvas';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
import {
  UPDATE_USER_MUTATION,
  UPLOAD_SIGNATURE_FILE,
} from '../../graphql/mutations/index';
import Error from '../ErrorMessage';
import { StyledButton, ButtonLoader } from '../Loader/ButtonLoader';
import { border } from '@material-ui/system';
import { toast } from 'react-toastify';
import { css } from 'glamor';

const useStyles = makeStyles(theme => ({
  canvas: {
    border: '2px solid grey',
  },
}));

const SignatureComponent = ({ me }) => {
  const classes = useStyles();
  // canvas pen settings
  const [velocityFilterWeight, setVelocityFilterWeight] = useState(0.7); // default: 0.7
  const [minWidth, setMinWidth] = useState(0.5); // default: 0.5
  const [maxWidth, setMaxWidth] = useState(2.5); // default: 2.5
  const [minDistance, setMinDistance] = useState(5); // default: 5
  const [dotSize, setDotSize] = useState(0.7); // default: () => (this.minWidth + this.maxWidth) / 2
  const [penColor, setPenColor] = useState('black'); // default: 'black'
  const [throttle, setThrottle] = useState(16); // default: 16

  const handleCompleted = data => {
    toast.success(
      <div>
        <p>
          <Typography>Signature has been set</Typography>
          <img
            // height="200px"
            // width="200px"
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
  const [uploadSignature, { loading, error, data, called }] = useMutation(
    UPLOAD_SIGNATURE_FILE,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      onCompleted: handleCompleted,
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
    if (me.signature) {
      toDataURL(me.signature.url).then(dataUrl => {
        canvasRef.current.fromDataURL(dataUrl, {
          ratio: 1,
        });
      });
    }
  }, [me.signature]);

  return (
    <>
      <div style={{ maxWidth: '100%', overflow: 'auto' }}>
        <Typography>
          {me.firstName} {me.lastName} Signature
        </Typography>
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
      {/* const [velocityFilterWeight, setVelocityFilterWeight] = useState(0.7); // default: 0.7
  const [minWidth, setMinWidth] = useState(0.5); // default: 0.5
  const [maxWidth, setMaxWidth] = useState(2.5); // default: 2.5
  const [minDistance, setMinDistance] = useState(5); // default: 5
  const [dotSize, setDotSize] = useState(0.7); // default: () => (this.minWidth + this.maxWidth) / 2
  const [penColor, setPenColor] = useState('black'); // default: 'black'
  const [throttle, setThrottle] = useState(16); // default: 16 */}
      <div style={{ marginTop: '16px' }}>
        <TextField
          type="number"
          value={velocityFilterWeight}
          name="velocityFilterWeight"
          label="velocityFilterWeight"
          style={{ minWidth: '120px' }}
          inputProps={{
            step: 0.1,
            max: 1.5,
            min: 0.1,
          }}
          onChange={e => setVelocityFilterWeight(e.target.value)}
        />
        <TextField
          type="number"
          value={minWidth}
          style={{ minWidth: '120px' }}
          inputProps={{
            step: 0.1,
            max: 2,
            min: 0.1,
          }}
          //   inputProps={{ min: 0.1, max: 2, step: 0.1 }}
          name="minWidth"
          label="minWidth"
          onChange={e => setMinWidth(e.target.value)}
        />
        <TextField
          type="number"
          value={maxWidth}
          style={{ minWidth: '120px' }}
          inputProps={{
            step: 0.1,
            max: 6,
            min: 0.1,
          }}
          name="maxWidth"
          label="maxWidth"
          onChange={e => setMaxWidth(e.target.value)}
        />
        <TextField value={minDistance} name="minDistance" label="minDistance" />
        <TextField
          value={penColor}
          name="penColor"
          label="penColor"
          onChange={e => setPenColor(e.target.value)}
        />
        <TextField value={throttle} name="throttle" label="throttle" />
      </div>
    </>
  );
};

export default SignatureComponent;
