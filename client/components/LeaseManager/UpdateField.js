import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from '@/Components/Modal/index';
import { Button } from '@material-ui/core';
import InputFieldType from '@/Components/Inputs/InputFieldType';

const UpdateField = ({ fieldConf, defaultValue, update }) => {
  const { key, label, format } = fieldConf;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  return (
    <>
      <Modal
        title={`Update ${label}`}
        open={modalIsOpen}
        close={() => setModalIsOpen(false)}>
        <InputFieldType
          onChange={v => {
            setValue(v);
          }}
          config={fieldConf}
        />
        <Button onClick={() => update(value)}>Update</Button>
      </Modal>
      <Button onClick={() => setModalIsOpen(true)}>Luanch Updater</Button>
    </>
  );
};

UpdateField.propTypes = {
  defaultValue: PropTypes.any,
  fieldConf: PropTypes.any,
  update: PropTypes.func.isRequired,
};

export default UpdateField;
