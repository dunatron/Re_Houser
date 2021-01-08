import StorageIcon from '@material-ui/icons/Storage';
import DisplayJson from '@/Components/DisplayJson';
import { Typography, Box } from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';

const DetaislItem = ({ label, value, hint }) => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        {label}:{' '}
        <Typography variant="body2" component="span">
          {value}
        </Typography>
      </Typography>
    </div>
  );
};

const TempGenericFileDetails = ({ file }) => {
  return (
    <div>
      <RehouserPaper>
        <DetaislItem
          label="Type"
          value={file.mimetype}
          hint="the files mimetype"
        />
        <DetaislItem
          label="Size"
          value={`${file.bytes} bytes`}
          hint="the files mimetype"
        />
        <DetaislItem
          label="access_mode"
          value={file.access_mode}
          hint="the files mimetype"
        />
        <DetaislItem
          label="uploaderId"
          value={file.uploaderId}
          hint="the files mimetype"
        />

        <DetaislItem label="Url" value={file.url} hint="the files mimetype" />
      </RehouserPaper>

      <DisplayJson title={`Full details for ${file.filename}`} json={file} />
    </div>
  );
};

export default TempGenericFileDetails;
