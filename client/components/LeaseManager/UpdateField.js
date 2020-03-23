import React, { useState } from 'react';
import Modal from '../Modal/index';
import { Button } from '@material-ui/core';
import InputFieldType from '../Inputs/InputFieldType';

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
          fieldConf={fieldConf}
          label={label}
          defaultValue={value ? value : defaultValue}
          value={value}
          onChange={v => {
            setValue(v);
          }}
        />
        <Button onClick={() => update(value)}>Update</Button>
      </Modal>
      <Button onClick={() => setModalIsOpen(true)}>Luanch Updater</Button>
    </>
  );
};

export default UpdateField;
